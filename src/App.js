import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './store';

//Routes';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Overview from './components/pages/Overview';
import ConsultationSchedule from './components/pages/ConsultationSchedule';
import Patient from './components/pages/Patient';

import Master from './components/pages/Master';

const routes = [
    {
        path: '/doctor/:doctorId/overview',  //append activeDoctor +
        sidebar: () => <Overview />,
        main: () => <Overview />
    },
    {
        path: '/doctor/:doctorId/consultation-schedule',
        sidebar: () => <ConsultationSchedule />,
        main: () => <ConsultationSchedule />
    },
    {
        path: '/patient',
        sidebar: () => <Patient />,
        main: () => <Patient />
    }
]

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router>
                <Master>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            exact={route.exact}
                            component={route.main}
                            />
                    ))}
                </Master>
            </Router>
        </Provider>
    );
  }
}

export default App;
