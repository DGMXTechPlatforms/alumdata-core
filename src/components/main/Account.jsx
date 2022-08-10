import React, { Component, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import TitleBlock from '../ui/TitleBlock';
import cargarImagen from '../../css/img/cargarImagen.svg';
import TitleSection from '../ui/TitleSection';
import SmartInput from '../ui/SmartInput';
import { contextOnChange } from '../../helpers/classFormHandler';
import {
  nombreMD,
  puestoMD,
  fechaMD,
  emailMD,
  telefonoMD,
} from '../../helpers/formIcons';
import { connect } from 'react-redux';
import { fetchConToken } from '../../helpers/fetch';
import SmartButton from '../ui/SmartButton';
import { Link } from 'react-router-dom';
import MenuGeneral from './MenuGeneral';
import { useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../actions/auth';
import moment from 'moment';
const initialForm = {
  nombre: '',
};

const Account = () => {
  const [formulario, setFormulario] = useState(initialForm);
  const [nombreImagen, setNombreImagen] = useState('');

  const [images, setImages] = useState([]);
  const [vprevia, setVprevia] = useState(cargarImagen);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const { fecha_nacimiento } = auth;

    const date = moment(fecha_nacimiento).format('YYYY-MM-DD');

    setFormulario({
      nombre: auth.name,
      email: auth.username,
      puesto: auth.puesto,
      fecha_nacimiento: date,
      telefono: auth.telefono,
      nombreImagen: '',
    });
  }, []);

  const onDrop = useCallback((acceptedFiles, rejectFiles) => {
    acceptedFiles.forEach((file) => {
      if (file.size < 1400000) {
        const reader = new FileReader();
        reader.onload = () => {
          setImages((prevState) => [...prevState, reader.result]);
        };
        setNombreImagen(file.name);
        reader.readAsDataURL(file);
      } else {
        alert('El peso de la imagen no debe exceder los 2MB');
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  });

  const handlePerfilInputChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const last = images.length;
    if (images.length > 0) {
      setVprevia(images[last - 1]);
    } else {
      setVprevia(cargarImagen);
    }
  }, [images]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (formulario.nombre === null || !formulario.nombre.trim()) {
      alert('El nombre es requerido');

      return false;
    }

    if (formulario.nombre.trim().length > 50) {
      alert('El nombre es demasiado largo');
      return false;
    }

    if (images.length > 0) {
    }

    let useer = {
      nombre: formulario.nombre,
      //id: auth.id,
      puesto: formulario.puesto,
      telefono: formulario.telefono,
      fecha_nacimiento: new Date(formulario.fecha_nacimiento).toISOString(),
    };

    if (images.length > 0) {
      useer = { ...useer, imagen: images, nombreImagen: nombreImagen };
    }
    const res = await (
      await fetchConToken('auth/micuenta', useer, 'PUT')
    ).json();
    if (res.status === 'success') {
      dispatch(
        updateProfile({
          id: res.data.usuario.id,
          name: res.data.usuario.nombre,
          username: res.data.usuario.username,
          puesto: res.data.usuario.puesto,
          fecha_nacimiento: res.data.usuario.fecha_nacimiento,
          telefono: res.data.usuario.telefono,
          userImg: res.data.usuario.imagen,
          id_rol: res.data.usuario.id_rol,
        })
      );
      alert('Se actualizo el usuario ');
    } else {
      alert('Error: ' + res.msg);
    }
  };

  return (
    <form encType="multipart/form-data">
      <div className="cssAccountContainerGral container mx-auto">
        <MenuGeneral pageTitle="Cuenta" />
        <div className="cssAccountContainer topRowForm w-3/5 mx-auto relative mt-4 mb-16 place-items-start content-start">
          <TitleBlock text={'Mi cuenta'} />
          <div className="cssMyAccount grid grid-cols-2 w-full">
            <div className="grid w-full px-10">
              <TitleSection title="Mis datos" />

              <SmartInput
                title="Nombre"
                name="nombre"
                onChange={handlePerfilInputChange}
                imageSrc={nombreMD}
                isRequired={true}
                placeholder="Jhon Doe"
                value={formulario.nombre || ''}
              />

              <SmartInput
                onChange={handlePerfilInputChange}
                title="Puesto"
                name="puesto"
                imageSrc={puestoMD}
                inputProps={{ readOnly: false }}
                isRequired={true}
                value={formulario.puesto || 'Sin definir aún'}
              />

              <SmartInput
                title="Teléfono"
                name="telefono"
                imageSrc={telefonoMD}
                isRequired={true}
                placeholder="55 5503 0493"
                value={formulario.telefono}
                onChange={handlePerfilInputChange}
                type="text"
              />
              <SmartInput
                onChange={handlePerfilInputChange}
                title="Email"
                type="email"
                name="email"
                imageSrc={emailMD}
                inputProps={{ readOnly: true }}
                value={formulario.email || ''}
                isRequired={true}
              />
              <SmartInput
                onChange={handlePerfilInputChange}
                title="Fecha de nacimiento"
                type="date"
                name="fecha_nacimiento"
                placeholder="dd/mm/aaaa"
                imageSrc={fechaMD}
                value={formulario.fecha_nacimiento || ''}
                isRequired={true}
              />

              <Link
                to="/home"
                className="block w-full text-center text-smartPurple my-2"
              >
                Solicitar cambio de contraseña
              </Link>
            </div>
            <div className="titleProfile w-full px-10" onClick={() => {}}>
              <TitleSection title="Imagen de perfil" />
              <div className="w-full text-center py-5">
                <img className="rounded-full w-2/3 inline" src={auth.userImg} />
              </div>
              <div
                {...getRootProps()}
                className="w-full text-center border-dashed border-4 rounded-xl py-5"
              >
                <img className="rounded-full w-1/2 inline" src={vprevia} />
                <div className="block">
                  <input {...getInputProps()} />
                  <span className="text-smartPurple text-lg font-bold block">
                    Arrastre su archivo
                  </span>
                  <span className="text-smartPurple text-sm block my-2">
                    o elegir desde su dispositivo
                  </span>
                  <span className="text-basic-gray text-xs block font-thin">
                    Sólo archivos JPG, PNG o GIF de máximo 2 MB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 z-10 buttonForm" style={{ bottom: '3.5rem' }}>
          <SmartButton title="Actualizar" onClick={handleUpdate} />
        </div>
        <div className="footerLogo">
          <div className="cssLogoSmartSm right-8"></div>
        </div>
      </div>
    </form>
  );
};

export default Account;
