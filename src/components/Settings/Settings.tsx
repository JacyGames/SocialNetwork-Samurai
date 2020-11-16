import React from "react";

const Settings = () => {
    return <div>
        <h1>Change theme</h1>
        <div><input type="radio" name="drone" id="black"/> <label htmlFor="black">Black</label> </div>
        <div><input type="radio" name="drone" id="white"/> <label htmlFor="white">White</label></div>
        <div><input type="radio" name="drone" id="old"/> <label htmlFor="old">Back to old design</label></div>

    </div>
}

export default Settings;
