import React, { Component, useState } from 'react';
import '../../App';
import '../main/Home';
import CardHome from './CardHome';
import CardHomeBack from './CardHomeBack';
import '../../App.css';

const FlipCard = ({user}) => {
        
    return (
        <div className="flipCard">
            <div className='flip-card-inner'>
                <CardHome user={user}></CardHome>
                <CardHomeBack user={user}></CardHomeBack>
            </div>
        </div>
    )
    
}
    
export default FlipCard;