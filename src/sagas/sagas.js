import loginFormSagas from './LoginForm/LoginForm.sagas'
import { fork } from 'redux-saga/effects';
export default function*(){
    yield[
        fork( loginFormSagas )
    ]
}