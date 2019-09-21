import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {fetchData} from "./fetchutils";

export class ExeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {exes: []};
  }

  componentDidMount() {
    fetchData("/executables/", data => this.setData(data));
  }

  setData(data) {
    this.setState({exes: data});
    if (this.props.exe === "") {
      this.props.onChange(data[0].name, data[0].repo.name);
    }
  }

  handleChange(e, _) {
    let parts = e.target.value.split(":");
    this.props.onChange(parts[0], parts[1]);
  }

  render() {
    let singleRepo = true;
    let repos = new Set(this.state.exes.map(r => r.repo.name));
    singleRepo = repos.size < 2;
    const title = this.props.exe + ":" + this.props.repo;
    return (
      <FormControl>
        <FormLabel component="legend">
          Executable
        </FormLabel>
        <Select
          id="dropdown-basic-button"
          value={title}
          onChange={this.handleChange}
        >
          {this.state.exes.map(r => {
            let combined = r.name + ":" + r.repo.name;
            let label = singleRepo ? r.name : combined;
            return <MenuItem key={combined} value={combined}>{label}</MenuItem>
          })}
        </Select>
      </FormControl>
    )
  }
}