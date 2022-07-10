import { host } from '../../../host.json';

export default async  function(fileName, token) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-auth-tok", token);
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    let result = await fetch(`${host}/files/del/${fileName}`, requestOptions)
       if(result.ok){
        return true;
       } else {
        alert("Faylni o'chirishda xatolik!");
        return false;
       }
    
}