import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { Modal, Button, FormControl } from 'react-bootstrap';
import Top from '../Top';
import Left from '../Left';
import { host } from '../../../host.json';
import { useSelector } from 'react-redux';
import Waiter from '../Waiter';



export default function DashboardAbout() {
    const [title, setTitle] = useState({});
    const [imgSrc, setImg] = useState();
    const [body, setBody] = useState({});
    const [_id, setId] = useState('');
    const [file, setFile] = useState('');
    const [token, setToken] = useState(useSelector(state => state.token));
    const [waiter, setWaiter] = useState(false)
    const showWaiter = () => {
        setWaiter(true);
    }

    const hideWaiter = () => {
        setWaiter(false);
    }

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        let result = await fetch(`${host}/about/getAll`)
        if (result.ok) {
            result = await result.text();
            result = JSON.parse(result)
            setTitle({
                id: 1,
                title: result[0].title
            });
            setImg(result[0].imgSrc);
            setBody({
                id: 2,
                title: result[0].body
            });
            setId(result[0]._id);
        } else {
            alert('Malumotlarni yuklashda xatolik yuz berdi!')
        }
    }
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState({});

    const showModal = (d) => {
        setShow(true);
        setModalData(d);
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

    const fileDeleteRequest = async () => {
        showWaiter();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-auth-tok", token);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(`${host}/files/del/${imgSrc.substring(13)}`, requestOptions)
        if (response.ok) {
            hideWaiter();
            sendFile();
        } else {
            hideWaiter();
            alert("Server bilan aloqada xatolik: DeleteFile")
        }
    }

    const sendFile = async () => {
        showWaiter();

        const formData = new FormData();
        formData.append('file', file);
        const options = {
            method: 'POST',
            body: formData,
            headers: {
                "x-auth-tok" : token
            }
        };

        let response = await fetch(`${host}/files/upload`, options);
        if (response.ok) {
            send(1, await response.text());
            hideWaiter();
        } else {
            hideWaiter();
            alert("Faylni yuklashda xatolik!");
        }
    }

    const send = async (e, imgS) => {
        showWaiter();
        if (modalData || e === 1) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("x-auth-tok", token);

            var raw = modalData.id === 1 ? raw = JSON.stringify({
                "title": modalData.title,
                "imgSrc": imgSrc,
                "body": body.title,
            }) : raw = JSON.stringify({
                "title": title.title,
                "imgSrc": imgSrc,
                "body": modalData.title,
            });

            if (e === 1) {
                raw = JSON.stringify({
                    "title": title.title,
                    "imgSrc": '/files/image/' + imgS,
                    "body": body.title,
                });
            }

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            let result = await fetch(`${host}/about/update/${_id}`, requestOptions)
            if (result.ok) {
                hideWaiter();
                loadData();
            } else {
                hideWaiter();
                alert("Malumot yangilanishida xatolik!");
            }
        }

    }

    return (
        <div>
            <Waiter show={waiter} />
            <Top />
            <Left id={1} />
            <div className="contain">
                <Modal show={show} onHide={hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Taxrirlash</Modal.Title>
                    </Modal.Header>

                    <Modal.Body> <FormControl
                        as="textarea"
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={modalData.title}
                        onChange={(e) => changer(e, modalData)}
                    /></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={hideModal}>
                            Yopish
                        </Button>
                        <Button variant="primary" onClick={() => {
                            hideModal();
                            send(0, '');
                        }}>
                            Jo'natish
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="editAboutSubtitle">
                    <p>
                        {title.title}
                    </p>
                    <FaEdit className="icon2" onClick={() => showModal(title)} />
                </div>

                <div className="aboutBody">
                    <div className="editAboutImage">
                        <img src={`${host + imgSrc}`} />
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                        <div className="btn_img" onClick={fileDeleteRequest}>
                            Jo'natish
                        </div>
                    </div>

                    <div className="editAboutTitle" style={{ marginTop: 50 }}>
                        <p style={{ paddingRight: 0, }} dangerouslySetInnerHTML={{ __html: body.title }}>

                        </p>
                        <div className="aboutBodyBtn" onClick={() => showModal(body)}>
                            <div>
                                Taxrirlash
                            </div>
                        </div>
                    </div>
                </div>
            <Waiter show={waiter} />
            </div>
        </div >
    )
}
