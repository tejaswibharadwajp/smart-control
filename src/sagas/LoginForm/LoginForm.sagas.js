// import {delay} from 'redux-saga'
import {put, takeEvery, cancel} from 'redux-saga/effects';
import {getCookie, setCookie} from "../../utils/saveCookie";
import {
    actions as loginFormActions,
    types as loginFormTypes
} from '../../actions/LoginForm/LoginForm.actions';

const {login} = require("tplink-cloud-api");

async function kasaLogin(uname, password) {
    return await login(uname, password, "");
}

async function getKasaDeviceList(tpLink) {
    return await tpLink.getDeviceList();
}
export function* handleLogin(action) {
    try {
        const tpLink = yield kasaLogin(action.uname, action.password);
        if(tpLink && tpLink.error_code){
            yield put(loginFormActions.setSignInFlag(false, true))
        }
        else {
            yield put(loginFormActions.setSignInFlag(true, false));
            const deviceList = yield getKasaDeviceList(tpLink);
            if(!getCookie()){
                setCookie({uname: action.uname, uid: action.password});
            }
            yield put(loginFormActions.setUserAccDetails({tpLink, deviceList }));
        }
    }
    catch (e) {
        console.error('SAGA FAILED:', e);
    }

}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export default function* myProject() {
    yield takeEvery(loginFormTypes.HANDLE_LOGIN, handleLogin)
}