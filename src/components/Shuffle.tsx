import { Grid, Button, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import shuffle from "lodash.shuffle";
import { personListState } from "../atoms/PersonList";
import { talkListState } from "../atoms/TalkList";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export const Shuffle = () => {
  const [shuffledUser, setShuffledUser] = useState("");
  const [shuffledTitle, setShuffledTitle] = useState("");

  const [isStarted, setIsStarted] = useState(false);
  const [clock, setClock] = useState(Math.random);
  const { width, height } = useWindowSize();
  const [confetti, setConfetti] = useState(false);

  const personList = useRecoilValue(personListState);
  const talkList = useRecoilValue(talkListState);

  const handleStop = () => {
    setIsStarted(false);
  };
  const handleGo = async () => {
    if (personList.length === 0) {
      alert("参加者がいません");
      return;
    }
    if (talkList.length === 0) {
      alert("トークテーマがありません");
      return;
    }
    setConfetti(false);
    setIsStarted(true);
  };

  useEffect(() => {
    if (isStarted) {
      const intervalId = setInterval(() => {
        setClock(Math.random());
      }, 100);
      return () => {
        clearInterval(intervalId);
        tickShuffleTitle();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStarted]);

  useEffect(() => {
    setShuffledUser(shuffle(personList)[0]);
    setShuffledTitle(shuffle(talkList)[0]);
  }, [clock, personList, talkList]);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const tickShuffleTitle = async () => {
    await delay(1000);
    setShuffledTitle(shuffle(talkList)[0]);
    await delay(1000);
    setShuffledTitle(shuffle(talkList)[0]);
    await delay(1000);
    setShuffledTitle(shuffle(talkList)[0]);
    await delay(1000);
    setShuffledTitle(shuffle(talkList)[0]);
    setConfetti(true);
  };

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item xs={12}>
        {isStarted ? (
          <Button variant="contained" onClick={handleStop}>
            Stop
          </Button>
        ) : (
          <Button variant="contained" onClick={handleGo}>
            Go
          </Button>
        )}
      </Grid>
      <Box mt={10} />
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom component="div">
          {shuffledUser} さん
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom component="div">
          の
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom component="div">
          {shuffledTitle}
        </Typography>
      </Grid>
      {confetti && <Confetti width={width} height={height} recycle={false} />}
    </Grid>
  );
};
