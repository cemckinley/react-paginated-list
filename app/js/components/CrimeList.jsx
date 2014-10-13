var React = require('react');
var Pagination = require ('./Pagination/index.jsx');
var List = require('./List/index.jsx');


var CrimeList = React.createClass({

  loadData: function() {
    var request = new XMLHttpRequest();

    request.onload = function(response){
      
      if (response.target.status === 200) {
        var data = JSON.parse(response.target.response);
        this.setState({
          data: data,
          loaded: true,
          page: 1
        });
      
      } else {
        // TODO: handle error?
      }

    }.bind(this);

    request.open('GET', 'http://data.seattle.gov/resource/3k2p-39jp.json?$where=event_clearance_date%20IS%20NOT%20NULL&$order=event_clearance_date%20DESC');
    request.send();
  },

  changeToPage: function(pageNo) {
    console.log('change page', pageNo);
    this.setState({
      page: pageNo
    });
  },

  getInitialState: function() {
    return {
      data: [],
      loaded: false,
      page: 1
    };
  },

  componentWillMount: function() {
    this.loadData();
  },

  render: function() {
    var startIndex = (this.state.page - 1) * this.props.itemsPerPage;
    var endIndex = (this.state.page * this.props.itemsPerPage);
    var data = this.state.data.slice(startIndex, endIndex);
    var totalPages = Math.ceil(this.state.data.length / this.props.itemsPerPage);

    return(
      <div id="paginated-list" className={this.state.loaded ? 'loaded' : 'loading'}>
        <Pagination totalPages={totalPages} page={this.state.page} changeToPage={this.changeToPage}></Pagination>
        <List data={data}></List>
        <Pagination totalPages={totalPages} page={this.state.page} changeToPage={this.changeToPage}></Pagination>
      </div>
    );
  }

});


module.exports = CrimeList;