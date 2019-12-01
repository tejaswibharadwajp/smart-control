import {
    actions as loginFormAction,
    types as loginFormTypes
} from '../../actions/LoginForm/LoginForm.actions';

const initalState = {
    userInfo: {},
    isSignedIn: false,
    showError: false,
    userDeviceList: []
}

export default (state = initalState , action) => {
    switch (action.type) {
        case loginFormTypes.SET_USER_ACC_DETAILS:
            let userInfo = action.data.tpLink;
            let userDeviceList = action.data.deviceList;
            return {
                ...state,
                userInfo,
                userDeviceList
            };

        case loginFormTypes.SET_SIGNIN_FLAG:
            return {
                ...state,
                isSignedIn: action.signInFlag,
                showError: action.showError
            };

        default:
            return state;

    }

};
