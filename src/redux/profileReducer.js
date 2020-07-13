import {ProfileAPI} from "../api/api";

const  UPDATE_PHOTO = "UPDATE_PROFILE_PHOTO";

let initialState = {
    data: [
        {id: 1, messages: "hi you!", likesCount: 12},
        {id: 2, messages: "how are you", likesCount: 42},
        {id: 3, messages: "hello", likesCount: 24},
        {id: 4, messages: "very cool!", likesCount: 1},
        {id: 5, messages: "shysh", likesCount: 23}
    ],
    profile: null,
    status: ""
};


let profileReducer = (state = initialState,action) => {
    switch (action.type) {
        case "ADD-POST":
        {
 
            return { ...state, data: [...state.data,
                    { id: 6,
                    messages: action.newpost,
                    likesCount: 0}
                    ]};
            break
        }
        case "SET_PROFILE_STATUS":{
            return {...state, status: action.status};
            break
        }
        case "GET_PROFILE":{
            return {...state, profile: action.profile};
            break
        }
        case UPDATE_PHOTO:{
            return {...state, profile: {...state.profile, photos: {small: action.photo, large: action.photo}} };
            break
        }
        case "DELETE_POST":{
            return {...state, data: state.data.filter(post => post.id !== action.id)};
            break
        }

        default: return state;
    }
}


export const addPostActionCreator = (newpost) => ({type: "ADD-POST", newpost});
export const getProfile = (profile) => ({type: "GET_PROFILE", profile});
export const setProfileStatus = (status) => ({type: "SET_PROFILE_STATUS", status});
export const deletePost = (id) => ({type: "DELETE_POST", id});
export const updateProfilePhoto = (photo) => ({type: UPDATE_PHOTO, photo});

export const getProfileThunk = (userId) => {
    return (dispatch) => {
        ProfileAPI.getProfile(userId).then(data => {
            dispatch(getProfile(data));
        })
    }
};

export const uploadProfilePhotoThunk = (photo) => {
    return (dispatch) => {
        ProfileAPI.uploadPhoto(photo).then(data => {
        if(data.resultCode === 0) {
            dispatch(updateProfilePhoto(data.data.photos.large));
        }
       })
    }
};


export const getProfileStatus = (userId) => {
    return (dispatch) => {
        ProfileAPI.getProfileStatus(userId).then(data => {
            dispatch(setProfileStatus(data));
        })
    }
};

export const updateProfileStatus = (status) => {
    return (dispatch) => {
        ProfileAPI.updateProfileStatus(status).then(data => {
            if(!data.resultCode) {
                dispatch(setProfileStatus(status));
            }else {
                return false;
            }

        })
    }
};


export default profileReducer;