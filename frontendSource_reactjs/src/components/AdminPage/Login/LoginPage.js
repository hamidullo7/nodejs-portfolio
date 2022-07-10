import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setToken, logged } from '../../../actions';
import { useHistory } from 'react-router-dom';
import Top from '../Top';
import { host } from '../../../host.json';
import Waiter from '../Waiter';

export default () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const send = async (e) => {
        e.preventDefault();
        showWaiter();


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": login,
            "password": password
        });

        console.log(raw)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const result = await fetch(`${host}/user/login`, requestOptions);
        console.log(result)
        if (result.ok) {
            hideWaiter();
            dispatch(setToken(await result.text()));
            dispatch(logged(true));
            history.push('/dashboardAbout');
        } else {
            hideWaiter();
            alert("Login yoki parol noto'g'ri!");
            dispatch(logged(false));
        }
    }


    const [waiter, setWaiter] = useState(false)
    const showWaiter = () => {
        setWaiter(true);
    }

    const hideWaiter = () => {
        setWaiter(false);
    }

    return (
        <div>
            <Waiter show={waiter} />
            <Top />
            <div className="login_back">
                <h1>Hush kelibsiz!</h1>
                <h2>Hamidullo Mirzaikromov</h2>
                <form onSubmit={(e) => send(e)}>
                    <input type="text" onChange={(e) => setLogin(e.target.value)} placeholder="Login" />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Parol" />
                    <input type="submit" value="KIRISH" />
                </form>
            </div>
        </div>

    )
}
