import React, { Component } from 'react';
import TopMenu from './TopMenu';

export default class Header extends Component {

    render() {
        return (
           
                <div id="main" className="header">
                <TopMenu />
                  
                        <div className="mainTextBox">
                            <h1>Salom</h1>
                            <h2>Men Hamidullo Mirzaikromov</h2>
                            <span style={{textAlign: 'center'}}>Fullstack dasturchi</span>
                            <div>MEN HAQIMDA</div>
                        </div>
                 
                </div>
          
        )
    }
}
