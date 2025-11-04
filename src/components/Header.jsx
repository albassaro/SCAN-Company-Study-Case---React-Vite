import { React, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useMediaQuery } from 'react-responsive';

import { useSelector } from "react-redux";
import { actions } from "../redux/slices/user/user.slice";
import { useDispatch } from "react-redux";
import { getUserInfoAsync } from "../redux/slices/user/user.actions";
import { unwrapResult } from "@reduxjs/toolkit";

import h from "../styles/components/header.module.scss";
import global from "../styles/globalStyles.module.scss";

function Header() {

  const isMobile = useMediaQuery({
    query: '(max-width: 375px)'
  })

  const navigate = useNavigate();

  const dispatch = useDispatch();
  // Состояния, взятые из redux state
  const { userIsOnline, isLoading, userInfo } = useSelector((state) => state.userLogIn);

  useEffect(() => {
    // Метод проверки токена
    dispatch(actions.checkToken());
    if (userIsOnline) {
      // Выполнение запроса на получение информации о пользователе
      dispatch(getUserInfoAsync())
        .then(unwrapResult)
        .then((data) => {
          if (data.errorCode && data.message) {
            alert("Ошибка!!!" + " " + `${data.message}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch, userIsOnline]);

  const [burgerClick, setBurgerCllick] = useState(false);
  
  // Отрисовка разных компонентов в зависимости от того, вошел ли польз-ль
  return (
    <header className={h.header}>
      <div className={`${global.wrapper} ${h.header_content}`}>
        <div className={h.logo}>
          <img className={h.logo_pc} style={burgerClick?{display: 'none'}:{}} src="./assets/logo/logo-header.png" alt="SCAN-logo" />
          <img className={h.logo_mobile}style={burgerClick?{}:{display: 'none'}} src="./assets/logo/logo-header-mobile.svg" alt="SCAN-logo" />
        </div>
        <div className={h.navigation} style={burgerClick?{left: '0%'}:{}}>
          <NavLink to="/" onClick={()=>setBurgerCllick(false)}>Главная</NavLink>
          <a>Тарифы</a>
          <a>FAQ</a>
        </div>
        {userIsOnline
          ?(
          <div className={h.ui_menu}>
            <div className={h.searchlimit}>
              {userInfo?.eventFiltersInfo 
              ? (
                <>
                  {isMobile?
                  <>
                    <p> Использовано компаний <br />
                      <span>{userInfo.eventFiltersInfo.usedCompanyCount}</span>
                    </p>
                    <p>
                      Лимит по компаниям <br />
                      <span className={h.searchlimit_green}>{userInfo.eventFiltersInfo.companyLimit}</span>
                    </p>
                  </>
                  :<>
                    <p> Использовано компаний
                      <span>{userInfo.eventFiltersInfo.usedCompanyCount}</span>
                    </p>
                    <p> Лимит по компаниям
                      <span className={h.searchlimit_green}>{userInfo.eventFiltersInfo.companyLimit}</span>
                    </p>
                  </>
                  }
                </>
              ) 
              : isLoading ? (
                <img className={h.logo_spin}
                  src="../assets/icons/download-icon.svg"
                  alt="loading..."/>
                )   
              : (
                <p>Ошибка...</p>
              )}
            </div>
            <div className={burgerClick?`${h.user_menu_burger} ${h.user_menu_burger_active}`:h.user_menu_burger}  onClick={()=>{
                burgerClick ? setBurgerCllick(false):setBurgerCllick(true);
              }}>
                <span></span>
            </div>
            <div className={h.user_menu_background} style={burgerClick?{left: '0%'}:{}}></div>
            <div className={h.user_menu} style={burgerClick ? {transform: 'scale(1) translate(38px, 0%)'} : {}}>
                 <button className={h.user_menu_logout_mobile}  
                  onClick={() => {dispatch(actions.logOut()); navigate("/");}}>
                  Выйти
                </button>
              <div className={h.user_info}>
                <p>Алексей А.</p>
                  <button onClick={() => {dispatch(actions.logOut()); navigate("/")}}>
                    Выйти
                  </button>
              </div>
              <div className={h.user_logo}>
                <img src="../assets/icons/user-icon.jpg" alt="" />
              </div>
            </div>
          </div>
          )
          :(
            <>
              <div className={burgerClick?`${h.user_menu_burger} ${h.user_menu_burger_active}`:h.user_menu_burger}  onClick={()=>{
                burgerClick ? setBurgerCllick(false):setBurgerCllick(true);
              }}>
                <span></span>
              </div>
              <div className={h.user_menu_background} style={burgerClick?{left: '0%'}:{}}></div>
              <div className={h.log_in} style={burgerClick 
                ? {left: '0%', display: 'flex'} : {}}>
                <a className={h.log_in_auth}>Зарегистрироваться</a>
                <button className={h.log_in_button} onClick={()=>{setBurgerCllick(false); navigate("/autorization")}}>Войти</button>
              </div>
            </>
          )
        }
      </div>
    </header>
  );
}

export default Header;
