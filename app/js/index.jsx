/**
  * @jsx React.DOM
  */

var React = require('react');


var PaginatedList = React.createClass({

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


var List = React.createClass({
  
  render: function() {
    var nodes = this.props.data.map(function(listItem, index){
      return <ListItem data={listItem} key={index}></ListItem>
    });
    
    return(
      <div className="list">
        <ul id="heroList">{nodes}</ul>
      </div>
    );
  }

});


var ListItem = React.createClass({
  
  render: function() {
    var time = new Date(this.props.data.event_clearance_date);
    time = (time.getMonth() + 1) + '/' + time.getDate() + '/' +  time.getFullYear() + ' at ' + time.getHours() + ':' + time.getMinutes();

    return (
      <li>
        <h3>{this.props.data.event_clearance_group} | <span className="time">{time}</span></h3>
        <p>{this.props.data.event_clearance_description}</p>
      </li>
    );
  }

});

var Pagination = React.createClass({

  getPages: function() {
    var pages = [];
    // display 5 page buttons, or number of total pages, whichever is lowest
    var pageButtonCount = Math.min(5, this.props.totalPages);
    // start by displaying the two pages before the active page
    var offset = -2;
    // if page is nearing the end, adjust offset so more page buttons display before it
    if (this.props.totalPages - this.props.page <= 2) offset -= this.props.totalPages - this.props.page;

    while (pageButtonCount) {
      // don't display pages less than 1 or greater than total pages
      if (this.props.page + offset > 0) {
        pages.push(this.props.page + offset);
        pageButtonCount--;
      }
      offset++;
    }

    return pages;
  },

  _onPrevClick: function(event) {
    event.preventDefault();

    if (this.props.page !== 1) {
      this.props.changeToPage(this.props.page - 1);
    }
  },

  _onNextClick: function(event) {
    event.preventDefault();

    if (this.props.page !== this.props.totalPages) {
      this.props.changeToPage(this.props.page + 1);
    }
  },

  render: function() {
    var pages = this.getPages().map(function(page, index){
      return <PageButton pageNo={page} changeToPage={this.props.changeToPage} isActive={page === this.props.page}></PageButton>
    }.bind(this));

    return (
      <div className="pagination">
        <a href="" onClick={this._onPrevClick} className={this.props.page === 1 ? 'prevBtn disabled' : 'prevBtn'}>Prev</a>
        <ol>{pages}</ol>
        <a href="" onClick={this._onNextClick} className={this.props.page === this.props.totalPages ? 'nextBtn disabled' : 'nextBtn'}>Next</a>
      </div>
    );
  }
});

var PageButton = React.createClass({

  _onClick: function(event) {
    event.preventDefault();

    if (!this.props.isActive) {
      this.props.changeToPage(this.props.pageNo);
    }
  },

  render: function() {
    return (
      <li className={this.props.isActive ? 'active' : ''}>
        <a href="" onClick={this._onClick}>{this.props.pageNo}</a>
      </li>
    );
  }
});

React.renderComponent(
  <PaginatedList itemsPerPage={10} />, document.getElementById('container')
);

