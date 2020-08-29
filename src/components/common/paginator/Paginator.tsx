import React, {useState} from 'react';
import classes from "../../Users/userStyle.module.css";

type PropsType = {
    totalCount: number
    itemsOnPage: number
    currentPage: number
    pageChanged: (page: number) => void
    portionLength: number

}

export const Paginator: React.FC<PropsType> = ({
                                                   totalCount,
                                                   itemsOnPage,
                                                   currentPage,
                                                   pageChanged,
                                                   portionLength
                                               }) => {
    let pages = [],
        pagesCount = Math.ceil(totalCount / itemsOnPage);
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portions = Math.ceil(pagesCount / portionLength),
        [currentPortion, setCurrentPortion] = useState(1),
        leftEdge = (currentPortion - 1) * portionLength + 1,
        rightEdge = portionLength * currentPortion;
    let key = 0;


    return <div className={classes.hoverment}>

        {currentPortion > 1 && <button className={classes.btnPortions} onClick={() => {
            setCurrentPortion(currentPortion - 1)
        }}> Previous </button>}
        {
            pages.filter(page => page >= leftEdge && page <= rightEdge).map(p => {
                return <span key={key++}
                             className={currentPage === p && classes.selected + " " + classes.pages || classes.pages}
                             onClick={() => {
                                 pageChanged(p);
                             }}>{p}</span>
            })
        }
        {
            currentPortion < portions && <button className={classes.btnPortions} onClick={() => {
                setCurrentPortion(currentPortion + 1)
            }}>Next</button>
        }

    </div>
}
