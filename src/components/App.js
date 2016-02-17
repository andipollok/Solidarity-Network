import React from 'react';

import { Link }  from 'react-router';


import Nav from './Nav';
import Footer from './Footer';
import Start from './Start';

import Data from './Data';

var appData = new Data();

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(appData);
    this.state = {data: appData };
  }
  componentWillMount() {
    appData.callback = (data) => {
      this.setState({x: "asdf"});
      console.log("CALLBACK");  
    };
  }
  render() {

    return (
      <div>

        <Nav />

        {this.props.children || <Start data={this.state.data}/>}

        <Footer />

      </div>
    )
  }
};

export default App;
