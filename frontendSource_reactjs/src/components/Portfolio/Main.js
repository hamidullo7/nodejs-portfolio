import { Component } from 'react';
import ItemNames from './ItemNames';
import { host } from '../../host.json';

export default class Main extends Component {
    state = {
        portfolioItems: [],
        item1: [],
        itemNew: <div></div>
    }

    componentDidMount() {
        fetch(`${host}/portfolio/getAll`)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                this.setState({
                    portfolioItems: result
                }, () => this.setState({item1: this.state.portfolioItems}, () => this.updateImages()))
            })
    }

    updateImages = (e) => {
        this.setState({
            itemNew: this.state.item1.map((item, index) => {
                return (
                    <div className="pt-5 p-3 " >
                        <div >
                            <div className="portfolio_image_box">
                                <div className="blur">
                                    <img style={{width: '100%', height: '250px'}} src={host + item.imgUrl} />
                                </div>
                                <div className="c2">
                                    <h3>{item.title}</h3>
                                    <h4>{item.subtitle}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        })
    }

    updateItems = (a) => {
        if (a === 'Barchasi') {
            this.setState({ item1: this.state.portfolioItems }, () => this.updateImages());
        } else {
            this.setState({ item1: this.state.portfolioItems.filter(b => b.type.name === a) }, () => this.updateImages());
        }
    }


    render() {
        return (
            <div id="porfolio" >
                <div className="portfolio">
                    <div className="title">
                        <h1>Portfolio</h1>
                        <span>Ikki yillik tajribam mobaynida qilgan ishlarim</span>
                    </div>
                    <ItemNames updateItems={this.updateItems} />
                    <div>
                        <div className="fl" >
                            {this.state.itemNew}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
