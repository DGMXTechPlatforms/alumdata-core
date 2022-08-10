export const parseCat = (arr, strKey, strVal) => {
  if (arr) {
    return arr.map((n) => {
      return {
        key: n[strKey],
        value: n[strVal],
      };
    });
  }
  return [];
};

export const mapMenuItems = (items, rol) => {
  return items.filter((item) => {
    return item.rolesEnabled ? item.rolesEnabled.includes(rol) : true;
  });
};

export const parseObjectDate = (date, format = 1) => {
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  let r;
  switch (format) {
    case 1: // DD/MM/YYYY
      r = [
        date.getDate().toString().padStart(2, '0'),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getFullYear(),
      ].join('/');
      break;
    case 2: // Dia Mes YY
      r = [
        date.getDate().toString().padStart(2, '0'),
        meses[date.getMonth()],
        date.getFullYear().toString().substring(2, 4) + "'",
      ].join(' ');
      break;

    case 3: // DD/MM/YYYY
      r = [
        date.getDate().toString().padStart(2, '0'),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getFullYear(),
      ].join('/');
      break;
    case 4: // YYYY-MM-DD
      r = [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getDate().toString().padStart(2, '0'),
      ].join('-');
      break;
    default:
  }
  return r;
};

export const validateBoolObject = (object, initalValid = true) => {
  let isValid = initalValid;
  Object.keys(object).forEach((k) => {
    isValid *= object[k];
  });
  return isValid;
};

export const trasnformToSeries = (data = [], seriesKeys = []) => {
  const categories = [];
  const series = [];
  seriesKeys.forEach((k) => {
    series.push({ ...k, data: [] });
  });
  data.forEach((g) => {
    categories.push(g.name);
    series.forEach((s, indx) => {
      if (g[s.key]) {
        series[indx].data.push(parseInt(g[s.key]));
      } else {
        series[indx].data.push(0);
      }
    });
  });
  return {
    xAxis: {
      categories,
    },
    series,
  };
};
