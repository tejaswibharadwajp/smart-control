export const types = {
    SET_SIGNIN_FLAG: 'LOGINFORM_SET_SIGNIN_FLAG',
    SET_USER_ACC_DETAILS: 'LOGINFORM_SET_USER_ACC_DETAILS',
    HANDLE_LOGIN: 'LOGINFORM_HANDLE_LOGIN'
}


export const actions = {
    setUserAccDetails: (data) => (
        {type: types.SET_USER_ACC_DETAILS, data}),
    setSignInFlag: (signInFlag, showError) => (
        {type: types.SET_SIGNIN_FLAG, signInFlag, showError}),
    handleUserLogin: (uname, password) => (
        {type: types.HANDLE_LOGIN,uname, password}
    )
}