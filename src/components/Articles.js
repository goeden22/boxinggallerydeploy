import React, { Component } from 'react';

import '../css/App.scss';
import Article from './Article.js';
import {data} from '../data/data.js';
import Menu from './Menu.js'
import MobileMenu from './MobileMenu.js'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import '../fade.css'

import Progress from './Progress.js'


class Articles extends Component {

  constructor(props) {
    super(props);

    this.state = {
      current : data[0],
      direction: "down",
      locked: true,
      loading: false,
      active: 0,
      move: false,
      fastFill:false,
      multiplier: 0,
      mobile: false
    }
    this.next = (direction) => {
      if (this.state.current.index >= data.length -1 && direction === "down") {
        return false
      }
      clearTimeout(this.timeout)
      this.setState({direction, locked: true, loading: true, move: false}, () => {
        setTimeout(() => {
          this.setState({locked: false, loading: false, move: true})
        }, 3000)
        const next = direction === "down" ? this.state.current.index + 1 : direction === "up" ? this.state.current.index -1 : null;
        
        this.setState({current: data[next], active: data[next].index,}, () => {
          
        })
        
      })
     
    
    }
    this.isEven = (index) => {
       return index % 2 === 0;
    }
    this.buttonHandle = (direction) => {
      setTimeout(() => {
        if(this.state.locked || (direction === "up" && this.state.current.index === 0) || (this.state.current.index >= data.length -1 && direction === "down")){
          return false
        }
        this.setState({fastFill: true, locked: true}, () => {
          this.setState({multiplier: 0.001})
        this.next(direction)
          
          
        })
      }, 200)
  
    }
  
    this.timer=(direction) => {
      if (this.state.current.index >= data.length -1 && direction === "down") {
        return false
      }
      this.setState({fastFill: false, multiplier: 0, move: true, locked: false})
      this.timeout = setTimeout(function(){
       this.next("down");
       
        
      }.bind(this),10000)
    }
    this.checkIfMobile = () => {
      let mobile = document.querySelector('body').offsetWidth <= 765 ? true : false
      if(this.state.mobile !== mobile){
          this.setState({mobile})
      }
  }
  }
 
  componentDidMount(){
    this.checkIfMobile();
    window.addEventListener("resize", this.checkIfMobile)
  }

  render() {
    let progressWidth = `${(this.state.active + 1) * (100 / (data.length -1)) + this.state.multiplier}`;
    let progressWidthValue = progressWidth >= 100 ? 100 : progressWidth;
    let previousWidth = `${(this.state.active) * (100 / (data.length -1)) + this.state.multiplier}`;
    console.log(progressWidth)
    return (
      
      <div className="App">
  

        {this.state.mobile ? <MobileMenu locked={this.state.locked} active={this.state.active} buttonHandle={this.buttonHandle.bind(this)}/> : <Menu locked={this.state.locked} active={this.state.active} buttonHandle={this.buttonHandle.bind(this)}/>}
        
        
        
        <TransitionGroup>
          <CSSTransition key={this.state.current.index} timeout={2500} classNames={this.state.direction === "down" ? "fadedown" : "fadeup"}>
          < Article entry={this.state.current} even={this.isEven(this.state.current.index)} timer={this.timer.bind(this)}/>
          </ CSSTransition>
          </ TransitionGroup>
          <Progress fastFill={this.state.fastFill} move={this.state.move} progressWidthValue={progressWidthValue} previousWidth={previousWidth} index={this.state.current.index}/>
          
        </div>
        
        
        );
      }
    }
    export default Articles;
