import React, { useState } from 'react';
import '../../App';
import '../main/Home';
import './CardUserHome';
import './Avfemenino';
import '../../App.css';
//import ProgressBar from 'react-percent-bar';
import cardIconBack from '../../css/img/cardUserHomeBack.svg';
import { useHistory } from 'react-router-dom';
import ProgressBarTooltip from './ProgressbarTooltip';

const CardUserHomeBack = ({ user }) => {
  //${isFront? 'cardBack': 'cardFront'
  const history = useHistory();
  const {
    nombre,
    apellido_paterno,
    apellido_materno,
    cantidadInscritos,
    cantidadProspectos,
    promedioDeProspeccion,
    metaInscritosPlantelCiclo,
    metaRegistrosPlantelCiclo,
    createdAt,
    id,
  } = user;

  {
    /*
  const [percent, setPercent] = useState(25);
  const [showTooltipProgress, setShowTooltipProgess] = useState(false)

  const updatePercent = () => {
    showTooltipProgress(true)
    setPercent(percent === 100 ? 25 : percent + 25);
  };*/
  }

  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  let yearsOld = currentDate.getFullYear() - createdDate.getFullYear();
  const monthsOld = currentDate.getMonth() - createdDate.getMonth() + 1;
  if (monthsOld < 0) yearsOld--;

  const tasaDeConversion =
    (cantidadInscritos * 100) / (cantidadProspectos + cantidadInscritos);

  return (
    <div className="h-full px-5 my-4 py-6 mx-4 cardHomeBack items-start justify-start">
      <img
        src={cardIconBack}
        width="35%"
        className="mx-auto text-center m-2"
        alt="icono"
      />
      <div className="flex flex-col mx-auto">
        <div className="text-white mx-auto text-center w-full px-2 py-1 mt-1">
          <span className="font-bold text-lg spanInfoCard">
            {[nombre, apellido_paterno, apellido_materno].join(' ')}
          </span>
        </div>
        <div className="text-smartDark mx-auto relative left-2 text-left w-full px-2 mt-2">
          <span className="font-light text-sm mt-1 spanInfoCard">
            Datos: {cantidadProspectos + cantidadInscritos} / Meta:{' '}
            {metaRegistrosPlantelCiclo}
          </span>
          <ProgressBarTooltip
            percentage={(
              ((cantidadProspectos + cantidadInscritos) * 100) /
              metaRegistrosPlantelCiclo
            ).toFixed(2)}
          ></ProgressBarTooltip>
        </div>
        <div className="text-smartDark mx-auto relative left-2 text-left w-full px-2 mt-2">
          <span className="font-light text-sm mt-1 spanInfoCard">
            Inscritos: {cantidadInscritos} / Meta: {metaInscritosPlantelCiclo}
          </span>
          <ProgressBarTooltip
            percentage={(
              (cantidadInscritos * 100) /
              metaInscritosPlantelCiclo
            ).toFixed(2)}
          ></ProgressBarTooltip>
        </div>
        <div className="text-smartDark mx-auto relative left-2 text-left w-full px-2 mt-2">
          <span className="font-light text-sm mt-1 spanInfoCard">
            % Conversión:{' '}
            {
              /*tasaDeConversion === 0 ? 1 : tasaDeConversion*/ !isNaN(
                tasaDeConversion
              )
                ? tasaDeConversion.toFixed(2)
                : '0.00'
            }
            %
          </span>
        </div>
        {/*<div className="text-smartDark mx-auto relative left-10 text-left w-full px-2 mt-2">
          <span className="font-light text-sm mt-1 spanInfoCard">
            Plantel: {nombrePlantel}
          </span>
          </div>*/}
        {
          <div className="text-smartDark mx-auto relative left-2 text-left w-full px-2 mt-2">
            <span className="font-light text-sm mt-1 spanInfoCard">
              Promedio de prospección:{' '}
              {parseFloat(promedioDeProspeccion).toFixed(2) || 0}
            </span>
          </div>
        }
        <div className="text-smartDark mx-auto relative left-2 text-left w-full px-2 mt-2">
          <span className="font-light text-sm mt-1 spanInfoCard">
            {monthsOld >= 0
              ? `Antigüedad: ${yearsOld ? yearsOld + ' Años' : ''} ${
                  monthsOld > 1 ? monthsOld + ' Meses' : monthsOld + ' Mes'
                }`
              : 'Recién ingreso'}
          </span>
        </div>
        <div
          className="text-smartDark mx-auto text-center w-full px-2 mt-4"
          onClick={() => {
            history.push(`/licenseDetails/${id}`);
          }}
        >
          <span className="font-bold text-lg numProspectos mt-2 spanInfoCard">
            Ver licencia
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardUserHomeBack;
