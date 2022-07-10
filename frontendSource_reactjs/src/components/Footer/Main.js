import React, { Component } from 'react';
import {
    RiInstagramLine, RiTelegramFill,
    RiFacebookBoxFill, RiTwitterFill,
    RiWhatsappFill, RiGithubFill
} from 'react-icons/ri';
import { host } from '../../host.json';
import { Link } from 'react-router-dom';




export default class Main extends Component {
    state = {
        social: [
            'http://...',
            'http://...',
            'http://...',
            'http://...',
            'http://...',
            'http://...', 
        ]
    }
    componentDidMount() {
        fetch(`${host}/social/getAll`)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                this.setState({
                    social: result[0].all
                })
            })
    }
    render() {
        return (
            <div id="footer">
                <div className="footer">
                    <ul >
                        <li><a href="#main">Bosh saxifa</a></li>
                        <li><a href="#section1">Men Haqimda</a></li>
                        <li><a href="#skill">Skillar</a></li>
                        <li><a href="#porfolio">Portfolio</a></li>
                        <li><a href="#contact">Bog'lanish</a></li>
                        <li><Link to="/logiNadmin">Admin bo'limi</Link></li>
                    </ul>
                    <div className="social_link">
                        <a href={this.state.social[0]}><RiInstagramLine className="icon_social" /></a>
                        <a href={this.state.social[1]}><RiTelegramFill className="icon_social" /></a>
                        <a href={this.state.social[2]}><RiFacebookBoxFill className="icon_social" /></a>
                        <a href={this.state.social[3]}><RiTwitterFill className="icon_social" /></a>
                        <a href={this.state.social[4]}><RiWhatsappFill className="icon_social" /></a>
                        <a href={this.state.social[5]}><RiGithubFill className="icon_social" /></a>
                    </div>
                </div>
                <div className="copyright">
                    Mualliflik huquqi @2021-{new Date().getFullYear()} Barcha huquqlar himoyalangan
                </div>

            </div>
        )
    }
}
