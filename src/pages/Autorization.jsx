import React from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit'
import { getTokenAsync } from "../redux/slices/user/user.actions"
import { useNavigate } from "react-router";

import global from "../styles/globalStyles.module.scss";
import auth from "../styles/pages/autorization.module.scss";


function Autorization() {

    const state = useSelector(state => state.userLogIn);

    const dispatch = useDispatch();

    const navigate = useNavigate();

  const validateLogin = (value) => {
    let error;
    if (!value) {
      error = "Введите логин";
    }
    else if ( value.includes('@') ) {
        if((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)))
        error = "Invalid email address";
    }
    else if (value.includes('+') || value.includes('(') || value.includes(')') || /^\d+$/i.test(value)){
        if(!/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/i.test(value))
      error = "Неверный телефонный номер";
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Введите пароль";
    } 
    return error;
  };

  const onSubmit = (values) => {
    dispatch(getTokenAsync(values))
    .then(unwrapResult)
    .then((data)=>{
      if(data.errorCode && data.message){
        alert("Ошибка!!!" + " " + `${data.message}` + "." + `\n` +  "Проверьте правильность введенных данных и повторите вход в личный кабинет"); 
      }else {
        navigate('/search'); 
      }
    })
    .catch((error)=>{
      console.log("Ошибка", error);
    });
  }

  return (
    <div className={`${global.wrapper} ${auth.container}`}>
      <div className={auth.info}>
        <h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
      </div>
      <div className={auth.info_image}><img src="./assets/images/Authorization-characters-image.svg" alt="" /></div>
      <div className={auth.form_container}>
        <img
          className={auth.form_img}
          src="./assets/icons/Autorization-lock-icon.svg"
          alt=""
        />

        <Formik
          initialValues={{ login: "", password: "" }}
          onSubmit={onSubmit}>
            
            <Form className={auth.form}>
              <div className={auth.header}>
                <p>Войти</p>
                <p>Зарегистрироваться</p>
              </div>
              <div className={auth.fields}>
                <label htmlFor="login">Логин или номер телефона:</label>
                <Field
                  name="login"
                  type="text"
                  validate={validateLogin}
                  className={auth.fields_input}
                  />
                <ErrorMessage
                  component="span"
                  name="login"
                  className={auth.errorMessage}
                />
                <label htmlFor="password">Пароль:</label>
                <Field
                  name="password"
                  type="password"
                  autoComplete="off"
                  validate={validatePassword}
                  className={auth.fields_input}
                />
                <ErrorMessage
                  component="span"
                  name="password"
                  className={auth.errorMessage}
                />
                <button type="submit" disabled={state.formSubmitClicked} className={auth.buttonsubmit}>
                  Войти
                </button>
              </div>
              <div className={auth.links}>
                <a>Восстановить пароль</a>
                <p>Войти через:</p>
                <div className={auth.links_buttons}>
                  <button disabled>
                    <img src="./assets/Authorization-form-button1.svg" alt="" />
                  </button>
                  <button disabled>
                    <img src="./assets/Authorization-form-button2.svg" alt="" />
                  </button>
                  <button disabled>
                    <img src="./assets/Authorization-form-button3.svg" alt="" />
                  </button>
                </div>
              </div>
            </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Autorization;
