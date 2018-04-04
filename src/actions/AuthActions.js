import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {EMAIL_CHANGE, PASSWORD_CHANGE, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER} from './types';


export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGE,
        payload: text
    };
};

export const passwordChange = (text) =>{
    return{
        type: PASSWORD_CHANGE,
        payload: text
    }
};

export const loginUser = ({email, password}) =>{
    console.log("Login " + email + " " + password)
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(user => loginUserSuccess(dispatch,user))
        .catch((error)=>{
            console.log(error);
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(user => {
                dispatch({
                    type: LOGIN_USER_SUCCESS, payload: user
                })
            })
            .catch(
                () => loginUserFail(dispatch)
            );
        });
    }
};

const loginUserFail = (dispatch) =>{
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: "Fail"
    });
}

const loginUserSuccess = (dispatch, user) =>{
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.push('dashboard');
    //Actions.replace('dashboard');
    //Actions.employeeList()
}
