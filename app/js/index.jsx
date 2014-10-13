/**
  * Main bootstrap file for launching the application
  */

var React = require('react');
var CrimeList = require('./components/CrimeList.jsx');


React.renderComponent(
  <CrimeList itemsPerPage={10} />, document.getElementById('CrimeList')
);

