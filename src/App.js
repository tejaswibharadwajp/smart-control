import React from 'react';
import {Button, Grid, Paper, TextField} from '@material-ui/core';
import './App.css';

require('dotenv').config();


const {login} = require("tplink-cloud-api");

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            kasaAccProps: "",
            kasaDevicesList: "",
            isSignedIn: false,
            showError: false,
        };
        this.controlSwitch = this.controlSwitch.bind(this);
        this.controlBulb = this.controlBulb.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    async handleInputChange() {
        const {username, password} = this.state;
        try {
            if(username && password){
                const tpLink = await login(username, password, "");
                if (tpLink && tpLink.error_code) {
                    this.setState({isSignedIn: false, showError: true});
                } else {
                    this.setState({isSignedIn: true, showError: false});
                    this.setState({kasaAccProps: tpLink});
                    let deviceList = await tpLink.getDeviceList();
                    console.log(deviceList);
                }
            }
            else{
                this.setState({isSignedIn: false, showError: true});
            }
        } catch (e) {
            console.log(e)
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

    async controlBulb(on) {
        try {
            const {kasaAccProps} = this.state;
            if (on) {
                await kasaAccProps.getLB130("Closet Light").setState(1, 80, 300, 100);
            } else {
                await kasaAccProps.getLB130("Closet Light").powerOff();
            }
        } catch (e) {

            console.log(e)
        }
    }

    render() {
        const {isSignedIn, showError} = this.state;
        return (
            <div>
                <Grid item xs={12} sm={3}>
                    {!isSignedIn && <Paper>
                          <div>
                            <TextField
                                id="username"
                                label="Username"
                                type="text"
                                margin="normal"
                                onChange={this.handleChange('username')}
                            />
                        </div>
                        <div>
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                margin="normal"
                                onChange={this.handleChange('password')}
                            />
                        </div>
                        {showError && <div className='App_errorMessage'> Incorrect Username or Password</div>}
                        <Button variant="outlined" onClick={() => {
                            this.handleInputChange();
                        }}> Submit
                        </Button>
                    </Paper>}
                    {isSignedIn && <Paper>
                        <div>
                            Control Smart Plug
                            <Button variant="outlined" onClick={() => {
                                this.controlSwitch(true)
                            }}> Turn On
                            </Button>
                            <Button variant="outlined" onClick={() => {
                                this.controlSwitch(false)
                            }}> Turn Off
                            </Button>
                        </div>
                        <div>
                            Control closet bulb
                            <Button variant="outlined" onClick={() => {
                                this.controlBulb(true)
                            }}> Turn On
                            </Button>
                            <Button variant="outlined" onClick={() => {
                                this.controlBulb(false)
                            }}> Turn Off
                            </Button>
                        </div>
                    </Paper>}
                </Grid>
            </div>
        );
    }

}

export default App;
