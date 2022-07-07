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
import { personListState } from "../atoms/PersonList";

export const Person = () => {
  const [userName, setUserName] = useState("");
  const [personList, setPersonList] = useRecoilState(personListState);
  const inputRef = useRef(null);
  const [inputError, setInputError] = useState(false);
  const [inputErrorText, setInputErrorText] = useState("");

  const handlePersonAddEvent = () => {
    if (userName === "") {
      setInputError(true);
      setInputErrorText("入力必須です");
      return;
    } else if (personList.findIndex((name) => name === userName) !== -1) {
      setInputError(true);
      setInputErrorText("同じ名前が存在します");
      return;
    }
    setPersonList([...personList, userName]);
    setUserName("");
    setInputError(false);
    setInputErrorText("");
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleDeletePerson = (index: number) => {
    const newPersonList = [...personList];
    newPersonList.splice(index, 1);
    setPersonList(newPersonList);
  };

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            id="inputPerson"
            label="参加者"
            variant="outlined"
            value={userName}
            onChange={handleUserNameChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.keyCode === 13) {
                handlePersonAddEvent();
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
                  onClick={handlePersonAddEvent}
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
          {personList.map((value, i) => {
            return (
              <ListItem
                key={value}
                divider={true}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeletePerson(i)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={value}
                  primaryTypographyProps={{
                    width: "160px",
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
