import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Left(props) {
    const history = useHistory();

    return (
        <div className="left">
            <ul>
                <li className={props.id === 1 ? 'active_adminP': ''} onClick={() => history.push('/dashboardAbout')}>Men Haqimda</li>
                <li className={props.id === 2 ? 'active_adminP': ''}  onClick={() => history.push('/dashboardSkills')}>Skillar</li>
                <li className={props.id === 3 ? 'active_adminP': ''}  onClick={() => history.push('/dashboardPortfolio')}>Portfolio</li>
                <li className={props.id === 4 ? 'active_adminP': ''}  onClick={() => history.push('/dashboardContact')}>Bog'lanish</li>
                <li className={props.id === 5 ? 'active_adminP': ''}  onClick={() => history.push('/dashboardSocial')}>Ijtimoiy tarmoqlar</li>
                <li className={props.id === 6 ? 'active_adminP': ''}  onClick={() => history.push('/dashboardStatistics')}>Statistika</li>
            </ul>
        </div>
    )
}
