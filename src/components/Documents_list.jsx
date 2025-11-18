import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import parse  from 'html-react-parser';

import { getDocumentsSearchAsync } from '../redux/slices/search/search.actions';

import resSearch from "../styles/pages/resultSearch.module.scss";


function DocumentsList() {

  const dispatch = useDispatch();

  const {userSearchObjects} = useSelector((state) => state.search);
   
// Компоновка id в массив для отправки запроса карточек
  let paramsSearch = [];
  
//   Константа количества публикаций на странице
  const itemsOnPage = 10;

//  Весь массив с документами 
  const [fullDocumentsArray, setfullDocumentsArray] = useState([]);

//   Текущий (последний) отображаемый документ
  const [currentDocument] = useState(0);

//   Кол-во документов отображаемое за раз
  const [documentsPerPage, setdocumentsPerPage] = useState(itemsOnPage);


  useEffect(()=>{
    // Компоновка
    if(userSearchObjects.length !== 0){
    
        for(let i=0; i<userSearchObjects.length;i++){
            paramsSearch.push(userSearchObjects[i].encodedId);
        }

        dispatch(getDocumentsSearchAsync(paramsSearch))
        .then(unwrapResult)
        .then((result)=>{
            if(result.errorCode && result.message){
                alert("Ошибка!!!" + " " + `${result.message}`); 
            } 
            else {
                setfullDocumentsArray(result)

            }        
        })
        .catch((error)=>{
            alert("Ошибка!!!" + " " + `${error}`);
        });         
    }else return
    
  },[userSearchObjects] )

//  Попытка избавиться от xml-тегов
  const removeHtmlTags = (string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(string, 'text/html');
    return doc.body.textContent || '';
  }


    // сортировка полного массива данных по дате
    fullDocumentsArray.sort((a,b) => {
        return new Date(a.ok.issueDate).getTime() - new Date(b.ok.issueDate).getTime()
    })

    // Индексы страницы
    const lastDocumentIndex = currentDocument + documentsPerPage;
    const firstDocumentIndex = lastDocumentIndex - documentsPerPage;

    // текущие страницы для отрисовки
    const currentRenderDocument = fullDocumentsArray.slice(firstDocumentIndex, lastDocumentIndex)

    
    return (
        <>
            <h3>Список документов </h3>
            <span> Выведено ( {fullDocumentsArray.length} шт )</span> 

            {currentRenderDocument.length!== 0 ? 
            <>
                <div className={`${resSearch.documentslist_container}`}>
                    {currentRenderDocument.map((item,index)=>
                        <div className={`${resSearch.documentslist_item}`} key={index}>
                            <div className={`${resSearch.documentslist_item_header}`}>
                                <div className={`${resSearch.documentslist_item_link}`}>
                                    <p>{new Date(item.ok.issueDate).toLocaleDateString()}</p>
                                    <a href={item.ok.url}>{item.ok.source.name}</a>
                                </div>
                                <h4>{item.ok.title.text}</h4>
                                <p>{ item.ok.attributes.isTechNews?"Технические новости":item.ok.attributes.isDigest?"Сводки новостей":item.ok.attributes.isAnnouncement ?"Календарь событий": "Новости без темы"}</p>
                            </div>
                            <div className={`${resSearch.documentslist_item_content}`}>
                                <img src="./assets/images/ResultSearch_doc_image.png" alt="" />
                                <p>{removeHtmlTags(item.ok.content.markup)}</p>
                            </div>
                            <div className={`${resSearch.documentslist_item_button}`}>
                                <a href={item.ok.url} target="_blank">Читать в источнике</a>
                                <span>{item.ok.attributes.wordCount} слов(-а)</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className={`${resSearch.showMore}`}>
                    <button style ={documentsPerPage > fullDocumentsArray.length ? {display:"none"} : {display:""}} onClick={()=>{
                        if (documentsPerPage <= fullDocumentsArray.length){
                            setdocumentsPerPage(documentsPerPage + itemsOnPage);
                        }
                    }}>Показать больше</button>
                </div>
            </>: " "
            }
        </>
        )
        
}

export default DocumentsList;

