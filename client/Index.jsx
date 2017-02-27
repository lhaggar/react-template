const React = require('react');
const ReactDOM = require('react-dom');

const App = require('./components/App');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render((
    <App />
  ), document.getElementById('root'));
});
