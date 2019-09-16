import React from "react";
import {Checkbox} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import {fetchData} from "./fetchutils";

export class BenchmarkSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {benchmarks: []};
  }

  componentDidMount() {
    fetchData("/benchmarks/", data => this.setState({benchmarks: data}));
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
      <FormControl component={"benchmarks"}>
        <FormLabel component={"legend"}>Benchmarks</FormLabel>
        {this.state.benchmarks.map(bm => {
          return (
            <FormControlLabel
              control={<Checkbox id={bm.name} onChange={this.handleChange}/>}
              label={bm.name}
            />
          )
        })}
      </FormControl>
    )
  }
}