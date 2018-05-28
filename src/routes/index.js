import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Overview from '../components/pages/Overview';
import ConsultationSchedule from '../components/pages/ConsultationSchedule';
import Patient from '../components/pages/Patient';

const App = () => {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/overview" component={Overview} />
            <Route path="/consultation-schedule" component={ConsultationSchedule} />
            <Route path="/patient" component={Patient} />
            <Redirect from="/" to ="/overview" />
        </Switch> 
    </BrowserRouter>
  );
}

export default App;
