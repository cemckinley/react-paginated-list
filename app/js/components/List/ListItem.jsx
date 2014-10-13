/**
 * Component for handling the display of individual items in the crime list
 */


var React = require('react');


var ListItem = React.createClass({

  /**
   * Format a date for display as "MM/DD/YYYY at HH:MM"
   * @param  {Date} date   date instance to format
   * @return {String}      formatted date as a string
   */
  formatTime: function(date) {
    var minutes = date.getMinutes();
    var hours = date.getHours();

    if (minutes < 10) minutes = '0' + minutes;
    if (hours === 0) hours = '00';

    return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() + ' at ' + hours + ':' + minutes;
  },
  
  render: function() {
    var time = this.formatTime(new Date(this.props.data.event_clearance_date));

    return (
      <li>
        <h3>{this.props.data.event_clearance_group} | <span className="time">{time}</span></h3>
        <p>{this.props.data.event_clearance_description}</p>
      </li>
    );
  }

});


module.exports = ListItem;