var React = require('react');


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


module.exports = PageButton;