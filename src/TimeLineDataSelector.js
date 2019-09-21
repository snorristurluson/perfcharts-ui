import React from "react";
import {ExeSelector} from "./ExeSelector";
import {BranchSelector} from "./BranchSelector";
import {BenchmarkSelector} from "./BenchmarkSelector";
import {MetricSelector} from "./MetricSelector";
import Grid from "@material-ui/core/Grid";
import {ReferenceSelector} from "./ReferenceSelector";

export class TimeLineDataSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClickReference = evt => {};

  render() {
    return (
      <Grid container spacing={3} justify={"space-around"} alignItems={"flex-start"}>
        <Grid item xs={3}>
          <ExeSelector exe={this.props.exe} repo={this.props.repo} onChange={this.props.onExeChange}/><br/>
          <ReferenceSelector reference={this.props.reference} onChange={this.props.onReferenceChange}/><br/>
        </Grid>
        <Grid item xs={3}>
          <BranchSelector repo={this.props.repo} branch={this.props.branch} onChange={this.props.onBranchChange}/>
        </Grid>
        <Grid item xs={3}>
          <BenchmarkSelector onChange={this.props.onBenchmarkChange} selected={this.props.benchmarks}/>
        </Grid>
        <Grid item xs={3}>
          <MetricSelector onChange={this.props.onMetricChange} selected={this.props.metrics}/>
        </Grid>
      </Grid>
    )
  }
}