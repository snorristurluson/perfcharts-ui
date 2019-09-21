import React from "react";
import {Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {fetchData} from "./fetchutils";
import MenuItem from "@material-ui/core/MenuItem";

export class ReferenceSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {revisions: []};
  }

  componentDidMount() {
    fetchData("/revisions/", data => this.setData(data));
  }

  setData(data) {
    let revisions = new Map();
    data.forEach(r => revisions.set(r.commitid, r));
    this.setState({revisions: Array.from(revisions.values())});
  }

  handleChange = (e, _) => {
    console.log(e.target.value);
    this.props.onChange(e.target.value);
  };

  render() {
    console.log(this.props.reference);
    return (
      <FormControl>
        <FormLabel component="legend">
          Reference
        </FormLabel>
        <Select
          id="dropdown-basic-button"
          value={this.props.reference}
          onChange={this.handleChange}
        >
          {this.state.revisions.map(r => {
            let value = r.commitid.substring(0,7);
            let label = value + ": " + r.title.substring(0,20);
            return <MenuItem key={value} value={value}>{label}</MenuItem>
          })}
        </Select>
      </FormControl>
    )
  }
}