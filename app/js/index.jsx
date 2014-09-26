/**
  * @jsx React.DOM
  */

var React = require('react');


var PaginatedList = React.createClass({

  loadData: function() {
    console.log('test');
    var request = new XMLHttpRequest();

    request.onload = function(response){
      
      if (response.target.status === 200) {
        var data = JSON.parse(response.target.response);
        this.setState({
          data: data,
          loaded: true
        });
      
      } else {
        // TODO: handle error?
      }

    }.bind(this);

    request.open('GET', 'http://data.seattle.gov/resource/3k2p-39jp.json');
    request.send();
  },

  getInitialState: function() {
    return {
      data: [],
      loaded: false
    };
  },

  componentWillMount: function() {
    this.loadData();
  },

  render: function() {
    return(
      <div id="paginated-list" className={this.state.loaded ? 'loaded' : ''}>
        <div className="list"><List data={this.state.data}></List></div>
        <div className="pagination"></div>
      </div>
    );
  }

});


var List = React.createClass({
  
  render: function() {
    var nodes = this.props.data.map(function(listItem, index){
      return <ListItem key={index} title={listItem.title} description={listItem.description}></ListItem>
    });
    
    return(
      <ul id="heroList">{nodes}</ul>
    );
  }

});


var ListItem = React.createClass({
  
  render: function() {
    return (
      <li>
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
      </li>
    );
  }

});


React.renderComponent(
  <PaginatedList />, document.getElementById('container')
);

