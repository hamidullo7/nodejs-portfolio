import React, { Component } from 'react';
import {Link, Router} from "react-router-dom";

export default class TopMenu extends Component {
    state = {
        menuClassName: 'menu',
        phoneMenuClassName: 'menu_click '
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    topToScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    handleScroll = () => {
        if (window.scrollY >= 1) {
            this.setState({ menuClassName: 'menu menu_scroll' });
        } else {
            this.setState({ menuClassName: 'menu' });
        }
    };
    render() {
        return (
            <div>
                <div className={this.state.menuClassName}>
                    <div className="logo">
                        <h2 className="b">H M</h2>
                    </div>
                    <ul >
                        <li><a href="#main">Bosh saxifa</a></li>
                        <li><a href="#section1">Men Haqimda</a></li>
                        <li><a href="#skill">Skillar</a></li>
                        <li><a href="#porfolio">Portfolio</a></li>
                        <li><a href="#contact">Bog'lanish</a></li>
                        <li><Link className="link" to="/loGiNadmin">Admin bo'limi </Link></li>
                    </ul>
                </div>
                
                {/* phone version */}
                <div className="menu_phone">
                    <div
                        onClick={() => this.setState({ phoneMenuClassName: 'menu_click menu_click_active' })} className="burger">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="logo">
                        <h2 className="b">H M</h2>
                    </div>
                </div>

                <div className={this.state.phoneMenuClassName}>
                    <div onClick={() => this.setState({ phoneMenuClassName: 'menu_click' })} className="exit">
                        <div style={{ transform: 'rotate(-150deg)' }}></div>
                        <div style={{ transform: 'rotate(110deg)' }}></div>
                    </div>
                    <ul >
                        <li><a onClick={() => this.setState({ phoneMenuClassName: 'menu_click' })} href="#main">Bosh saxifa</a></li>
                        <li><a onClick={() => this.setState({ phoneMenuClassName: 'menu_click' })} href="#section1">Men Haqimda</a></li>
                        <li><a onClick={() => this.setState({ phoneMenuClassName: 'menu_click' })} href="#skill">Skillar</a></li>
                        <li><a onClick={() => this.setState({ phoneMenuClassName: 'menu_click' })} href="#porfolio">Portfolio</a></li>
                        <li><a onClick={() => this.setState({ phoneMenuClassName: 'menu_click' })} href="#contact">Bog'lanish</a></li>
                        <li><Link className="link" to="/loGiNadmin"onClick={() => this.setState({ phoneMenuClassName: 'menu_click' })}>Admin bo'limi</Link></li>
                    </ul>
                </div>


            </div>


        )
    }
}
