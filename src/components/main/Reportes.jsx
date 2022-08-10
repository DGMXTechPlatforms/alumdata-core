import React, { Component } from 'react';
import MenuGeneral from './MenuGeneral';
import SmartSelect from '../ui/SmartSelect';
import {
  columnsReportes,
  columnsReportesContactar,
} from '../../helpers/dataTableHelpers';
import SmartDatatable from '../ui/SmartDatatable';
import { connect } from 'react-redux';
import { parseCat, parseObjectDate } from '../../helpers/utils';
import { fetchConToken } from '../../helpers/fetch';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import seguimientoAspirante from '../../css/img/seguimientoDetalleAspirante.svg';

const mapStateToprops = (state) => {
  return {
    catalogos: state.catalogos,
  };
};

class Reportes extends Component {
  constructor(props) {
    super(props);
    this.pageTitle = 'Reportes';
    this.data0 = [];
    this.data1 = [];
    this.today = new Date();
    this.state = {
      data0: this.data0,
      data1: this.data1,
      filters0: {},
      filters1: {
        tipo_reporte: 'hoy',
      },
      tab: 0,
    };
  }

  requestData = async (filters, url) => {
    return await (
      await fetchConToken(
        url +
          '&' +
          Object.keys(filters)
            .map((k) => `${k}=${filters[k] !== '' ? filters[k] : 'all'}`)
            .join('&'),
        null,
        'GET'
      )
    ).json();
  };

  fetchData = async (tab = null) => {
    const tabsReports = ['reportes/aspirantes', 'reportes/porcontactar'];
    if (tab !== null) {
      const filters = this.state[`filters${tab}`];
      const res = await this.requestData(
        filters,
        tabsReports[tab] + '?fecha_actual=' + parseObjectDate(this.today, 1)
      );
      if (res.ok) {
        switch (tab) {
          case 0:
            this.data0 = res.reporte;
            this.setState({ data0: this.data0 });
            break;
          case 1:
            this.data1 = res.reporte;
            this.setState({ data1: this.data1 });
            break;
          default:
            return;
        }
      } else {
        alert('Error: ' + res.msg);
      }
    } else {
      tabsReports.forEach(async (t, ix) => {
        const filters = this.state[`filters${ix}`];
        const res = await this.requestData(
          filters,
          t + '?fecha_actual=' + parseObjectDate(this.today, 1)
        );
        console.log(res);
        if (res.status === 'success') {
          switch (ix) {
            case 0:
              this.data0 = res.data.reporte;
              this.setState({ data0: this.data0 });
              break;
            case 1:
              this.data1 = res.data.reporte;
              this.setState({ data1: this.data1 });
              break;
            default:
              break;
          }
        } else {
          alert('Error: ' + res.msg);
        }
      });
    }
  };

  handleSearch = (lookupField, searchValue) => {
    const { tab } = this.state;
    const searchLower = searchValue.toLowerCase();
    const data = this[`data${tab}`];
    const filteredData = [];
    if (lookupField === 'all') {
      data.forEach((d) => {
        let found = false;
        Object.keys(d).forEach((k) => {
          const val = d[k].toLowerCase();
          if (val.indexOf(searchLower) !== -1) {
            found = true;
            return;
          }
        });
        if (found) {
          filteredData.push(d);
        }
      });
    } else {
      data.forEach((d) => {
        const val = d[lookupField].toLowerCase();
        if (val.indexOf(searchLower) !== -1) {
          filteredData.push(d);
        }
      });
    }
    this.setState({ [`data${tab}`]: filteredData });
  };

  formOnChange = (e) => {
    const { tab } = this.state;
    this.setState(
      {
        [`filters${tab}`]: {
          ...this.state[`filters${tab}`],
          [e.target.name]: e.target.value,
        },
      },
      () => {
        this.fetchData(tab);
      }
    );
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { data0, data1, tab, filters0, filters1 } = this.state;
    const { catalogos } = this.props;
    const {
      modalidades: catModalidades,
      programas: catProgramas,
      planteles: catPlanteles,
      gradosinteres: catGradosInt,
      origendedatos: catOrigenes,
      ciclosescolares: catCiclos,
    } = catalogos;
    return (
      <div className="container mx-auto">
        <MenuGeneral pageTitle={this.pageTitle} />
        <div
          className="reportGeneralContainer mx-auto mb-16 place-items-start content-start"
          style={{ marginTop: '5%' }}
        >
          <div className="grid w-full tabsReportes mt-4 ml-4">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabContext value={tab}>
                <TabList
                  onChange={(e, n) => {
                    this.setState({ tab: n });
                  }}
                  aria-label="basic tabs example"
                >
                  <Tab label="360" />
                  <Tab label="por contactar" />
                  <img
                    src={seguimientoAspirante}
                    width="25"
                    className="mx-1 pb-2"
                    onClick={() => {
                      this.setState({ isOpenModalSeguimiento: true });
                    }}
                    alt="Exportar"
                  />
                </TabList>
                <TabPanel value={0}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
                      gridGap: '15px',
                    }}
                    className="mb-10 reportsFilters"
                  >
                    <SmartSelect
                      placeholder="Ciclo escolar"
                      name="ciclo_escolar"
                      onChange={this.formOnChange}
                      options={parseCat(catCiclos, 'id', 'nombre')}
                    />
                    <SmartSelect
                      placeholder="Plantel"
                      name="plantel_id"
                      onChange={this.formOnChange}
                      options={parseCat(
                        catPlanteles,
                        'idPlantel',
                        'nombrePlantel'
                      )}
                    />
                    <SmartSelect
                      placeholder="Modalidad"
                      name="modalidad_id"
                      onChange={this.formOnChange}
                      options={parseCat(
                        catModalidades,
                        'idModalidad',
                        'nombreModalidad'
                      )}
                    />
                    <SmartSelect
                      placeholder="° Interés"
                      name="grado_interes_id"
                      onChange={this.formOnChange}
                      options={parseCat(catGradosInt, 'id', 'nombre')}
                    />
                    <SmartSelect
                      placeholder="Programa"
                      name="id_programa"
                      onChange={this.formOnChange}
                      options={parseCat(catProgramas, 'id', 'nombre')}
                    />
                    <SmartSelect
                      placeholder="Origen"
                      name="id_origen_dato"
                      onChange={this.formOnChange}
                      options={parseCat(catOrigenes, 'id', 'nombre')}
                    />
                  </div>
                  <SmartDatatable
                    data={data0}
                    columnsDef={columnsReportes}
                    filterHandler={this.handleSearch}
                  />
                </TabPanel>
                <TabPanel value={1}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
                      gridGap: '15px',
                    }}
                    className="mb-10 reportsFilters"
                  >
                    {/*<SmartSelect
                      placeholder="Ciclo escolar"
                      name="ciclo_escolar"
                      onChange={this.formOnChange}
                      options={[]}
                      inputProps={{ disabled: true }}
                    />*/}
                    <SmartSelect
                      placeholder="Hoy"
                      placeholderValue="hoy"
                      name="tipo_reporte"
                      onChange={this.formOnChange}
                      options={parseCat(
                        [
                          { key: 'Pendientes', value: 'pendientes' },
                          { key: 'Proximos', value: 'proximos' },
                        ],
                        'value',
                        'key'
                      )}
                      value={filters1.tipo_reporte}
                    />
                    <SmartSelect
                      placeholder="Plantel"
                      name="plantel_id"
                      onChange={this.formOnChange}
                      options={parseCat(
                        catPlanteles,
                        'idPlantel',
                        'nombrePlantel'
                      )}
                    />
                    <SmartSelect
                      placeholder="Modalidad"
                      name="modalidad_id"
                      onChange={this.formOnChange}
                      options={parseCat(
                        catModalidades,
                        'idModalidad',
                        'nombreModalidad'
                      )}
                    />
                    <SmartSelect
                      placeholder="° Interés"
                      name="grado_interes_id"
                      onChange={this.formOnChange}
                      options={parseCat(catGradosInt, 'id', 'nombre')}
                    />
                    <SmartSelect
                      placeholder="Programa"
                      onChange={this.formOnChange}
                      name="id_programa"
                      options={parseCat(catProgramas, 'id', 'nombre')}
                    />
                    <SmartSelect
                      placeholder="Origen"
                      onChange={this.formOnChange}
                      name="id_origen_dato"
                      options={parseCat(catOrigenes, 'id', 'nombre')}
                    />
                  </div>
                  <SmartDatatable
                    data={data1}
                    columnsDef={columnsReportesContactar}
                    filterHandler={this.handleSearch}
                  />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
        <div className="footerLogo">
          <div className="cssLogoSmartSm right-8"></div>
        </div>
      </div>
    );
  }
}

Reportes.propTypes = {};

export default connect(mapStateToprops, {})(Reportes);
