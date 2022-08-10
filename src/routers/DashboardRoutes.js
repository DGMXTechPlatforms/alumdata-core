import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Paso1 from '../components/registro/Paso1';
import Paso2 from '../components/registro/Paso2';
import Paso3 from '../components/registro/Paso3';
import Home from '../components/main/Home';
import CardHome from '../components/ui/CardHome';
import Registro from '../components/main/Registro';
import Account from '../components/main/Account';
import Config from '../components/main/Config';
import Reportes from '../components/main/Reportes';
import Aspirantes from '../components/main/Aspirantes';
import InfoAspirante from '../components/main/InfoAspirante';
import InfoLicencia from '../components/main/InfoLicencia';
import Analytics from '../components/main/Analytics';

export const DashboardRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/config" component={Config} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/prospects" component={Aspirantes} />
        <Route exact path="/newProspect" component={Registro} />

        <Route exact path="/paso1" component={Paso1} />
        <Route exact path="/paso2" component={Paso2} />
        <Route exact path="/paso3" component={Paso3} />

        <Route exact path="/prospects" component={InfoAspirante} />
        <Route exact path="/prospectDetails/:id" component={InfoAspirante} />
        <Route exact path="/licenseDetails/:id" component={InfoLicencia} />
        <Route exact path="/analytics" component={Analytics} />
        <Route exact path="/reports" component={Reportes} />

        <Route exact path="/cardhome" component={CardHome} />

        <Redirect to="/" />
      </Switch>
    </>
  );
};
