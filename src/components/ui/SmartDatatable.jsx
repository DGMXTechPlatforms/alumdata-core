import React from 'react';
import PropTypes from 'prop-types';
import { customStyles } from '../../helpers/dataTableHelpers';
import DataTable from 'react-data-table-component';
import './SmartDatatable.css';

const SmartDatatable = ({ columnsDef, filterHandler, data }) => {
  return (
    <div className='dataTableContainer'>
      <table className={'smartDatatable'}>
        <thead>
          <tr>
            {columnsDef.map((col) => {
              return (
                <th style={{ width: `${col.width || '10%'}` }}>{col.name}</th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {columnsDef.map((col) => {
              return (
                <td
                  style={{
                    width: `${col.width || 10}%`,
                    backgroundColor: '#ececec',
                  }}
                  className="px-1 py-2"
                >
                  <input
                    onChange={(e) => {
                      filterHandler(col.key, e.target.value);
                    }}
                    placeholder="Filtrar"
                    className="font-sans bg-white text-lg appearance-none relative block w-full mt-0 mb-0 px-4 py-1 border border-borders-gray placeholder-gray-500 text-gray-600 rounded-sm focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
                  />
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <DataTable
        pagination={10}
        noTableHead={true}
        columns={columnsDef}
        data={data}
        striped={true}
        customStyles={customStyles}
      />
    </div>
  );
};

SmartDatatable.propTypes = {
  filterHandler: PropTypes.func.isRequired,
  columnsDef: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default SmartDatatable;
