import React, { useState } from 'react';
import '../../css/style/Alta.css';
import nombre from '../../css/img/nombre.svg';
import origenDato from '../../css/img/dato.svg';
import telefono from '../../css/img/telefono.svg';
import plantel from '../../css/img/plantel.svg';
import cicloEscolar from '../../css/img/cicloEscolar.svg';
import nivelEstudios from '../../css/img/nivelEstudios.svg';
import programaInteres from '../../css/img/programa.svg';
import modalidad from '../../css/img/modalidad.svg';
import calendario from '../../css/img/calendario.svg';
import horario from '../../css/img/horario.svg';
import temperatura from '../../css/img/temperatura.svg';
import ultimaAccion from '../../css/img/ultimaAccion.svg';
import TitleSection from '../ui/TitleSection';
import Modal from '../modales/ModalContenido';
import ContSeguimiento from '../modales/ContSeguimiento';

const Detalle = () => {
  return (
    <>
      {/* Cliente */}
      <div className="mx-auto w-full p-4 grid rowForm pt-0" style={{ top: 0 }}>
        <TitleSection title="Cliente" />
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            <span className="text-smartPurple pr-1">*</span>Nombre
          </label>
          <span className="iconInputForm">
            <img className="mx-auto" src={nombre} width="30" />
          </span>
          <input
            type="text"
            required
            disabled
            className="font-sans bg-transparent text-lg appearance-none relative block w-full mt-6 mb-4 px-12 py-3 border border-borders-gray placeholder-gray-500 text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
            placeholder="Luisa Santana Bautista"
          ></input>
        </div>
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            <span className="text-smartPurple pr-1">*</span>Origen del dato
          </label>
          <span className="iconInputForm">
            <img className="mx-auto" src={origenDato} width="30" />
          </span>
          <select
            required
            disabled
            className="form-select font-sans bg-transparent text-lg pr-24 relative block w-full mt-6 mb-4 px-12 py-3 border border-borders-gray text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
            placeholder="Origen del dato"
          >
            <option selected value="feria">
              Feria universitaria
            </option>
          </select>
        </div>
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            <span className="text-smartPurple pr-1">*</span>Tel??fono
          </label>
          <span className="iconInputForm">
            <img className="mx-auto" src={telefono} width="30" />
          </span>
          <input
            type="text"
            required
            disabled
            className="font-sans bg-transparent text-lg appearance-none relative block w-full mt-6 mb-4 px-12 py-3 border border-borders-gray placeholder-gray-500 text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
            placeholder="55 4400 0099"
          ></input>
        </div>
        x
      </div>

      {/* Producto */}
      <div className="mx-auto w-full p-4 grid rowForm pt-0" style={{ top: 0 }}>
        <TitleSection title="Producto" />
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            <span className="text-smartPurple pr-1">*</span>Plantel de inter??s
          </label>
          <span className="iconInputForm">
            <img className="mx-auto" src={plantel} width="30" />
          </span>
          <select
            type=""
            required
            disabled
            className="form-select font-sans bg-transparent text-lg pr-24 relative block w-full mt-6 mb-4 px-12 py-3 border border-borders-gray text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
          >
            <option selected value="Acapulco">
              Acapulco
            </option>
          </select>
        </div>
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            <span className="text-smartPurple pr-1">*</span>Ciclo escolar
          </label>
          <span className="iconInputForm">
            <img className="mx-auto" src={cicloEscolar} width="30" />
          </span>
          <select
            type=""
            required
            disabled
            className="form-select font-sans bg-transparent text-lg pr-24 relative block w-full mt-6 mb-4 px-12 py-3 border border-borders-gray text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
          >
            <option selected value="2022-2">
              2022-2
            </option>
          </select>
        </div>
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            <span className="text-smartPurple pr-1">*</span>Nivel de estudios
          </label>
          <span className="iconInputForm">
            <img className="mx-auto" src={nivelEstudios} width="30" />
          </span>
          <select
            type=""
            required
            disabled
            className="form-select font-sans bg-transparent text-lg pr-24 relative block w-full mt-6 mb-4 px-12 py-3 border border-borders-gray text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
          >
            <option selected value="Licenciatura">
              Licenciatura
            </option>
            <option value="Maestr??a">Maestr??a</option>
          </select>
        </div>
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            D??a de preferencia
          </label>
          <span className="iconInputForm">
            <img className="mx-auto" src={calendario} width="30" />
          </span>
          <select
            type=""
            required
            disabled
            className="form-select font-sans bg-transparent text-lg pr-24 relative block w-full mt-6 mb-4 px-12 py-3 border border-borders-gray text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
          >
            <option selected value="Lunes">
              Lunes
            </option>
            <option value="Martes">Martes</option>
            <option value="Mi??rcoles">Mi??rcoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
          </select>
        </div>
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            <span className="text-smartPurple pr-1">*</span>Programa de inter??s
          </label>
          <span className="iconInputForm">
            <img className="mx-auto" src={programaInteres} width="30" />
          </span>
          <select
            type=""
            required
            disabled
            className="form-select font-sans bg-transparent text-lg pr-24 relative block w-full mt-6 mb-4 px-12 py-3 border border-borders-gray text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
          >
            <option selected value="Derecho">
              Derecho
            </option>
          </select>
        </div>
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            Modalidad
          </label>
          <span className="iconInputForm">
            <img className="mx-auto" src={modalidad} width="30" />
          </span>
          <input
            type="text"
            required
            disabled
            className="font-sans bg-transparent text-lg appearance-none relative block w-full mt-6 mb-4 px-12 py-3 border border-borders-gray placeholder-gray-500 text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
            placeholder="Presencial"
          ></input>
        </div>
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">Horario</label>
          <span className="iconInputForm">
            <img className="mx-auto" src={horario} width="30" />
          </span>
          <input
            type="text"
            required
            disabled
            className="font-sans bg-transparent text-lg appearance-none relative block w-full mt-6 mb-4 px-12 py-3 border border-borders-gray placeholder-gray-500 text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
            placeholder="Matutino"
          ></input>
        </div>
      </div>

      {/* Seguimiento */}
      <div className="mx-auto w-full p-4 grid rowForm pt-0" style={{ top: 0 }}>
        <TitleSection title="Seguimiento" />
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            <span className="text-smartPurple pr-1">*</span>Fecha de primer
            contacto
          </label>
          <span className="iconInputForm">
            <img className="mx-auto" src={calendario} width="30" />
          </span>
          <input
            type="date"
            required
            disabled
            className="font-sans bg-transparent text-lg appearance-none relative block w-full mt-6 mb-4 pl-12 pr-6 py-3 border border-borders-gray placeholder-gray-500 text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
            placeholder="Fecha de primer contacto"
          ></input>
        </div>
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            <span className="text-smartPurple pr-1">*</span>Fecha de pr??ximo
            contacto
          </label>
          <span className="iconInputForm">
            <img className="mx-auto" src={calendario} width="30" />
          </span>
          <input
            type="date"
            required
            disabled
            className="font-sans bg-transparent text-lg appearance-none relative block w-full mt-6 mb-4 pl-12 pr-6 py-3 border border-borders-gray placeholder-gray-500 text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
            placeholder="Fecha de pr??ximo contacto"
          ></input>
        </div>
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            <span className="text-smartPurple pr-1">*</span>Temperatura
          </label>
          <img className="mx-auto mt-4" src={temperatura} width="95%" />
        </div>
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            <span className="text-smartPurple pr-1">*</span>Fecha de ??ltimo
            contacto
          </label>
          <span className="iconInputForm">
            <img className="mx-auto" src={calendario} width="30" />
          </span>
          <input
            type="date"
            required
            disabled
            className="font-sans bg-transparent text-lg appearance-none relative block w-full mt-6 mb-4 pl-12 pr-6 py-3 border border-borders-gray placeholder-gray-500 text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
            placeholder="Fecha de ??ltimo contacto"
          ></input>
        </div>
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            <span className="text-smartPurple pr-1">*</span>??ltima acci??n
            realizada
          </label>
          <span className="iconInputForm">
            <img className="mx-auto" src={ultimaAccion} width="30" />
          </span>
          <select
            type=""
            required
            disabled
            className="form-select font-sans bg-transparent text-lg pr-24 relative block w-full mt-6 mb-4 px-12 py-3 border border-borders-gray text-gray-600 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
          >
            <option value="Email">Email</option>
            <option value="Llamada">Llamada</option>
            <option selected value="Whatsapp">
              WhatsApp
            </option>
          </select>
        </div>
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            <span className="text-smartPurple pr-1">*</span>Comentarios a
            considerar del aspirante
          </label>
          <textarea
            required
            disabled
            className="font-sans bg-transparent text-sm appearance-none relative block w-full mt-6 mb-4 px-3 py-3 border border-borders-gray placeholder-gray-500 text-gray-600 rounded-lg focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10"
            placeholder="Feria universitaria"
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Detalle;
