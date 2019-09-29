import React, { Component } from 'react';
import '../css/App.scss';
import left from '../img/svg/left.svg'
import right from '../img/svg/right.svg'



class MobileMenu extends Component {

 

    render() {
        return (
            
            <div className="mobileMenu">
            <div className="mobileMenu__wrapper">
                <img src={left} alt="larr"  className={`mobileMenu__arrow ${!this.props.locked ? 'mobileMenu__arrow--active' : ''}`} onClick={() => this.props.buttonHandle('up')}></img>
              <img src={right} alt="rarr" className={`mobileMenu__arrow ${!this.props.locked ? 'mobileMenu__arrow--active' : ''}`}  onClick={() => this.props.buttonHandle('down')}></img>
              
              </div>
            </div>
    
        );
    }

}

      

export default MobileMenu;

