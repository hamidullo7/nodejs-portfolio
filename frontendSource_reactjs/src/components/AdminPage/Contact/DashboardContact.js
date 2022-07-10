import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { Modal, Button, FormControl } from 'react-bootstrap';
import Top from '../Top';
import Left from '../Left';
import { host } from '../../../host.json';
import { useSelector } from 'react-redux';
import Waiter from '../Waiter';



export default function Contact() {
    const [token, setToken] = useState(useSelector(state => state.token));
    const [contact, setContact] = useState([]);
    const [contactShower, setContactShower] = useState(<div></div>);
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState({
        id: 1,
        title: ''
    });
    const [waiter, setWaiter] = useState(false)
    const showWaiter = () => {
        setWaiter(true);
    }

    const hideWaiter = () => {
        setWaiter(false);
    }

    useEffect(() => {
        loadData();
    }, [])

    useEffect(() => {
        setContactShower(contact.map((item) => {
            return <div>
                <div className="editContacItem">
                    <p>
                        {item.locate}
                    </p>
                    <FaEdit className="icon2" onClick={() => showModal(1)} />
                </div>
                <div className="editContacItem">
                    <p>
                        {item.phone}
                    </p>
                    <FaEdit className="icon2" onClick={() => showModal(2)} />
                </div>
                <div className="editContacItem">
                    <p>
                        {item.email}
                    </p>
                    <FaEdit className="icon2" onClick={() => showModal(3)} />
                </div>
            </div>
        }))
    }, [contact])

    const loadData = () => {
        fetch(`${host}/contact/getAll`)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                setContact(result)
            });
    }

    const showModal = (id) => {
        if (id === 1) {
            setModalData({
                id: 1,
                title: contact[0].locate
            })
        } else if (id === 2) {
            setModalData({
                id: 1,
                title: contact[0].phone
            })
        } else {
            setModalData({
                id: 1,
                title: contact[0].email
            })
        }
        setShow(true);
    }

    const hideModal = () => {
        setShow(false);
    }

    const changer = (e, d) => {
        setModalData({
            id: d.id,
            title: e.target.value
        })
    }

    const send = async (id) => {
        showWaiter();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-auth-tok", token);

        let raw;
        if (id === 1) {
            raw = JSON.stringify({
                "locate": modalData.title,
                "phone": contact[0].phone,
                "email": contact[0].email,
            });
        } else if (id === 2) {
            raw = JSON.stringify({
                "locate": contact[0].locate,
                "phone": modalData.title,
                "email": contact[0].email,
            });
        } else {
            raw = JSON.stringify({
                "locate": contact[0].locate,
                "phone": contact[0].phone,
                "email": modalData.title,
            });
        }


        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch(`${host}/contact/update/${contact[0]._id}`, requestOptions)
        if (response.ok) {
            hideWaiter();
            loadData();
        } else {
            hideWaiter();
            alert("Serverdan xatolik xabari olindi!");
        }
    }


    return (
        <div>
            <Modal show={show} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Taxrirlash</Modal.Title>
                </Modal.Header>

                <Modal.Body> <FormControl
                    as="textarea"
                    placeholder="Yangi malumot..."
                    aria-describedby="basic-addon2"
                    value={modalData.title}
                    onChange={(e) => changer(e, modalData)}
                /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>
                        Yopish
                    </Button>
                    <Button variant="primary" onClick={() => {
                        send(modalData.id);
                        hideModal();
                    }}>
                        Jo'natish
                    </Button>
                </Modal.Footer>
            </Modal>
            <Top />
            <Left id={4} />
            <div className="contain" style={{ paddingTop: 100 }}>
                {contactShower}
            </div>
            <Waiter show={waiter} />

        </div>
    )
}
