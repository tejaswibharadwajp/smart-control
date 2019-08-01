import React from 'react';
import logo from './logo.svg';

import './App.css';
require('dotenv').config();


const {login} = require("tplink-cloud-api");

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            kasaAccProps: "",
            kasaDevicesList: ""
        }
        this.controlSwitch = this.controlSwitch.bind(this);
    }

    async componentDidMount() {
        try {
            let username = process.env.KASA_USER_NAME;
            let pass = process.env.KASA_PASSWORD;

            const tpLink = await login(username, pass, "");
            console.log(tpLink);
            this.setState({kasaAccProps: tpLink});
            let deviceList = await tpLink.getDeviceList();
            console.log(deviceList);
        } catch (e) {

        }
    }

    async controlSwitch(on) {
        try {
            const {kasaAccProps} = this.state;
            if (on) {
                await kasaAccProps.getHS100("Room light").powerOn();
            } else {
                await kasaAccProps.getHS100("Room light").powerOff();
            }
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <button onClick={() => {
                        this.controlSwitch(true)
                    }}> Turn On
                    </button>
                    <button onClick={() => {
                        this.controlSwitch(false)
                    }}> Turn Off
                    </button>
                </header>
            </div>
        );
    }

}

export default App;
