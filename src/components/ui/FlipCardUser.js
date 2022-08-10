import React from 'react';
import '../../App';
import '../main/Home';
import CardUserHome from './CardUserHome';
import CardUserBack from './CardUserBack';
import '../../App.css';

const FlipCardUser = ({ user }) => {
  return (
    <div className="flipCardUser">
      <div className="flip-card-user-inner">
        <CardUserHome user={user} />
        <CardUserBack user={user} />
      </div>
    </div>
  );
};

export default FlipCardUser;
