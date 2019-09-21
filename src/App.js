import React from 'react';
import './App.css';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Main} from "./Main";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "32px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Main classes={classes}/>
  );
}

export default App;
