import React, { Component } from 'react';
import './css/App.scss';
import MainLoader from './components/MainLoader.js'

import Articles from './components/Articles'



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
     appear: false,
     mainLoader: true
    }

    this.setLoaded = () => {
      this.setState({mainLoader: false})
    }
  

  }
 
  

  render() {
   
    return (
      
    
      
      <div className="App">
      {this.state.mainLoader ? <MainLoader setLoaded={this.setLoaded.bind(this)}/> : <Articles />}
      

      </div>
        
        
        );
      }
    }
    export default App;
