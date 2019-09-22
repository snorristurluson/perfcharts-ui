import React from "react";
import {Line} from "react-chartjs-2";
import 'chartjs-plugin-colorschemes';
import {fetchData} from "./fetchutils";

const dummyData = {
  labels: [''],
  datasets: []
};

const datasetOptions = {
  fill: false,
  lineTension: 0.2,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBorderWidth: 2,
  pointRadius: 5,
  pointHitRadius: 10,
  steppedLine: false,
};

const options = {
  plugins: {
    colorschemes: {
      scheme: 'tableau.Tableau10'
    }
  },
  tooltips: {
    mode: "point",
    callbacks: {
      "title": function(items, data) {
        return data.revisions[items[0].index].title;
      },
      "afterTitle": function(items, data) {
        let revision = data.revisions[items[0].index];
        return revision.author + "\n" + revision.date;
      },
    }
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
      }
    }]
  }
};

export class TimeLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: null, refData: null};
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.getData();
    }
  }

  render() {
    let data = this.state.data;
    if (data == null) {
      data = dummyData;
    }
    return (
      <Line data={data} options={options} width={1200} height={400}/>
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
    if (!this.props.branch) {
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
      if (this.props.reference) {
        console.log("LineCharts getting reference data");
        let url = "/refdata/";
        url += this.props.exe + "/";
        url += this.props.repo + "/";
        url += this.props.reference;
        fetchData(url, data => {
          this.setRefData(data);
          this.getChartData();
        });
      } else {
        this.setRefData(null);
        this.getChartData();
      }
    }
  }

  setRefData(rawData) {
    if (!rawData) {
      this.setState({refData: new Map()});
      return;
    }

    let refData = new Map();
    rawData.results.forEach(r => {
      let key = r.benchmark + ":" + r.metric;
      refData.set(key, r.value);
    });
    this.setState({refData: refData});
  }

  getChartData() {
    console.log("LineCharts getting data");
    let url = "/chartdata/";
    url += this.props.exe + "/";
    url += this.props.repo + "/";
    url += this.props.branch + "/";
    url += Array.from(this.props.benchmarks).join("|") + "/";
    url += Array.from(this.props.metrics).join("|") + "/";
    fetchData(url, data => this.setChartData(data));
  }


  setChartData(rawData) {
    let benchmarksAndMetrics = new Set();
    let shaList = [];
    let revisions = [];
    rawData.forEach(x => {
      shaList.push(x.sha.substring(0, 7));
      revisions.push({sha: x.sha, title: x.title, author: x.author, date: x.date});
      x.results.forEach(y => {
        let key = y.benchmark + ":" + y.metric;
        benchmarksAndMetrics.add(key);
      })
    });

    let byBenchMarkAndMetric = new Map();
    rawData.forEach(x => {
      let benchmarksAndMetricsForSha = new Set(benchmarksAndMetrics);
      x.results.forEach(y => {
        let key = y.benchmark + ":" + y.metric;
        let list = byBenchMarkAndMetric.get(key);
        if (!list) {
          list = [];
        }
        let value = y.value;
        let refValue = this.state.refData.get(key);
        let normalized = value;
        if (refValue) {
          normalized = value/refValue;
        }
        list.push(normalized);
        byBenchMarkAndMetric.set(key, list);
        benchmarksAndMetricsForSha.delete(key);
      });
      benchmarksAndMetricsForSha.forEach(key => {
        let list = byBenchMarkAndMetric.get(key);
        if (!list) {
          list = [];
        }
        list.push(null);
        byBenchMarkAndMetric.set(key, list);
      });
    });

    let dataSets = [];
    byBenchMarkAndMetric.forEach((v, k, m) => {
      let ds = Object.assign({}, datasetOptions);
      ds.label = k;
      ds.data = v;
      dataSets.push(ds);
    });
    let data = {
      labels: shaList,
      datasets: dataSets,
      revisions: revisions
    };
    this.setState({data: data});
  }
}