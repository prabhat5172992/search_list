import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './search-list';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import If from './conditional';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      search:'',
      searchResult: [],
      progressDisplay: false
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.filterSearchValues = this.filterSearchValues.bind(this);
  }

  componentDidMount(){
    console.log("Data inside json file", data);
  }

  handleSearch(field, value){
    let progressDisplay = Boolean(value)
    this.setState({
      search: value,
      resultDisplay: false,
      progressDisplay,
      searchResult: []
    });
  }

  filterSearchValues(){
    let search = this.state.search ? this.state.search.toLowerCase() : "";
    let result1 = search ? data.filter(item => item._id.toLowerCase().includes(search) || item.name.toLowerCase().includes(search) || item.gender.toLowerCase().includes(search)) : [];
    let result2 = data.filter(item => item._id.toLowerCase() === search|| item.name.toLowerCase() === search || item.gender.toLowerCase() === search );
    let searchResult = result2.length && result1.length >= result2.length ? result2 : result1;
    let resultDisplay = !searchResult.length;
    this.setState({
      searchResult,
      resultDisplay,
      progressDisplay: false
    });
  }


  render() {
    return (
      <MuiThemeProvider>
        <div>
          <TextField 
            floatingLabelText="Search for data..."
            style={{marginLeft:'5%'}}
            inputStyle={{marginTop:'10px'}}
            value={this.state.search}
            onChange = {(_, search)=>this.handleSearch("search", search)}
          />
          <RaisedButton 
            label="Search" 
            primary={true} 
            style={{margin: 10}} 
            onClick={this.filterSearchValues}
          />
        </div>
        <If condition={this.state.progressDisplay}>
          <div style={style.container}>
            <RefreshIndicator
              size={50}
              left={100}
              top={0}
              loadingColor="#33FF52"
              status="loading"
              style={style.refresh}
            />
            <div style={{marginLeft:'5%'}}>Fetching Results..... </div>
          </div>
        </If>
        <div>
        <If condition={this.state.search && this.state.searchResult.length}>
          <Table style={{marginLeft:'5%', marginRight:'5%', width:'90%'}}>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Gender</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.state.searchResult.map(item=> {
                return(
                  <TableRow>
                    <TableRowColumn style={{paddingLeft:'95px'}}> {item._id} </TableRowColumn>
                    <TableRowColumn style={{paddingLeft:'70px'}}> {item.name} </TableRowColumn>
                    <TableRowColumn style={{paddingLeft:'50px'}}> {item.gender} </TableRowColumn>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </If>
        <If condition={this.state.resultDisplay}>
          <div style={{marginLeft:'5%'}}> Sorry! No Matches Found </div>
        </If>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
