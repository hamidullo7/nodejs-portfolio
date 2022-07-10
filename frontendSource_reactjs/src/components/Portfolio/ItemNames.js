import React, { Component } from 'react';
import { host } from '../../host.json';


export default class Main extends Component {
    state = {
        portfolioTypes: [],
        activeColor: [],
        portfolioTypesItem: <div></div>
    }
   

    componentDidMount() {
        fetch(`${host}/portfolio/type/getAll`)
        .then(response => response.text())
        .then(result => {
            result = JSON.parse(result);
            this.setState({
                portfolioTypes: result
            }, () => this.loadColors())
        })
       
    }

    loadColors = () => {
        let colors =  new Array(this.state.portfolioTypes.length).fill('#518EA2');
        colors[0] = '#87D5C4';
        this.setState({
            activeColor: colors
        }, () =>  this.reloadPortfolioTypes());
    }

    reloadPortfolioTypes = () => {
        this.setState({
            portfolioTypesItem: this.state.portfolioTypes.map((item, index) => {
                
                return (
                    <div
                        onClick={(e) => this.active1(e)}
                        id={index}
                        style={{ backgroundColor: this.state.activeColor[index] }}>
                        {item.name}
                    </div>
                )
            })
        })
    }


    active1 = (e) => {
        this.props.updateItems(e.target.innerHTML);
        this.setState({
            activeColor: this.state.activeColor.map((item, index) => {
                if (index === parseInt( e.target.id)) {
                    return '#87D5C4'
                } else {
                    return '#518EA2'
                }
            })
        }, () => this.reloadPortfolioTypes())
    }



    render() {
        return (
            <div className="chooser_portfolio">
                <div className="in1">
                    {this.state.portfolioTypesItem}
                </div>
            </div>
        )
    }
}
