import React from 'react';
import classes from "../../Users/userStyle.module.css";

type PropsType = {
    totalCount: number
    itemsOnPage: number
    currentPage: number
    pageChanged: (page: number) => void
    portionLength: number

}

export const PaginatorSmall: React.FC<PropsType> = ({
                                                   totalCount,
                                                   itemsOnPage,
                                                   currentPage,
                                                   pageChanged,
                                                   portionLength
                                               }) => {

   let pagesCount = Math.ceil(totalCount / itemsOnPage);


    return <div className={classes.paginatorSmall}>

         <button className={classes.btnPortions} onClick={() => {
             if(currentPage === 1){
                 return;
             }
             pageChanged(currentPage - 1)
        }}> Previous </button>

             <button className={classes.btnPortions} onClick={() => {
                 if(currentPage === pagesCount){
                     return;
                 }
                 pageChanged(currentPage + 1)
            }}>Next</button>


    </div>
}
