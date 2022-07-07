import React, { useRef, useState } from "react";
import {
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useRecoilState } from "recoil";
import { talkListState } from "../atoms/TalkList";

export const Talk = () => {
  const [talkTitle, setTalkTitle] = useState("");
  const [talkList, setTalkList] = useRecoilState(talkListState);
  const inputRef = useRef(null);
  const [inputError, setInputError] = useState(false);
  const [inputErrorText, setInputErrorText] = useState("");

  const handleTalkAddEvent = () => {
    if (talkTitle === "") {
      setInputError(true);
      setInputErrorText("入力必須です");
      return;
    } else if (talkList.findIndex((title) => title === talkTitle) !== -1) {
      setInputError(true);
      setInputErrorText("同じトークが存在します");
      return;
    }
    setTalkList([...talkList, talkTitle]);
    setTalkTitle("");
    setInputError(false);
    setInputErrorText("");
  };

  const handleTalkTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTalkTitle(event.target.value);
  };

  const handleDeleteTalk = (index: number) => {
    const newTalkList = [...talkList];
    newTalkList.splice(index, 1);
    setTalkList(newTalkList);
  };

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            id="inputTalk"
            label="トークテーマ"
            variant="outlined"
            value={talkTitle}
            onChange={handleTalkTitleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.keyCode === 13) {
                handleTalkAddEvent();
              }
            }}
            error={inputError}
            inputRef={inputRef}
            helperText={inputErrorText}
            InputProps={{
              endAdornment: (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  size="large"
                  edge="start"
                  onClick={handleTalkAddEvent}
                >
                  <AddCircleIcon />
                </IconButton>
              ),
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <List>
          {talkList.map((value, i) => {
            return (
              <ListItem
                key={value}
                divider={true}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTalk(i)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={value}
                  primaryTypographyProps={{
                    width: "200px",
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};
