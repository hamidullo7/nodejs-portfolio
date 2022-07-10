import React, { Component } from 'react';
import { MdEmail } from 'react-icons/md';
import { RiMapPin2Fill, RiPhoneFill } from 'react-icons/ri';
import {Row, Col, Container} from 'react-bootstrap';
import { host } from '../../host.json';
import Waiter from '../AdminPage/Waiter';





export default class Main extends Component {
    state = {
        location: [
            {
                locate: `  Namangan viloyati Pop tumani <br />
              Uygur QFY 3-uy`,
                phone: ` Tel: <br />
              +998993632613`,
                email: `  Email: <br/>
              khamidullo007@gmail.com`
            }
        ], 
        ism: '',
        familya: '',
        email: '',
        murojat: '',
        waiter: false
    }

    showWaiter = () => {
        this.setState({waiter: true});
    }

    hideWaiter = () => {
        this.setState({waiter: false});
    }


    componentDidMount() {
        fetch(`${host}/contact/getAll`)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                this.setState({
                    location: result
                })
            });
    }

    Submit = async (e) => {
        e.preventDefault();
        this.showWaiter();

        let raw = JSON.stringify({
            "name": this.state.ism,
            "surname": this.state.familya,
            "email": this.state.email,
            "message": this.state.murojat
        });

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch(`${host}/mail/send`, requestOptions)
        if (response.ok) {
            this.hideWaiter();
            alert("Murojatingiz uchun rahmat!")
        } else {
            this.hideWaiter();
            alert("Malumotni jo'natishda xatolik sodir bo'ldi!")
        }
    }

    render() {
        return (
            <div id="contact">
          
                <div className="contact">
                    <div className="title">
                        <h1>Bog’lanish</h1>
                        <span>Savollar va takliflar uchun murojaat qiling</span>
                    </div>
                    <Row className="pt-5 m-0" >
                    <Waiter show={this.state.waiter} />
                        <Col className={window.innerWidth > 890 ? "offset-1" : ""} md={5}>
                            <div className="contact_box">

                                <RiMapPin2Fill className="contact_icon" />
                                <span dangerouslySetInnerHTML={{ __html: this.state.location[0].locate }}>

                                </span>
                            </div>
                            <div className="contact_box">
                                <RiPhoneFill className="contact_icon" />
                                <span dangerouslySetInnerHTML={{ __html: this.state.location[0].phone }}>

                                </span>
                            </div>
                            <div className="contact_box">
                                <MdEmail className="contact_icon" />
                                <span dangerouslySetInnerHTML={{ __html: this.state.location[0].email }}>

                                </span>
                            </div>
                        </Col>

                        <Col md={5}>
                            <form className="contact_box_form" onSubmit={(e) => this.Submit(e)}>
                                <input required type="text" onChange={(e) => this.setState({ ism: e.target.value })} placeholder="Ism" />
                                <input required type="text" onChange={(e) => this.setState({ familya: e.target.value })} placeholder="Familya" />
                                <input type="email" onChange={(e) => this.setState({ email: e.target.value })} placeholder="Email" />
                                <textarea required placeholder="Murojatnoma" onChange={(e) => this.setState({ murojat: e.target.value })}>

                                </textarea>
                                <input type="submit" value="Jo'natish" />
                            </form>
                        </Col>
                    </Row>
                </div>

            </div>
        )
    }
}
