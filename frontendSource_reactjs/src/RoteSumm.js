import React, { Component } from 'react'
import Header from './components/Header/Main';
import About from './components/About/Main';
import Skills from './components/Skills/Main';
import Portfolio from './components/Portfolio/Main';
import Contact from './components/Contact/Main';
import Footer from './components/Footer/Main';
export default class RoteSumm extends Component {
    render() {
        return (
            <div>
                <Header />
                <About />
                <Skills />
                <Portfolio />
                <Contact />
                <Footer />
            </div>
        )
    }
}
