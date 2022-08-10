import React, { Component } from 'react';
import '../../App';
import '../../App.css';
import './Avfemenino';
import avatar from '../../css/img/avatar.svg';
export class Avfemenino extends Component {
  constructor(props) {
    super(props);
    this.colors = {
      aspCerrado: '#777777',
      aspPendiente: '#0c82ed', //'#5528BF'
      aspInteresado: '#ffd503',
      aspInscritoParcial: '#fca629',
      aspInscrito: 'rgba(223,32,39)', //#7be500
    };
  }
  render() {
    const { bgBorder } = this.props;
    return (
      <img
        src={avatar}
        width="33%"
        style={{ borderColor: this.colors[bgBorder] }}
        className={`mx-auto text-center m-2 borderGradoInteres`}
        alt="avatar"
      />
    );
  }
}

export default Avfemenino;
