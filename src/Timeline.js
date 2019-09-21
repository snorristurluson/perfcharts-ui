import React from "react";
import {TimeLineDataSelector} from "./TimeLineDataSelector";
import {TimeLineChart} from "./TimeLineChart";

export class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.handleExeChange = this.handleExeChange.bind(this);
    this.handleBranchChange = this.handleBranchChange.bind(this);
    this.handleBenchmarkChange = this.handleBenchmarkChange.bind(this);
    this.handleMetricChange = this.handleMetricChange.bind(this);
    this.handleReferenceChange = this.handleReferenceChange.bind(this);
    this.state = {
      exe: "",
      repo: "",
      branch: "",
      benchmarks: new Set(),
      metrics: new Set(),
      reference: ""
    };
  }

  handleExeChange(exe, repo) {
    this.setState({exe: exe, repo: repo});
  }

  handleBranchChange(branch) {
    this.setState({branch: branch});
  }

  handleBenchmarkChange(benchmarks) {
    this.setState({benchmarks: benchmarks});
  }

  handleMetricChange(metrics) {
    this.setState({metrics: metrics});
  }

  handleReferenceChange(reference) {
    this.setState({reference: reference});
  }

  render() {
    return (
      <div>
        <br/>
        <TimeLineChart
          exe={this.state.exe}
          repo={this.state.repo}
          branch={this.state.branch}
          benchmarks={this.state.benchmarks}
          metrics={this.state.metrics}
          reference={this.state.reference}
        />
        <br/>
        <TimeLineDataSelector
          exe={this.state.exe}
          repo={this.state.repo}
          branch={this.state.branch}
          benchmarks={this.state.benchmarks}
          metrics={this.state.metrics}
          reference={this.state.reference}
          onExeChange={this.handleExeChange}
          onBranchChange={this.handleBranchChange}
          onBenchmarkChange={this.handleBenchmarkChange}
          onMetricChange={this.handleMetricChange}
          onReferenceChange={this.handleReferenceChange}
        />
      </div>
    )
  }
}