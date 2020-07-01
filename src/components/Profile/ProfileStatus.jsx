import React from "react";

class ProfileStatus extends React.Component{

    state = {
        editMode: false,
        status: this.props.status
    }

    statusChange = (e) => {

        this.setState({
            status: e.target.value
        });
    }

    activateEdit() {
        this.setState({
            editMode: true
        });
    }
    deactivateEdit() {
        this.setState({
            editMode: false
        });
        this.props.updateProfileStatus(this.state.status);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {
        return <div>
            {this.state.editMode ? <div><input onChange={this.statusChange} autoFocus={true} onBlur={this.deactivateEdit.bind(this)} value={this.state.status}/></div> : <div onDoubleClick={this.activateEdit.bind(this)}>{this.props.status || "-----"}</div>
            }
        </div>


    }


}



export default ProfileStatus;