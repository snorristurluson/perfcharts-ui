import React from "react";
import {Bar} from "react-chartjs-2";
import {fetchData} from "./fetchutils";

const dummyData = {
  datasets: [],
  labels: []
};

const options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
      }
    }]
  }
};

export class BranchComparisonChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: null};
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.getData();
    }
  }

  render () {
    let data = this.state.data;
    if (data == null) {
      data = dummyData;
    }
    return (
      <div>
        <Bar data={data} options={options} width={1200} height={400}/>
      </div>
    )
  }

  getData() {
    let hasRequiredInputs = true;
    if (!this.props.repo) {
      hasRequiredInputs = false;
    }
    if (!this.props.exe) {
      hasRequiredInputs = false;
    }
    if (!this.props.branches || this.props.branches.size === 0) {
      hasRequiredInputs = false;
    }
    if (!this.props.benchmarks || this.props.benchmarks.size === 0) {
      hasRequiredInputs = false;
    }
    if (!this.props.metrics || this.props.metrics.size === 0) {
      hasRequiredInputs = false;
    }
    if (!hasRequiredInputs) {
      this.setState({data: null});
    } else {
      let url = "/comparebranches/";
      url += this.props.exe + "/";
      url += this.props.repo + "/";
      url += Array.from(this.props.branches).join("|") + "/";
      url += Array.from(this.props.benchmarks).join("|") + "/";
      url += Array.from(this.props.metrics).join("|") + "/";
      fetchData(url, data => this.setData(data));
    }
  }

  setData(rawData) {
    let dataSets = [];
    let labels = [];
    let byBenchMarkAndMetric = new Map();
    Array.from(this.props.benchmarks).forEach(bm => {
      Array.from(this.props.metrics).forEach(m => {
        let key = bm + ":" + m;
        byBenchMarkAndMetric.set(key, []);
        labels.push(key);
      })
    });
    rawData.forEach(branchData => {
      let allKeys = new Set(byBenchMarkAndMetric.keys());
      branchData.results.forEach(r => {
        let key = r.benchmark + ":" + r.metric;
        let list = byBenchMarkAndMetric.get(key);
        list.push(r.value);
        byBenchMarkAndMetric.set(key, list);
        allKeys.delete(key);
      });
      allKeys.forEach(key => {
        let list = byBenchMarkAndMetric.get(key);
        list.push(0);
        byBenchMarkAndMetric.set(key, list);
      });
    });
    // byBenchMarkAndMetric is now guaranteed to have the same number of
    // values for all branches
    rawData.forEach((branchData, ix) => {
      let dataForBranch = [];
      Array.from(this.props.benchmarks).forEach(bm => {
        Array.from(this.props.metrics).forEach(m => {
          let key = bm + ":" + m;
          let value = byBenchMarkAndMetric.get(key)[ix];
          dataForBranch.push(value);
        })
      });
      dataSets.push( {label: branchData.branch, data: dataForBranch});
    });
    let data = {
      labels: labels,
      datasets: dataSets
    };
    this.setState({data: data})
  }
}

/*
(2) [{…}, {…}]
0:
branch: "master"
results: Array(4)
0: {value: 28897280, benchmark: "BusyWait5", metric: "rss"}
1: {value: 7.1281595449982, benchmark: "BusyWait5", metric: "duration"}
2: {value: 26312704, benchmark: "TimeWaster5", metric: "rss"}
3: {value: 10.0776812909971, benchmark: "TimeWaster5", metric: "duration"}
length: 4
__proto__: Array(0)
sha: "d1c76f613e6c87bd88980e542fb7a3980f4725ec"
__proto__: Object
1: {branch: "first", sha: "7e217b327bbb8c8ba09e0346245509ee0880e0c9", results: Array(4)}
length: 2
__proto__: Array(0)


 */