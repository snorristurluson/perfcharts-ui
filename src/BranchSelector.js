import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {fetchData} from "./fetchutils";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

export class BranchSelector extends React.Component {
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
    console.log("Fetching branches for", this.props.repo);
    fetchData(
      "/branches/" + this.props.repo,
        data => {
          console.log(data);
          if (!data.includes(this.props.branch)) {
            if (data.length > 0) {
              this.props.onChange(data[0]);
            } else {
              this.props.onChange("");
            }
          }
          this.setState({branches: data})
        });
  }

  handleChange(event) {
    console.log(event);
    this.props.onChange(event.target.value);
  }

  render() {
    console.log(this.props);
    return (
      <FormControl component={"branches"}>
        <FormLabel component={"legend"}>Branch</FormLabel>
        <RadioGroup value={this.props.branch} onChange={this.handleChange}>
        {this.state.branches.map(br => {
          return (
            <FormControlLabel
              value={br.name}
              control={<Radio/>}
              label={br.name}
            />
          )
        })}
        </RadioGroup>
      </FormControl>
    )
  }
}