import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { Modal, Button, FormControl } from 'react-bootstrap';
import Top from '../Top';
import Left from '../Left';
import { host } from '../../../host.json';
import { useSelector } from 'react-redux';
import Waiter from '../Waiter';


export default function Contact() {
    const [contact, setContact] = useState([]);
    const [socialShower, setSocialShower] = useState([]);
    const [show, setShow] = useState(false);
    const [token, setToken] = useState(useSelector(state => state.token));

    const [modalData, setModalData] = useState({
        id: 0,
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
        setSocialShower(contact.map((item) => {
            return <div>
               
                <div className="editContacItem">
                    <p>
                        {item.all[0]}
                    </p>
                    <FaEdit className="icon2" onClick={() => showModal(0)} />
                </div>
                <div className="editContacItem">
                    <p>
                        {item.all[1]}
                    </p>
                    <FaEdit className="icon2" onClick={() => showModal(1)} />
                </div>
                <div className="editContacItem">
                    <p>
                        {item.all[2]}
                    </p>
                    <FaEdit className="icon2" onClick={() => showModal(2)} />
                </div>
                <div className="editContacItem">
                    <p>
                        {item.all[3]}
                    </p>
                    <FaEdit className="icon2" onClick={() => showModal(3)} />
                </div>
                <div className="editContacItem">
                    <p>
                        {item.all[4]}
                    </p>
                    <FaEdit className="icon2" onClick={() => showModal(4)} />
                </div>
                <div className="editContacItem">
                    <p>
                        {item.all[5]}
                    </p>
                    <FaEdit className="icon2" onClick={() => showModal(5)} />
                </div>
            </div>
        }))
    }, [contact])

    const loadData = () => {
        fetch(`${host}/social/getAll`)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                setContact(result)
            });
    }

    const showModal = (id) => {
        setShow(true);
        if (id === 0) {
            setModalData({
                id: 0,
                title: contact[0].all[0]
            })
        } else if (id === 1) {
            setModalData({
                id: 1,
                title: contact[0].all[1]
            })
        } else if (id === 2) {
            setModalData({
                id: 2,
                title: contact[0].all[2]
            })
        } else if (id === 3) {
            setModalData({
                id: 3,
                title: contact[0].all[3]
            })
        } else if (id === 4) {
            setModalData({
                id: 4,
                title: contact[0].all[4]
            })
        } else if (id === 5) {
            setModalData({
                id: 5,
                title: contact[0].all[5]
            })
        }

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
        let copyContact = contact[0].all.map((item, index) => {
            if (index === id) {
                return modalData.title
            };
            return item;
        })
        raw = JSON.stringify({
            "all": copyContact
        });


        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let result = await fetch(`${host}/social/update/${contact[0]._id}`, requestOptions)
        if (result.ok) {
            loadData();
            hideWaiter();
        } else {
            hideWaiter();
            alert("Malumotni qo'shishda xatolik!");
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
            <Left id={5} />
            <div className="contain" style={{ paddingTop: 100 }}>
                {socialShower}
            </div>
            <Waiter show={waiter} />

        </div>
    )
}
