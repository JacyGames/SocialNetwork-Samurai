import React from "react";
import './loaderSyle.css'


const Loader = () => {
    return <div className="loader_container">
        <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
}

export default Loader;