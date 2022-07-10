import { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { Modal, Button, FormControl, Form } from 'react-bootstrap';
import { host } from '../../../host.json';
import { useSelector } from 'react-redux';
import deletePortfolio from './deletePortfolio';
import deleteFile from './deleteFile';
import deleteType from './deleteType';
import Waiter from '../Waiter';
import Top from '../Top';
import Left from '../Left';

export default function Portfolio() {
    const [token, setToken] = useState(useSelector(state => state.token));

    const [types, setTypes] = useState([]);
    const [portfolio, setPortfolio] = useState([]);

    const [portfolioRead, setPortfolioRead] = useState(<div></div>);
    const [typesRead, setTypesRead] = useState(<div></div>);
    const [createPortfolioForm, setCreatePortfolioForm] = useState(<div></div>);
    const [modalPo, setModalPo] = useState(false);
    const [modalTy, setModalTy] = useState(false);
    const [imageUrlPoNew, setImageUrlPoNew] = useState('');
    const [urlPoNew, setUrlPoNew] = useState('');
    const [typeIdPoNew, setTypeIdPoNew] = useState('');
    const [titlePoNew, setTitlePoNew] = useState('');
    const [subtitlePoNew, setSubtitlePoNew] = useState('');
    const [typeKategoryNew, setTypeKategoryNew] = useState('');
    const [waiter, setWaiter] = useState(false)
    const showWaiter = () => {
        setWaiter(true);
    }

    const hideWaiter = () => {
        setWaiter(false);
    }


    const deleteTypes = (id, name) => {
        showWaiter();
        portfolio.forEach((item) => {
            if (item.type.name === name) {
                deleteFile(item.imgUrl.substring(13), token);
            }
        });

        hideWaiter();

        deleteType(id, token);
        loadData();
    }

    const setPortfolioFetch = () => {

        setPortfolioRead(portfolio.map((item) => {
            return <div className="portfolioItem mt-5">
                <img src={`${host + item.imgUrl}`} />
                <div>
                    Turi: {item.type.name} <br />
                    Nomi: {item.title} <br />
                    Subtitli: {item.subtitle} <br />
                    Url: {item.url} <br />
                    ImgUrl: {item.imgUrl} <br />
                    <MdDelete onClick={() => {
                        if (deletePortfolio(item.imgUrl, item._id, token)) loadData();
                    }} className="portfolioBtnDel" />
                </div>
            </div>
        }));
    }

    const setTypesFetch = () => {
        setTypesRead(types.map((item) => {
            return <div >
                <div className="kategoriyaTypes">
                    <div >
                        {item.name}
                    </div>
                    <MdDelete onClick={() => deleteTypes(item._id, item.name)} className="icon3" />
                </div>
            </div>
        }));
        setCreatePortfolioForm(types.map((item) => {
            return <option value={item._id}>{item.name}</option>
        }));
    }

    useEffect(() => {
        setPortfolioFetch();
    }, [portfolio]);

    useEffect(() => {
        setTypesFetch();
    }, [types]);

    useEffect(() => {
        loadData()
    }, []);

    const loadData = () => {
        fetch(`${host}/portfolio/getAll`)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                setPortfolio(result);
            });
        fetch(`${host}/portfolio/type/getAll`)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                setTypes(result);
            });
    }


    const hideModalPo = () => {
        setModalPo(false);
    }

    const showModalPo = () => {
        setModalPo(true);
    }


    const hideModalTy = () => {
        setModalTy(false);
    }

    const showModalTy = () => {
        setModalTy(true);
    }

    const sendAddFile = async () => {
        showWaiter();
        const formData = new FormData();
        formData.append('file', imageUrlPoNew);

        const options = {
            method: 'POST',
            body: formData,
            headers: {
                "x-auth-tok": token
            }
        };

        const result = await fetch(`${host}/files/upload`, options)
        if (result.ok) {
            hideWaiter();
            sendAdd(await result.text());
        } else {
            hideWaiter();
            alert("Faylni serverga yuklashda xatolik!");
        }
    }

    const sendAdd = async (fileName) => {
        showWaiter();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-auth-tok", token);

        let raw = JSON.stringify({
            "type": typeIdPoNew,
            "title": titlePoNew,
            "subtitle": subtitlePoNew,
            "url": urlPoNew,
            "imgUrl": '/files/image/' + fileName
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let result = await fetch(`${host}/portfolio/add`, requestOptions)
        result.ok ? alert("Muvaffaqiyatli yangilandi!") : alert("Xatolik sodir bo'ldi.")
    }

    const sendAddTy = async () => {
        showWaiter();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-auth-tok", token);

        let raw = JSON.stringify({
            "name": typeKategoryNew
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const result = await fetch(`${host}/portfolio/type/add`, requestOptions)
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
            <Top />
            <Left id={3} />
            <div className="contain">
                <div className="portfolioBox" style={{ paddingTop: 150 }}>
                    <div style={{ flex: 5, padding: 20, overflowY: 'scroll', maxHeight: '70vh' }} >
                        {portfolioRead}
                        <hr />
                        <div className="skillBtn" style={{ marginTop: 35 }} onClick={showModalPo} >
                            +
                        </div>
                    </div>
                    <div className="kategoriyaBox">
                        <h4>Kategoriyalar</h4>
                        {typesRead}
                        <div className="skillBtn mb-3" style={{ marginBottom: 0 }} onClick={showModalTy} >
                            +
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={modalPo} onHide={hideModalPo}>
                <Modal.Header closeButton>
                    <Modal.Title>Taxrirlash</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group onInput={(e) => setImageUrlPoNew(e.target.files[0])} controlId="formFile" className="mb-3">
                        <Form.Label>Faylni tanlang</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    <Form.Control onChange={(e) => setTitlePoNew(e.target.value)} className="mt-3" type="text" placeholder="Title'ni kiriting" />
                    <Form.Control onChange={(e) => setSubtitlePoNew(e.target.value)} className="mt-3" type="text" placeholder="Subtitle'ni kiriting" />
                    <Form.Control onChange={(e) => setUrlPoNew(e.target.value)} className="mt-3" type="text" placeholder="Url'ni kiriting" />
                    <Form.Control
                        onInput={(e) => setTypeIdPoNew(e.target.value)}
                        required
                        className="mt-3"
                        type="text"
                        as="select"

                        name="selectedToBucket"
                    >
                        <option>Turini belgilang</option>
                        {createPortfolioForm}
                    </Form.Control>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModalPo}>
                        Yopish
                    </Button>
                    <Button variant="primary" onClick={() => {
                        hideModalPo();
                        sendAddFile();
                    }}>
                        Jo'natish
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={modalTy} onHide={hideModalTy}>
                <Modal.Header closeButton>
                    <Modal.Title>Taxrirlash</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Control onChange={(e) => setTypeKategoryNew(e.target.value)} className="mt-3" type="text" placeholder="Nomini kiriting" />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModalTy}>
                        Yopish
                    </Button>
                    <Button variant="primary" type="submit" onClick={() => {
                        hideModalTy();
                        sendAddTy();
                    }}>
                        Jo'natish
                    </Button>
                </Modal.Footer>
            </Modal>
            <Waiter show={waiter} />

        </div>
    )
}
