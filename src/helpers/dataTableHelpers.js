import { parseObjectDate } from './utils';

const customCell = (
  selector,
  alignment = 'left',
  renderText = (text) => {
    return text;
  }
) => {
  return (row) => (
    <div style={{ textAlign: alignment, width: '100%' }}>
      {renderText(row[selector])}
    </div>
  );
};

export const customStyles = {
  rows: {
    style: {
      minHeight: '72px', // override the row height
    },
  },
  headCells: {
    style: {
      fontSize: '18px',
      padding: '8px 0',
      backgroundColor: '#40769A',
      color: '#fff',
    },
  },
  cells: {
    style: {
      paddingLeft: '2%', // override the cell padding for data cells
      paddingRight: '2%',
    },
  },
};

export const columnsReportes = [
  {
    name: 'Plantel',
    width: '15%',
    key: 'Plantel',
    cell: customCell('Plantel'),
  },
  {
    name: 'Usuario',
    width: '20%',
    key: 'Usuario',
    cell: customCell('Usuario'),
  },
  {
    name: 'Aspirante',
    width: '25%',
    key: 'Aspirante',
    cell: customCell('Aspirante'),
  },
  {
    name: 'Teléfono',
    width: '10%',
    key: 'Telefono',
    cell: customCell('Telefono'),
  },
  {
    name: 'Origen del dato',
    width: '10%',
    key: 'origenDelDato',
    cell: customCell('origenDelDato'),
  },
  {
    name: 'Nivel de estudios',
    width: '10%',
    key: 'NivelEstudios',
    cell: customCell('NivelEstudios'),
  },
  {
    name: 'Programa',
    width: '10%',
    key: 'Programa',
    cell: customCell('Programa'),
  },
];

export const columnsReportesContactar = [
  {
    name: 'Aspirante',
    width: '20%',
    key: 'Aspirante',
    cell: customCell('Aspirante'),
  },
  {
    name: 'Teléfono',
    width: '12%',
    key: 'Telefono',
    cell: customCell('Telefono'),
  },
  {
    name: 'Origen del dato',
    width: '18%',
    key: 'origenDelDato',
    cell: customCell('origenDelDato'),
  },
  {
    name: 'Programa',
    width: '16%',
    key: 'Programa',
    cell: customCell('Programa'),
  },
  {
    name: 'Fecha último contacto',
    width: '17%',
    key: 'fecha_ultimo_contacto',
    cell: customCell('fecha_ultimo_contacto', 'center', (date) => {
      return parseObjectDate(new Date(date), 2);
    }),
  },
  {
    name: 'Fecha próximo contacto',
    width: '17%',
    key: 'fecha_proximo_contacto',
    cell: customCell('fecha_proximo_contacto', 'center', (date) => {
      return parseObjectDate(new Date(date), 2);
    }),
  },
  /*{
    name: 'Días u/c',
    width: '10%',
    key: '',
    cell: customCell('fecha_ultimo_contacto', 'center', (date) => {
      return parseObjectDate(new Date(date), 2);
    }),
  },*/
];
