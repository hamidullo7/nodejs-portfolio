export const calculateDay = (minusDay) => {
    let forCompare;
    let date = new Date();

    // bugungi kunni olamiz
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    day = '07'

    // hozirgi oyni olamiz
    let month = date.getMonth();
    month = month < 10 ? '0' + (month + 1) : month + 1;

    // hozirgi yilni olamiz
    let year = `${date.getFullYear()}`;

    if ( day[0] === '0' && parseInt(day[1]) > minusDay) {// 08 bolgan holat
        forCompare = [year, month, (parseInt(day[1]) - minusDay)];
    } else if (parseInt(day[0]) === 0) {
        //demak sana 05 korinishida
        if (parseInt(month[0]) === 0) {
            //demak oy 05 ko'rinishida
            if (parseInt(month[1]) === 3 && parseInt(year) % 4 === 0) {
                forCompare = [year, `0${parseInt(month[1]) - 1}`, 29 + parseInt(day[1]) - minusDay];
            } else if (parseInt(month[1] === 3)) {
                forCompare = [year, `0${parseInt(month[1]) - 1}`, 28 + parseInt(day[1]) - minusDay];
            } else if (parseInt(month[1]) === 2 ||
                parseInt(month[1]) === 4 || parseInt(month[1]) === 6 ||
                parseInt(month[1]) === 8 || parseInt(month[1]) === 9 ||
                parseInt(month[1]) === 11) {
                forCompare = [year, `0${parseInt(month[1]) - 1}`, 31 + parseInt(day[1]) - minusDay];
            } else if (parseInt(month[1]) === 1) {
                forCompare = [parseInt(year) - 1, `12`, 31 + parseInt(day[1]) - minusDay];
            } else {
                forCompare = [year, `0${parseInt(month[1]) - 1}`, 30 + parseInt(day[1]) - minusDay];
            }
        } else {
            if (parseInt(month[1]) === 3 && parseInt(year) % 4 === 0) {
                forCompare = [year, `0${parseInt(month[1]) - 1}`, 29 + parseInt(day[1]) - minusDay];
            } else if (parseInt(month[0]) === 3) {
                forCompare = [year, `0${parseInt(month[1]) - 1}`, 28 + parseInt(day[1]) - minusDay];
            } else if (parseInt(month[1]) === 10 || parseInt(month[1]) === 12) {
                forCompare = [year, `0${parseInt(month[1]) - 1}`, 30 + parseInt(day[1]) - minusDay];
            } else if (parseInt(month[1]) === 11) {
                forCompare = [year, `0${parseInt(month[1]) - 1}`, 31 + parseInt(day[1]) - minusDay];
            }
        }
    } else {
        //demak sana 15 korinishida
        if (parseInt(month[0]) === 0) {
            //demak oy 05 ko'rinishida
            if (parseInt(month[1]) === 3 && parseInt(year) % 4 === 0) {
                forCompare = [year, month, 29 + parseInt(day[0] + day[1]) - minusDay];
            } else if (parseInt(month[1]) === 3) {
                forCompare = [year, month, 28 + parseInt(day[0] + day[1]) - minusDay];
            } else if (parseInt(month[1]) === 2 || parseInt(month[1]) === 1 ||
                parseInt(month[1]) === 4 || parseInt(month[1]) === 6 ||
                parseInt(month[1]) === 8 || parseInt(month[1]) === 9 ||
                parseInt(month[1]) === 11) {
                // bu yanvar oyi va bu degani oldingi sana 31dan qaytgan
                forCompare = [year, month, parseInt(day[0] + day[1]) - minusDay];
            } else if (parseInt(month[1]) === 1) {
                // bu fevral oyi va bu degani oldingi sana 31dan qaytgan
                forCompare = [year, month,  parseInt(day[0] + day[1]) - minusDay];
            } else {
                forCompare = [year, month, 30 + parseInt(day[0] + day[1]) - minusDay];
            }
        }
    }

    forCompare[2] = forCompare[2] > 9 ? forCompare[2] : `0${forCompare[2]}`;

    forCompare = `${forCompare[0]}-` + `${forCompare[1]}-` + `${forCompare[2]}`;

    return forCompare;
}

export const calculateMonth = (minusMonth) => {
    let forCompare;
    let date = new Date();

    // hozirgi oyni olamiz
    let month = date.getMonth();
    month = month < 10 ? '0' + (month + 1) : month + 1;

     // bugungi kunni olamiz
     let day = date.getDate();
     day = day < 10 ? '0' + day : day;

    // hozirgi yilni olamiz
    let year = `${date.getFullYear()}`;

    //agarda oy ayrilishi kerak bo'lgan oydan katta bo'lsa 0.3 - 0.5 
    if(parseInt(month[0]) === 0 ){ // agar month ikki honali 
        if(parseInt(month[1]) < minusMonth){
            forCompare = [day, 12 + parseInt(month[1]) - minusMonth, parseInt(year) - 1];
        } else {
            forCompare = [day, parseInt(month[1]) - minusMonth, parseInt(year)];
        }
    } else {
        if(parseInt(month) < minusMonth){
            forCompare = [day, 12 + parseInt(month) - minusMonth, parseInt(year) - 1];
        } else {
            forCompare = [day, parseInt(month) - minusMonth, parseInt(year)];
        }
    }


    forCompare[2] = forCompare[2] > 9 ? forCompare[2] : `0${forCompare[2]}`;

    forCompare = `${forCompare[0]}-` + `${forCompare[1]}-` + `${forCompare[2]}`;

    return forCompare;
}

export const calculateYear = (splitDate) => {
 
    let date = new Date();

    // hozirgi oyni olamiz
    let month = date.getMonth();
    month = month < 10 ? '0' + (month + 1) : month + 1;

     // bugungi kunni olamiz
     let day = date.getDate();
     day = day < 10 ? '0' + day : day;

    // hozirgi yilni olamiz
    let year = `${date.getFullYear()}`;

    // necha yilligini hisoblaymiz
    let tafovut = 1, natija;
    splitDate.forEach(element => {
        natija = parseInt(year) - parseInt(element[0] + element[1] + element[2] + element[3]);
        if(natija > tafovut) tafovut++;
    });
    
    let result = new Array(tafovut).fill(0);

    for(let i = 0; i < tafovut; i++){
        splitDate.forEach(element => {
            if(parseInt(element[0] + element[1] + element[2] + element[3]) === parseInt(year) - i){
                result[i] = result[i] + 1;
            }
        });
    }

    return result;


}