var React = require('react');
var PageButton = require('./PageButton.jsx');


var Pagination = React.createClass({

  getPages: function() {
    var pages = [];
    // display 5 page buttons, or number of total pages, whichever is lowest
    var pageButtonCount = Math.min(5, this.props.totalPages);
    // start by displaying the two pages before the active page so active page appears in
    // the middle of buttons
    var offset = -2;
    
    // if page is nearing the end, adjust offset so more page buttons display before it
    if (this.props.totalPages - this.props.page < 2) {
      offset -= 2 - (this.props.totalPages - this.props.page);
    }

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
      return <PageButton key={page} pageNo={page} changeToPage={this.props.changeToPage} isActive={page === this.props.page}></PageButton>
    }.bind(this));

    return (
      <div className="pagination">
        <a href="" onClick={this._onPrevClick} className={this.props.page === 1 ? 'prev disabled' : 'prev'}>Prev</a>
        <ol>{pages}</ol>
        <a href="" onClick={this._onNextClick} className={this.props.page === this.props.totalPages ? 'next disabled' : 'next'}>Next</a>
      </div>
    );
  }
});


module.exports = Pagination;