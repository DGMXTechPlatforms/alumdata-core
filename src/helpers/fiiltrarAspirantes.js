import moment from 'moment';

export const filtrarAspirantes = (aspirantes, filtros) => {
  let aspirantesFiltrados = aspirantes.filter((a) => {
    let record = a;

    const nombreCompleto = [a.nombre, a.apellido_paterno, a.apellido_materno]
      .join(' ')
      .replaceAll(' ', '')
      .toLowerCase();
    const inputName = filtros.nombre.replaceAll(' ', '');

    const reg = new RegExp(`^${filtros.grado_de_interes}$`, 'g');

    //FILTRAR POR NOMBRE
    if (!nombreCompleto.includes(inputName)) {
      record = null;
    }

    //FILTRAR POR GRADO DE INTERES
    if (filtros.grado_de_interes.length > 0) {
      if (!a.gradoInteres.match(reg)) {
        record = null;
      }
    }

    //FILTRAR POR FECHA DE PROXIMO CONTACTO
    // if (filtros.fechaProximoContacto !== '') {
    //   if (
    //     !(
    //       new Date(a.fecha_proximo_contacto).getMonth() ===
    //       parseInt(filtros.fechaProximoContacto)
    //     )
    //   ) {
    //     record = null;
    //   }
    // }
    const aspiranteDate = moment(a.fecha_proximo_contacto);
    if (filtros.startFechaProximoContacto) {
      const startDate = moment(filtros.startFechaProximoContacto);
      if (!aspiranteDate.isSameOrAfter(startDate)) record = null;
    }
    if (filtros.endFechaProximoContacto) {
      const endDate = moment(filtros.endFechaProximoContacto);
      if (!aspiranteDate.isSameOrBefore(endDate)) record = null;
    }

    return record;
  });

  return aspirantesFiltrados.sort((a, b) => {
    if (a.nombre < b.nombre) return -1;
    if (a.nombre > b.nombre) return 1;
    return 0;
  });
};
