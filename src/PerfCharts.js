import React from "react";
import {DataSelector} from "./DataSelector";
import {LineCharts} from "./LineCharts";

export class PerfCharts extends React.Component {
  constructor(props) {
    super(props);
    this.handleExeChange = this.handleExeChange.bind(this);
    this.handleBranchChange = this.handleBranchChange.bind(this);
    this.handleBenchmarkChange = this.handleBenchmarkChange.bind(this);
    this.handleMetricChange = this.handleMetricChange.bind(this);
    this.state = {exe: "", repo: "", branch: new Set(), benchmarks: new Set(), metrics: new Set()};
  }

  handleExeChange(exe, repo) {
    console.log(exe, repo);
    this.setState({exe: exe, repo: repo});
  }

  handleBranchChange(branch) {
    console.log(branch);
    this.setState({branch: branch});
  }

  handleBenchmarkChange(benchmarks) {
    console.log(benchmarks);
    this.setState({benchmarks: benchmarks});
  }

  handleMetricChange(metrics) {
    console.log(metrics);
    this.setState({metrics: metrics});
  }

  render() {
    return (
      <div>
        <br/>
        <LineCharts
          exe={this.state.exe}
          repo={this.state.repo}
          branch={this.state.branch}
          benchmarks={this.state.benchmarks}
          metrics={this.state.metrics}
        />
        <br/>
        <DataSelector
          exe={this.state.exe}
          repo={this.state.repo}
          branch={this.state.branch}
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