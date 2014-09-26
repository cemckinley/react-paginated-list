/**
  * @jsx React.DOM
  */

var React = require('react');


var PaginatedList = React.createClass({

});


var List = React.createClass({
  
  render: function() {
    var nodes = this.props.data.map(function(listItem, index){
      return <ListItem key{index} title="{listItem.title}" description="{listItem.description}"></ListItem>
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

