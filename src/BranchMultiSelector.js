import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {fetchData} from "./fetchutils";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Checkbox} from "@material-ui/core";

export class BranchMultiSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {branches: []};
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.repo !== prevProps.repo) {
      this.getData();
    }
  }

  getData() {
    if (this.props.repo === "") {
      return;
    }
    fetchData(
      "/branches/" + this.props.repo,
      data => {
        this.setState({branches: data});
      });
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
        <FormLabel component={"legend"}>Branch</FormLabel>
        {this.state.branches.map(br => {
          return (
            <FormControlLabel
              control={<Checkbox id={br.name} onChange={this.handleChange}/>}
              label={br.name}
              key={br.name}
            />
          )
        })}
      </FormControl>
    )
  }
}