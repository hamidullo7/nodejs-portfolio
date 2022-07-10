import { Component } from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import { host } from '../../host.json';


export default class Main extends Component {
    state = {
        skill: <div></div>
    }

    componentDidMount() {
        fetch(`${host}/skills/getAll`)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                this.puData(result)
            });
    }

    puData = (res) => {
        this.setState({
            skill: res.map((item) => {
                return (

                    <Row className="pb-4">
                        <Col md={12} className="offset-2" >
                            <span>{item.name}</span>
                            <ProgressBar striped variant="custom" className="progress" style={{
                                backgroundColor: '#87D5C4',
                                color: '#496B85', borderRadius: 7
                            }} now={item.precent} label={`${item.precent}%`} />

                        </Col>
                    </Row>
                )
            }

            )
        })
    }
    render() {
        return (
            <div id="skill" className="skills pb-5">
                <div className="title">
                    <h1>Skillar</h1>
                    <span>Qanday texnalogiyalardan foydalanaman</span>
                </div>
                <div className="skill_items">
                    {this.state.skill}
                </div>

            </div>
        )
    }
}
