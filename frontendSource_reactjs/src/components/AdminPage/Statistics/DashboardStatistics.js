import { useEffect, useState } from 'react';
import Top from '../Top';
import Left from '../Left';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { host } from '../../../host.json';
import { calculateDay, calculateMonth, calculateYear } from './sort';

export default function Statistics() {
    const [ip, setIp] = useState([]);
    const [week, setWeek] = useState(new Array(7).fill(0));
    const [month, setMonth] = useState(new Array(7).fill(0));
    const [year, setYear] = useState([]);
    const [yearLebels, setYearLebels] = useState([]);
    const [token, setToken] = useState(useSelector(state => state.token));


    const loadData = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-auth-tok", token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`${host}/counter/getAll`, requestOptions)
            .then((res) => res.text())
            .then((result) => setIp(JSON.parse(result)));
    }

    useEffect(() => {
        let splitDate = ip.map((item) => item.date = item.date.substring(0, 10));
    
        let dayOne = splitDate.filter(item => item === calculateDay(7)).length;
        let dayTwo = splitDate.filter(item => item === calculateDay(6)).length;
        let dayThree = splitDate.filter(item => item === calculateDay(5)).length;
        let dayFour = splitDate.filter(item => item === calculateDay(4)).length;
        let dayFive = splitDate.filter(item => item === calculateDay(3)).length;
        let daySix = splitDate.filter(item => item === calculateDay(2)).length;
        let daySeven = splitDate.filter(item => item === calculateDay(1)).length;

        setWeek([dayOne, dayTwo, dayThree, dayFour, dayFive, daySix, daySeven]);

        let monthOne, monthTwo, monthThree, monthFour, monthFive, monthSix;
        monthOne = splitDate.filter(item => parseInt(item[5] + item[6]) === parseInt(calculateMonth(6)[3] + calculateMonth(6)[4])).length;
        monthTwo = splitDate.filter(item => parseInt(item[5] + item[6]) === parseInt(calculateMonth(5)[3] + calculateMonth(5)[4])).length;
        monthThree = splitDate.filter(item => parseInt(item[5] + item[6]) === parseInt(calculateMonth(4)[3] + calculateMonth(4)[4])).length;
        monthFour = splitDate.filter(item => parseInt(item[5] + item[6]) === parseInt(calculateMonth(3)[3] + calculateMonth(3)[4])).length;
        monthFive = splitDate.filter(item => parseInt(item[5] + item[6]) === parseInt(calculateMonth(2)[3] + calculateMonth(2)[4])).length;
        monthSix = splitDate.filter(item => parseInt(item[5] + item[6]) === parseInt(calculateMonth(1)[3] + calculateMonth(1)[4])).length;

        setMonth([monthOne, monthTwo, monthThree, monthFour, monthFive, monthSix]);

        setYear(calculateYear(splitDate));

    }, [ip]);

    useEffect(() => {
        setYearLebels(year.map((item, index) => `${index+1}`))
    }, [year])

    useEffect(() => {
        loadData();
    }, [])

    return (
        <div>
            <Top />
            <Left id={6} />
            <div className="contain" style={{ overflowY: 'scroll' }}>
                <div style={{paddingTop: '100px'}}>
                    <Bar style={{
                        backgroundColor: 'white',
                    }}
                        data={{
                            labels: ['Yetti kun oldin', 'Olti kun oldin', 'Besh kun oldin', 'To\'rt kun oldin', 'Uch kun oldin', 'Ikki kun oldin', 'Kecha'],
                            datasets: [{
                                label: 'Oxirgi bir hafatlik',
                                data: week,
                                backgroundColor: [
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                ],
                                borderColor: [
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                ],
                                borderWidth: 1
                            }],

                        }}
                        width={100}
                        height={300}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
                <div>
                    <Bar style={{
                        backgroundColor: 'white',
                    }}
                        data={{
                            labels: ['Oltinchi oy', 'Beshinchi oy', 'To\'rtinchi oy', 'Uchinchi oy', 'Ikkinchi oy', 'O\'tgan oy'],
                            datasets: [{
                                label: 'Oxirgi olti oylik',
                                data: month,
                                backgroundColor: [
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                ],
                                borderColor: [
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                    '#82AAB3',
                                ],
                                borderWidth: 1
                            }],

                        }}
                        width={100}
                        height={300}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
                <div>
                    <Bar style={{
                        backgroundColor: 'white',
                    }}
                        data={{
                            labels: yearLebels,
                            datasets: [{
                                label: 'Yillar bo\'yicha',
                                data: year,
                                backgroundColor: [
                                    '#82AAB3',
                                ],
                                borderColor: [
                                    '#82AAB3',
                                ],
                                borderWidth: 1
                            }],

                        }}
                        width={100}
                        height={300}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
            </div>
        </div>
    )
}
