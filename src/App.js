import React from 'react';
import {Button, Grid, Paper, TextField} from '@material-ui/core';
import './App.css';
import {setCookie, getCookie} from './utils/saveCookie';
import HomePage from './components/HomePage/HomePage';
import {Provider} from 'react-redux';
import {store} from './store';

require('dotenv').config();


const {login} = require("tplink-cloud-api");

class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <div>
                    <Grid item xs={12} sm={3}>
                        <HomePage/>
                    </Grid>
                </div>
            </Provider>
        );
    }

}

export default App;
