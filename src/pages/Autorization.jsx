import React from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit'
import { getTokenAsync } from "../redux/slices/user/user.actions"
import { useNavigate } from "react-router";

import global from "../styles/globalStyles.module.scss";
import autor from "../styles/pages/autorization.module.scss";


function Autorization() {

    const state = useSelector(state => state.userLogIn);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    console.log(state);

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
        console.log("redirect");
        navigate('/search'); 
      }
    })
    .catch((error)=>{
      console.log("Ошибка", error);
    });
  }

  return (
    <div className={`${global.wrapper} ${autor.container}`}>
      <div className={autor.info}>
        <h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
      </div>
      <div className={autor.info_image}><img src="./assets/images/Authorization-characters-image.svg" alt="" /></div>
      <div className={autor.form_container}>
        <img
          className={autor.form_img}
          src="./assets/icons/Autorization-lock-icon.svg"
          alt=""
        />

        <Formik
          initialValues={{ login: "", password: "" }}
          onSubmit={onSubmit}>
            
            <Form className={autor.form}>
              <div className={autor.header}>
                <p>Войти</p>
                <p>Зарегистрироваться</p>
              </div>
              <div className={autor.fields}>
                <label htmlFor="login">Логин или номер телефона:</label>
                <Field
                  name="login"
                  type="text"
                  validate={validateLogin}
                  className={autor.fields_input}
                  />
                <ErrorMessage
                  component="span"
                  name="login"
                  className={autor.errorMessage}
                />
                <label htmlFor="password">Пароль:</label>
                <Field
                  name="password"
                  type="password"
                  autoComplete="off"
                  validate={validatePassword}
                  className={autor.fields_input}
                />
                <ErrorMessage
                  component="span"
                  name="password"
                  className={autor.errorMessage}
                />
                <button type="submit" disabled={state.formSubmitClicked} className={autor.buttonsubmit}>
                  Войти
                </button>
              </div>
              <div className={autor.links}>
                <a>Восстановить пароль</a>
                <p>Войти через:</p>
                <div className={autor.links_buttons}>
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
