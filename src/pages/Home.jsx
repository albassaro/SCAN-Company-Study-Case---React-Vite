import React from "react";

import SliderHomePage from "../components/Swiper_home";
import { useNavigate} from "react-router";
import { useSelector } from "react-redux";

import global from "../styles/globalStyles.module.scss";
import home from "../styles/pages/home.module.scss";




function Home() {

  const {userIsOnline} = useSelector(state => state.userLogIn);
  const navigate = useNavigate();

  return (
    <div className={`${global.wrapper}`}>
      <div className={home.searchservice}>
        <div className={home.searchservice_info}>
          <h1>сервис по поиску публикаций<br /> о компании<br /> по его ИНН</h1>
          <p>
            Комплексный анализ публикаций, получение данных в формате PDF на
            электронную почту.
          </p> 
          <button onClick={()=> navigate(userIsOnline ? "/search": "/autorization")} className={home.request_button}>Запросить данные</button>
        </div>
        <div className={home.searchservice_image}>
          <img src="./assets/images/Home-firstImage.png" alt="search image" />
        </div>
      </div>

      <div className={home.why_we}>
        <h2>Почему именно мы</h2>
        <SliderHomePage />
      </div>
      

      <div className={home.secondimage}>
        <img src="./assets/images/Home-secondImage.svg" alt="person-img" />
      </div>

      <div className={home.tarifs}>
        <h2>наши тарифы</h2>
        <div className={home.tarifs_cards}>
          <div className={
            userIsOnline
            ? `${home.tarifs_item}  ${home.tarifs_item_yellow}`
            : home.tarifs_item }>
              
            <div className={home.tarifs_header}>
              <div className={home.header_text}>
                <h3>Beginner</h3>
                <p>Для небольшого исследования</p>
              </div>
              <div className={home.header_img}>
                <img src="./assets/icons/Tariffs-bulb-icon.svg" alt="bulb-img" />
              </div>
            </div>
            <div className={home.tarifs_info}>
              {userIsOnline
                ? <div className={home.tarifs_current}>
                    <p>Текущий тариф</p>
                  </div>
                : "" }
              <div className={home.tarifs_price}>
                <h3>799 ₽ <span>1 200 ₽</span></h3>
                <p>или 150 ₽/мес. при рассрочке на 24 мес.</p>
              </div>
              <div className={home.tarifs_conditions}>
                  <li>В тариф входит:</li>
                  <li>Безлимитная история запросов</li>
                  <li>Безопасная сделка</li>
                  <li>Поддержка 24/7</li>
              </div>
              <div className={userIsOnline ? home.tarifs_button: `${home.tarifs_button} ${home.tarifs_button__blue}`}>
                <button>{userIsOnline ?'Перейти в личный кабинет':'Подробнее'}</button>
              </div>
            </div>
          </div>
          <div className={home.tarifs_item}>
            <div className={`${home.tarifs_header} ${home.tarifs_header_grey}`}>
              <div className={home.header_text}>
                <h3>Pro</h3>
                <p>Для HR и фрилансеров</p>
              </div>
              <div className={home.header_img}>
                <img src="./assets/icons/Tariffs-target-icon.svg" alt="target-img" />
              </div>
            </div>
            <div className={home.tarifs_info}>
              <div className={`${home.tarifs_price} ${home.tarifs_price__margin}`}>
                <h3>1 299 ₽ <span>2 600 ₽</span></h3>
                <p>или 279 ₽/мес. при рассрочке на 24 мес.</p>
              </div>
              <div className={home.tarifs_conditions}>
                <li>В тариф входит:</li>
                <li>Все пункты тарифа Beginner</li>
                <li>Экспорт истории</li>
                <li>Рекомендации по приоритетам</li>
              </div>
              <div className={`${home.tarifs_button} ${home.tarifs_button__blue}`}>
                <button>Подробнее</button>
              </div>
            </div>
          </div>
          <div className={home.tarifs_item}>
            <div className={`${home.tarifs_header} ${home.tarifs_header__black}`}>
              <div className={home.header_text}>
                <h3>Business</h3>
                <p>Для корпоративных клиентов</p>
              </div>
              <div className={home.header_img}>
                <img src="./assets/icons/Tariffs-notebook-icon.svg" alt="notebook-img" />
              </div>
            </div>
            <div className={home.tarifs_info}>
              <div className={`${home.tarifs_price} ${home.tarifs_price__margin}`}>
                <h3>2 379 ₽ <span>3 700 ₽</span></h3>
              </div>
              <div className={home.tarifs_conditions}>
                <li>В тариф входит:</li>
                <li>Все пункты тарифа Pro</li>
                <li>Безлимитное количество запросов</li>
                <li>Приоритетная поддержка</li>
              </div>
              <div className={`${home.tarifs_button} ${home.tarifs_button__blue}`}>
                <button>Подробнее</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
