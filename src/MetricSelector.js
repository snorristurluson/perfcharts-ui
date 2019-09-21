import React from "react";
import {Checkbox} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import {fetchData} from "./fetchutils";

export class MetricSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {metrics: []};
  }

  componentDidMount() {
    fetchData("/metrics/", data => this.setState({metrics: data}));
  }

  handleChange(event) {
    let newSet = new Set(this.props.selected);
    if (event.target.checked) {
      newSet.add(event.target.id);
    } else {
      newSet.delete(event.target.id);
    }
    this.props.onChange(newSet);
  }

  render() {
    return (
      <FormControl>
        <FormLabel component={"legend"}>Metrics</FormLabel>
        {this.state.metrics.map(m => {
          return (
            <FormControlLabel
              control={<Checkbox id={m.name} onChange={this.handleChange}/>}
              label={m.name}
              key={m.name}
            />
          )
        })}
      </FormControl>
    )
  }
}