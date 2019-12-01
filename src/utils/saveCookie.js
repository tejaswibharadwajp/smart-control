import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

export const setCookie = (userInfo) => {
    let userobj = {
        eun: CryptoJS.AES.encrypt(userInfo.uname, 'kasaappcookie').toString(),
        euw: CryptoJS.AES.encrypt(userInfo.uid, 'kasaappcookie').toString(),
    };
    Cookies.set('ui_cookie', userobj);
};

export const getCookie = () => {
    if(Cookies.get('ui_cookie')){
        console.log(JSON.parse(Cookies.get('ui_cookie')), 'TPLINK FROM GET COOKIE');
        let userObj = JSON.parse(Cookies.get('ui_cookie'));
        userObj = {
            username: CryptoJS.AES.decrypt(userObj.eun, 'kasaappcookie').toString(CryptoJS.enc.Utf8),
            uid: CryptoJS.AES.decrypt(userObj.euw, 'kasaappcookie').toString(CryptoJS.enc.Utf8),
        };
        return userObj;
    }
};

