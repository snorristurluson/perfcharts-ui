import React from "react";
import Grid from "@material-ui/core/Grid";
import {ExeSelector} from "./ExeSelector";
import {BranchMultiSelector} from "./BranchMultiSelector";
import {BenchmarkSelector} from "./BenchmarkSelector";
import {MetricSelector} from "./MetricSelector";

export class BranchComparisonDataSelector extends React.Component {
  render () {
    return (
      <Grid container spacing={3} justify={"space-around"}>
        <Grid item alignItems={"left"} xs={3}>
          <ExeSelector exe={this.props.exe} repo={this.props.repo} onChange={this.props.onExeChange}/>
        </Grid>
        <Grid item alignItems={"left"} xs={3}>
          <BranchMultiSelector repo={this.props.repo} selected={this.props.branches} onChange={this.props.onBranchChange}/>
        </Grid>
        <Grid item alignItems={"left"} xs={3}>
          <BenchmarkSelector onChange={this.props.onBenchmarkChange} selected={this.props.benchmarks}/>
        </Grid>
        <Grid item alignItems={"left"} xs={3}>
          <MetricSelector onChange={this.props.onMetricChange} selected={this.props.metrics}/>
        </Grid>
      </Grid>
    )
  }
}