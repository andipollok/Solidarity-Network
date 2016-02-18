import React from 'react';
import { Link }  from 'react-router';

import Airtable from 'airtable';
Airtable.configure({ apiKey: 'keyI22v2hdm84ezJv' });
var base = new Airtable().base('appTOXg7AH1lJqSrT');

import Nav from './Nav';
import Footer from './Footer';
import Start from './Start';


export default class extends React.Component {

  render() {

    return (
      <div>

        <Nav />

        {this.props.children || <Start />}

        <Footer />

      </div>
    )
  }
};
