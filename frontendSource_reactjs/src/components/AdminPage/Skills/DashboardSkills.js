import React, { useState, useEffect } from 'react';
import Top from '../Top';
import Left from '../Left';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import { Modal, Button, FormControl } from 'react-bootstrap';
import { host } from '../../../host.json';
import { useSelector } from 'react-redux';
import Waiter from '../Waiter';



export default function Skills() {
    const [skills, setSkills] = useState([]);
    const [skillsList, setSkillsList] = useState();
    const [newSkillName, setNewSkillName] = useState();
    const [newSkillPrecent, setNewSkillPrecent] = useState();
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [modalData, setModalData] = useState(5);
    const [token, setToken] = useState(useSelector(state => state.token));
    const [waiter, setWaiter] = useState(false)
    const showWaiter = () => {
        setWaiter(true);
    }

    const hideWaiter = () => {
        setWaiter(false);
    }

    const loadData = () => {
        fetch(`${host}/skills/getAll`)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                setSkills(result)
                setSkillsList(result.map((item) => {
                    return <div >
                        <div className="skillTitle">{item.name}</div>
                        <div className="precent">{item.precent}%</div>
                        <FaEdit className="skillIcons" onClick={() => showModal(item)} />
                        <MdDelete className="skillIcons" onClick={() => deleteSkill(item._id)} />
                    </div>
                }))
            });
    }




    useEffect(() => {
        loadData();
    }, [])

    const showModal = (d) => {
        setShow(true);
        setModalData(d);
    }

    const hideModal = () => {
        setShow(false);
    }

    const showModalAdd = (d) => {
        setShowAdd(true);
    }

    const hideModalAdd = () => {
        setShowAdd(false);
    }

    const changer = (e) => {
        setModalData({
            _id: e.target.id.substring(0, 24),
            precent: e.target.value,
            name: e.target.id.substring(24)
        });
    }

    const deleteSkill = async (id) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-auth-tok", token);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        let result = await fetch(`${host}/skills/delete/${id}`, requestOptions)
        if (result.ok) {
            loadData();
        } else alert("Malumotni o'chirishda xatolik!")
    }



    const send = async () => {
        showWaiter();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-auth-tok", token);

        let raw = JSON.stringify({
            "name": modalData.name,
            "precent": modalData.precent
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let result = await fetch(`${host}/skills/update/${modalData._id}`, requestOptions)
        if (result.ok) {
            hideWaiter();
            loadData();
        } else {
            hideWaiter();
            alert("Malumotni yangilashda xatolik!");
        }
    }
    const sendAdd = async () => {
        showWaiter();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-auth-tok", token);

        let raw = JSON.stringify({
            "name": newSkillName,
            "precent": newSkillPrecent
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let result = await fetch(`${host}/skills/add`, requestOptions)
        if (result.ok) {
            hideWaiter();
            loadData();
        } else {
            hideWaiter();
            alert("Malumotni qo'shishda xatolik!");
        }
    }
    return (
        <div>
            <Modal show={showAdd} onHide={hideModalAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Qo'shish</Modal.Title>
                </Modal.Header>

                <Modal.Body> <FormControl
                    placeholder="Nomini kiriting"
                    aria-label=""
                    aria-describedby="basic-addon1"
                    onChange={(e) => setNewSkillName(e.target.value)}

                />
                    <FormControl
                        placeholder="Foizni kiriting"
                        aria-label=""
                        aria-describedby="basic-addon1"
                        style={{ marginTop: 15 }}
                        onChange={(e) => setNewSkillPrecent(e.target.value)}
                    /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModalAdd}>
                        Yopish
                    </Button>
                    <Button variant="primary" onClick={() => {
                        hideModalAdd();
                        sendAdd();
                    }}>
                        Jo'natish
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Taxrirlash</Modal.Title>
                </Modal.Header>

                <Modal.Body> <FormControl
                    placeholder="Foizni kiriting"
                    aria-label=""
                    aria-describedby="basic-addon2"
                    value={modalData.precent}
                    id={modalData._id + modalData.name}
                    onChange={(e) => changer(e)}
                /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>
                        Yopish
                    </Button>
                    <Button variant="primary" onClick={() => {
                        hideModal();
                        send();
                    }}>
                        Jo'natish
                    </Button>
                </Modal.Footer>
            </Modal>
            <Top />
            <Left id={2} />
            <div className="contain pb-3" style={{ overflowY: 'scroll' }}>
                <div className="skillBox"  >
                    {skillsList}
                </div>
                <hr />
                <div className="skillBtn" onClick={() => showModalAdd()}>
                    +
                </div>
            </div>
            <Waiter show={waiter} />


        </div>
    )
}
