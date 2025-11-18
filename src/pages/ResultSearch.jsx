import { React,  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getSearchObjectsAsync } from "../redux/slices/search/search.actions";
import { actions } from "../redux/slices/user/user.slice";
import { unwrapResult } from "@reduxjs/toolkit";

import DocumentsList from "../components/Documents_list";
import SliderResultPage from "../components/Swiper_searchResult"

import global from "../styles/globalStyles.module.scss";
import resSearch from "../styles/pages/resultSearch.module.scss";



function ResultSearchPage() {
  
  const dispatch = useDispatch();

  dispatch(actions.checkToken());

  const hystogramData = JSON.parse(localStorage.getItem('hystogramData'));
  const formData = JSON.parse(localStorage.getItem('formData'));
  
  const state = useSelector((state) => state);

  const navigate = useNavigate();
 
  
  useEffect(()=>{

    if (!state.userLogIn.userIsOnline){
      return navigate ("/autorization");
    }
    
    dispatch(getSearchObjectsAsync(formData))
      .then(unwrapResult)
      .then((result)=>{
        if(result.errorCode && result.message){
          alert("Ошибка!!!" + " " + `${result.message}`);        
        }
      })
      .catch((error)=>{
        alert("Ошибка!!!" + " " + `${error}`);
      });

  },[dispatch, state.userLogIn.userIsOnline]);

  

  
  return (
    <div className={`${global.wrapper}`}>
      <div className={`${resSearch.title}`}>
        <div className={`${resSearch.title_text}`}>
          <h1>Ищем. Скоро<br/> будут результаты</h1>
          <p>
            Поиск может занять некоторое время, <br /> просим сохранять
            терпение.
          </p>
        </div>
        <div className={`${resSearch.title_image}`}>
          <img
            src="../assets/images/ResultSearch-title-image.svg"
            alt="search image"
          />
        </div>
      </div>
      <div className={`${resSearch.generalSummory}`}>
        <div className={`${resSearch.generalSummory_title}`}>
          <h3>Общая сводка</h3>
          {hystogramData.length !== 0? <p>Найдено {hystogramData[0].data[0].value} вариантов</p> : <p>Не найдено вариантов</p>}
        </div>
        <div className={`${resSearch.generalSummory_table}`}>
          <div className={`${resSearch.generalSummory_table_header}`}>
            <p>Период</p>
            <p>Всего</p>
            <p>Риски</p>
          </div>
          {state.search.isLoading
            ?  
              <div className={resSearch.spin_wrapper}>
                <img className={resSearch.logo_spin} src="../assets/icons/download-icon.svg"alt="loading..."/>
                <span className={resSearch.logo_spin_text}>Загружаем данные </span>
              </div>
            : hystogramData.length !== 0 ? hystogramData[0].data[0].date ? (<SliderResultPage props={hystogramData}/>) 
               : <span className={resSearch.logo_spin_text}>Статей не найдено</span> 
               : <span className={resSearch.logo_spin_text}>Статей не найдено</span>
           }
          
        </div>
      </div>
      <div className={`${resSearch.documentslist}`}>
          <DocumentsList/>
      </div>
    </div>
  );
}

export default ResultSearchPage;
