import { host } from '../../../host.json';
import deleteFile from './deleteFile';

export default async function deletePortfolioFile(url, id, token) {
    if (deleteFile(url.substring(13), token)) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-auth-tok", token);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        let result = await fetch(`${host}/portfolio/delete/${id}`, requestOptions)
        if (result.ok) {
            return true;
        } else {
            alert("Faylni o'chirishda xatolik: Portfolio");
            return false;
        }
    } else {
        return false;
    }

}
