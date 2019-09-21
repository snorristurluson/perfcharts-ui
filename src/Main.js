import React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Timeline} from "./Timeline";
import {BranchComparison} from "./BranchComparison";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: "timeline"};
  }

  handleClickCompareBranches = () => {
    this.setState({view: "compare-branches"});
  };

  handleClickTimeline = () => {
    this.setState({view: "timeline"});
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={this.props.classes.title}>
              PerfCharts
            </Typography>
            <Button color="inherit" onClick={this.handleClickCompareBranches}>Compare branches</Button>
            <Button color="inherit" onClick={this.handleClickTimeline}>Timeline</Button>
          </Toolbar>
        </AppBar>
        {this.getCurrentView()}
      </div>
    )
  }

  getCurrentView() {
    if (this.state.view === "timeline") {
      return (
        <Timeline classes={this.props.classes}/>
      )
    } else if (this.state.view === "compare-branches") {
      return (
        <BranchComparison classes={this.props.classes}/>
      )
    }
  }
}