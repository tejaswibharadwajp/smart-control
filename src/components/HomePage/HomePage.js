import React from 'react';
import {Button, Grid, Paper, TextField} from '@material-ui/core';
import {getCookie, setCookie} from "../../utils/saveCookie";
import {connect} from 'react-redux';
import {actions} from '../../actions/LoginForm/LoginForm.actions';


require('dotenv').config();

const {login} = require("tplink-cloud-api");

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            kasaAccProps: "",
            kasaDevicesList: "",
            isSignedIn: false,
            showError: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.controlSwitch = this.controlSwitch.bind(this);
        this.controlBulb = this.controlBulb.bind(this);
    }

    async controlSwitch(on) {
        try {
            const {userInfo} = this.props;
            if (on) {
                await userInfo.getHS100("Room light").powerOn();
            } else {
                await userInfo.getHS100("Room light").powerOff();
            }
        } catch (e) {
            console.log(e)
        }
    }

    async controlBulb(on) {
        try {
            const {userInfo} = this.props;
            if (on) {
                await userInfo.getLB130("Closet Light").setState(1, 80, 300, 100);
            } else {
                await userInfo.getLB130("Closet Light").powerOff();
            }
        } catch (e) {

            console.log(e)
        }
    }

    async componentDidMount() {
        let userInfo = getCookie();
        if (userInfo) {
            this.handleLogin(userInfo.username, userInfo.uid);
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    async handleLogin(username, password) {
        this.props.handleUserLogin(username, password);
    }

    handleInputChange() {
        const {username, password} = this.state;
        this.handleLogin(username, password);
    }

    render() {
        const {isSignedIn, showError} = this.props;
        console.log(this.props.userDeviceList);
        return (
            <div>
                {!isSignedIn && !getCookie() && <Paper>
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

                { isSignedIn && <Paper>
                    <div>
                    Control Smart Plug
                        <Button variant="outlined" onClick={() => {this.controlSwitch(true)}}>
                            Turn On
                        </Button>
                        <Button variant="outlined" onClick={() => {this.controlSwitch(false)}}>
                            Turn Off
                        </Button>
                    </div>
                    <div>
                    Control closet bulb
                        <Button variant="outlined" onClick={() => {this.controlBulb(true)}}>
                            Turn On
                        </Button>
                        <Button variant="outlined" onClick={() => {this.controlBulb(false)}}>
                            Turn Off
                        </Button>
                    </div>
                    </Paper>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.loginForm.isSignedIn,
        showError: state.loginForm.showError,
        userDeviceList: state.loginForm.userDeviceList,
        userInfo: state.loginForm.userInfo

    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleUserLogin: (username, password) => {
            dispatch(actions.handleUserLogin(username, password))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
