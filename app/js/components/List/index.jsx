/**
 * Component for handling the display of the crime list and list items
 */


var React = require('react');
var ListItem = require('./ListItem.jsx');


var List = React.createClass({
  
  render: function() {
    var nodes = this.props.data.map(function(listItem, index){
      return <ListItem data={listItem} key={index}></ListItem>
    });
    
    return(
      <div className="list">
        <ul>{nodes}</ul>
      </div>
    );
  }

});


module.exports = List;