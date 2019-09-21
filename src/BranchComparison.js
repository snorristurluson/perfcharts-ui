import React from "react";
import {BranchComparisonChart} from "./BranchComparisonChart";
import {BranchComparisonDataSelector} from "./BranchComparisonDataSelector";
import {TimeLineDataSelector} from "./TimeLineDataSelector";
import {TimeLineChart} from "./TimeLineChart";

export class BranchComparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {exe: "", repo: "", branches: new Set(), benchmarks: new Set(), metrics: new Set()};

  }

  handleExeChange = (exe, repo) => {
    this.setState({exe: exe, repo: repo});
  };

  handleBranchChange = branches => {
    this.setState({branches: branches});
  };

  handleBenchmarkChange = benchmarks => {
    this.setState({benchmarks: benchmarks});
  };

  handleMetricChange = metrics => {
    this.setState({metrics: metrics});
  };



  render () {
    return (
      <div>
        <BranchComparisonChart
          exe={this.state.exe}
          repo={this.state.repo}
          branches={this.state.branches}
          benchmarks={this.state.benchmarks}
          metrics={this.state.metrics}
        />
        <BranchComparisonDataSelector
          exe={this.state.exe}
          repo={this.state.repo}
          branches={this.state.branches}
          benchmarks={this.state.benchmarks}
          metrics={this.state.metrics}
          onExeChange={this.handleExeChange}
          onBranchChange={this.handleBranchChange}
          onBenchmarkChange={this.handleBenchmarkChange}
          onMetricChange={this.handleMetricChange}
        />
      </div>
      )
  }
}