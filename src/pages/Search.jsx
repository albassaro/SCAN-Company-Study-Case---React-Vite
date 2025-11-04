import { React, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getSearchHystagramAsync } from "../redux/slices/search/search.actions";
import { unwrapResult } from "@reduxjs/toolkit";

import global from "../styles/globalStyles.module.scss";
import search from "../styles/pages/search.module.scss";
import { actions } from "../redux/slices/user/user.slice";


function Search() {

  const dispatch = useDispatch();

  // Проверка токена
  dispatch(actions.checkToken());

  // Получение state из redux
  const state = useSelector(state => state);

  const navigate = useNavigate();


 // Проверка прав доступа к странице (если нет то отправляет на страницу с формой авторизации)
  useEffect(()=>{
    if (!state.userLogIn.userIsOnline){
      return navigate ("/autorization");
    }

  },[dispatch,state.userLogIn.userIsOnline]);
  

  // state для валидации даты на форме
  const [newStartDate, setNewStartDate] = useState();
  const [newEndDate, setNewEndDate] = useState();


  // 4 функции для проверки валидности полей формы
  const checkInn = (value) => {
    let error;

    if (!value) {
      error = "Введите ИНН";
    } 

    if (value.toString().length === 10){
        const result = ((
          2 * value.toString().substring(0,1) +
          4 * value.toString().substring(1,2) +
          10 * value.toString().substring(2,3) +
          3 * value.toString().substring(3,4) +
          5 * value.toString().substring(4,5) +
          9 * value.toString().substring(5,6) +
          4 * value.toString().substring(6,7) +
          6 * value.toString().substring(7,8) +
          8 * value.toString().substring(8,9)) %11) %10; 
          if (value.toString().substring(9,10) !== result.toString()){
             error = "Неверный ИНН"
          }    
    }else  error = "Длина ИНН должна быть 10 цифр"
    
    return error
  }
    
  const checkLimit = (value) => {
    let error;
    if (!value) {
      error = "Введите лимит документов";
    }
    if (value > 1000) error = "Число не должно превышать 1000"
    if (value <= 0) error = "Число должно быть больше 0"

    return error;
  };
  const checkStartDate = (value) => {
    let error;
    if (!value) {
      error = "Введите дату начала";
    }

    if (!/^\d\d\.\d\d\.\d\d$/i.test(value) && value.substring(0, 1) != 0) {
      let changeStartDate = new Date(
        value.substring(0, 4),
        value.substring(5, 7) - 1,
        value.substring(8, 10)
      );
      setNewStartDate(changeStartDate);
      if (changeStartDate > new Date()) {
        error = "Значение больше текущей даты";
      } 
    }
    return error;
  };
  const checkEndDate = (value) => {
    let error;
    if (!value) {
      error = "Введите дату конца";
    }
    if (!/^\d\d\.\d\d\.\d\d$/i.test(value) && value.substring(0, 1) != 0) {
      let changeEndDate = new Date(
        value.substring(0, 4), value.substring(5, 7) - 1, value.substring(8, 10)
      );
      setNewEndDate(changeEndDate);
      if (changeEndDate > new Date()) {
        error = "Значение больше текущей даты";
      } 
      else if (changeEndDate < newStartDate) {
        error = "Значение меньше начальной даты";
      }
    }
    return error;
  };

  const onSubmit = (formData) => {
    // Выполнение запроса 
    dispatch(getSearchHystagramAsync(formData))
    .then(unwrapResult)
    .then((hystogramData)=>{
      if(hystogramData.errorCode && hystogramData.message){
        alert("Ошибка!!!" + " " + `${hystogramData.message}`); 
      }else {
        navigate("/resultSearch")
      }
    })
    .catch((error)=>{
      alert("Ошибка!!!" + " " + `${error}`);
    });
  };
  
    return (
      <div className={`${global.wrapper} ${search.container}`}>
        <div className={search.title}>
          <h1>
            Найдите необходимые <br />
            данные в пару кликов.
          </h1>
          <p>
            Задайте параметры поиска. <br />
            Чем больше заполните, тем точнее поиск
          </p>
          <img
            className={search.doc_img}
            src="./assets/Search-document-image.svg"
            alt=""
          />
          <img
            className={search.folder_img}
            src="./assets/Search-folders-image.svg"
            alt=""
          />
        </div>
        <div className={search.content}>
          <Formik
            initialValues={{
              inn: "",
              tonality: "any",
              limit: "",
              startDate: "",
              endDate: "",
              maxFullness: false,
              inBusinessNews: false,
              onlyMainRole: false,
              onlyWithRiskFactors: false,
              excludeTechNews: false,
              excludeAnnouncements: false,
              excludeDigests: false,
            }}
            onSubmit={onSubmit}
          >
              <Form className={search.form} >
                <div className={search.form_leftside}>
                  <label htmlFor="">ИНН компании *</label>
                  <Field
                    name="inn"
                    type="number"
                    placeholder="10 цифр"
                    validate={checkInn}
                  />
                  <ErrorMessage component="span" name="inn" />
                  <label htmlFor="">Тональность</label>
                  <Field name="tonality" as="select">
                    <option value="any">любая</option>
                    <option value="positive">позитивная</option>
                    <option value="negative">негативная</option>
                  </Field>
                  <label htmlFor="">Количество документов в выдаче *</label>
                  <Field
                    name="limit"
                    type="number"
                    placeholder="От 1 до 1000"
                    validate={checkLimit}
                  />
                  <ErrorMessage component="span" name="limit" />
                  <label htmlFor="">
                    Диапазон поиска * <br /> ( дата начала - дата конца )
                  </label>
                  <div className={search.form_dateInterval}>
                    <Field
                      name="startDate"
                      type="date"
                      className={search.form_startDate}
                      validate={checkStartDate}
                    />
                    <ErrorMessage
                      className={search.form_startDate_error}
                      component="span"
                      name="startDate"
                    />
                    <Field
                      name="endDate"
                      type="date"
                      className={search.form_endDate}
                      validate={checkEndDate}
                    />
                    <ErrorMessage
                      className={search.form_endDate_error}
                      component="span"
                      name="endDate"
                    />
                  </div>
                </div>
                <div className={search.form_rightside}>
                  <label className={search.check}>
                    <Field
                      className={search.check_input}
                      type="checkbox"
                      name="maxFullness"
                    />
                    Признак максимальной полноты
                    <span className={search.check_box}></span>
                  </label>
                  <label className={search.check}>
                    <Field
                      className={search.check_input}
                      type="checkbox"
                      name="inBusinessNews"
                    />
                    Упоминания в бизнес-контексте
                    <span className={search.check_box}></span>
                  </label>
                  <label className={search.check}>
                    <Field
                      className={search.check_input}
                      type="checkbox"
                      name="onlyMainRole"
                    />
                    Главная роль в публикации
                    <span className={search.check_box}></span>
                  </label>
                  <label className={search.check}>
                    <Field
                      className={search.check_input}
                      type="checkbox"
                      name="onlyWithRiskFactors"
                    />
                    Публикации только с риск-факторами
                    <span className={search.check_box}></span>
                  </label>
                  <label className={search.check}>
                    <Field
                      className={search.check_input}
                      type="checkbox"
                      name="excludeTechNews"
                    />
                    Включать технические новости рынков
                    <span className={search.check_box}></span>
                  </label>
                  <label className={search.check}>
                    <Field
                      className={search.check_input}
                      type="checkbox"
                      name="excludeAnnouncements"
                    />
                    Включать анонсы и календари
                    <span className={search.check_box}></span>
                  </label>
                  <label className={search.check}>
                    <Field
                      className={search.check_input}
                      type="checkbox"
                      name="excludeDigests"
                    />
                    Включать сводки новостей
                    <span className={search.check_box}></span>
                  </label>
                  <div className={search.form_button}>
                    <button type="submit" disabled={state.search.formSubmitClicked}>Поиск</button>
                    <p>* Обязательные к заполнению поля</p>
                  </div>
                </div>
              </Form>
          </Formik>
          <div className={search.content_image}>
            <img src="./assets/Search-rocket-image.svg" alt="" />
          </div>
        </div>
      </div>
    );
}

export default Search;
