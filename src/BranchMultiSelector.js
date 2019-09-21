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
    console.log("bms constructor: ", this.props.selected);
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
    console.log("Fetching branches for", this.props.repo);
    fetchData(
      "/branches/" + this.props.repo,
      data => {
                                 this.setState({branches: data});
      });
  }

  handleChange(event) {
    console.log("bms handlechange: ", this.props.selected);
    let newSet = new Set(this.props.selected);
    if (event.target.checked) {
      newSet.add(event.target.id);
    } else {
      newSet.delete(event.target.id);
    }
    this.props.onChange(newSet);
  }

  render() {
    console.log(this.props);
    return (
      <FormControl component={"branches"}>
        <FormLabel component={"legend"}>Branch</FormLabel>
        {this.state.branches.map(br => {
          return (
            <FormControlLabel
              control={<Checkbox id={br.name} onChange={this.handleChange}/>}
              label={br.name}
            />
          )
        })}
      </FormControl>
    )
  }
}