import React, { Component } from 'react'
import image1 from '../../images/2.jpg'
import { host } from '../../host.json';


export default class Main extends Component {
    state = {
        title: "",
        imgSrc: "",
        body: ""
    }
    componentDidMount() {
        fetch(`${host}/counter/sendIp`)
        .then(response => response.text())
        .then(result => console.log(result))
        fetch(`${host}/about/getAll`)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                this.setState({
                    title: result[0].title,
                    imgSrc: result[0].imgSrc,
                    body: result[0].body,
                })
            })
    }
    render() {
        return (
            <div className="">
                <div id="section1" className="section1">
                    <div className="title">
                        <h1>Men Haqimda</h1>
                        <span>{this.state.title}</span>
                    </div>
                    <div className="about_box" >
                        <div className="img">
                            <img src={`${host + this.state.imgSrc}`} />
                        </div>
                        <div className="texts_about" >
                            <p dangerouslySetInnerHTML={{ __html: this.state.body }}>

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
