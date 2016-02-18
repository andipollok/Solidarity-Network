import React from 'react';
import Airtable from 'airtable';

Airtable.configure({ apiKey: 'keyI22v2hdm84ezJv' });
var base = new Airtable().base('appTOXg7AH1lJqSrT');

import { Link }  from 'react-router';

import Nav from './Nav';
import Footer from './Footer';
import Start from './Start';


var App = React.createClass({

  render() {

    return (
      <div>

        <Nav />

        {this.props.children || <Start />}

        <Footer />

      </div>
    )
  }
});

export default App;
