import {ProfileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {reset} from "redux-form";
import {UPDATE_PHOTO,
    SET_EDIT_MODE,
    SET_FETCHING,
    SET_IS_STATUS_UPDATING,
    GET_PROFILE,
    DELETE_POST,
    SET_PROFILE_STATUS,
    ADD_POST} from "./constants"


type DataType = {
    id: number
    messages: string
    likesCount: number
}
export type ContactsType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}
type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    aboutMe: string,
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    userId: number
    photos: PhotosType
}

type InitialStateType = {
    data: Array<DataType>
    profile: null | ProfileType
    status: string | null
    editMode: boolean
    isFetchingProfile: boolean
    updatingStatus: boolean
}


let initialState: InitialStateType = {
    data: [
        {id: 1, messages: "hi you!", likesCount: 12},
        {id: 2, messages: "how are you", likesCount: 42},
        {id: 3, messages: "hello", likesCount: 24},
        {id: 4, messages: "very cool!", likesCount: 1},
        {id: 5, messages: "shysh", likesCount: 23}
    ],
    profile: null,
    status: "",
    editMode: false,
    isFetchingProfile: false,
    updatingStatus: false
};


let profileReducer = (state = initialState,action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
        {
 
            return { ...state, data: [...state.data,
                    { id: 6,
                    messages: action.newPost,
                    likesCount: 0}
                    ]};
        }
        case SET_PROFILE_STATUS:{
            return {...state, status: action.status};
        }
        case GET_PROFILE:{
            return {...state, profile: action.profile};
        }
        case UPDATE_PHOTO:{
            return {...state, profile: {...state.profile, photos: {small: action.photo, large: action.photo}} as ProfileType };
        }
        case SET_EDIT_MODE:{
            return {...state, editMode: action.editMode };
        }
        case SET_FETCHING:{
            return {...state, isFetchingProfile: action.isFetching };
        }
        case SET_IS_STATUS_UPDATING:{
            return {...state, updatingStatus: action.isUpdating };
        }
        case DELETE_POST:{
            return {...state, data: state.data.filter(post => post.id !== action.id)};
        }

        default: return state;
    }
}

type AddPostAction = {
    type: typeof ADD_POST
    newPost: string
}
export const addPostActionCreator = (newPost: string): AddPostAction => ({type: ADD_POST, newPost});

type GetProfileAction = {
    type: typeof GET_PROFILE
    profile: ProfileType
}
export const getProfile = (profile: ProfileType): GetProfileAction => ({type: GET_PROFILE, profile});

type SetProfileAction = {
    type: typeof SET_PROFILE_STATUS
    status: string
}
export const setProfileStatus = (status: string): SetProfileAction => ({type: SET_PROFILE_STATUS, status});

type DeletePostAction = {
    type: typeof DELETE_POST
    id: number
}
export const deletePost = (id: number): DeletePostAction => ({type: DELETE_POST, id});

type UpdateProfilePhotoAction = {
    type: typeof UPDATE_PHOTO
    photo: any
}
export const updateProfilePhoto = (photo: any): UpdateProfilePhotoAction => ({type: UPDATE_PHOTO, photo});

type SetEditModeAction = {
    type: typeof SET_EDIT_MODE
    editMode: boolean
}
export const setEditMode = (editMode: boolean): SetEditModeAction => ({type: SET_EDIT_MODE, editMode});

type SetIsFetchingAction = {
    type: typeof SET_FETCHING
    isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingAction => ({type: SET_FETCHING, isFetching});

type SetIsStatusUpdatingAction = {
    type: typeof SET_IS_STATUS_UPDATING
    isUpdating: boolean
}
export const setIsStatusUpdating = (isUpdating: boolean):SetIsStatusUpdatingAction => ({type: SET_IS_STATUS_UPDATING, isUpdating});

export const getProfileThunk = (userId: number) => {
    return (dispatch: any) => {
        ProfileAPI.getProfile(userId).then((data: any) => {
            dispatch(getProfile(data));
            dispatch(setIsFetching(false));
        })
    }
};

export const uploadProfilePhotoThunk = (photo: any) => {
    return (dispatch: any) => {
        ProfileAPI.uploadPhoto(photo).then((data: any) => {
        if(data.resultCode === 0) {
            dispatch(updateProfilePhoto(data.data.photos.large));
        }
       })
    }
};


export const getProfileStatus = (userId: number) => {
    return (dispatch: any) => {
        ProfileAPI.getProfileStatus(userId).then((data: any) => {
            dispatch(setProfileStatus(data));

        })
    }
};

export const updateProfileStatus = (status: string) => {
    return (dispatch: any) => {
        dispatch(setIsStatusUpdating(true));
        ProfileAPI.updateProfileStatus(status).then((data: any) => {
            if(!data.resultCode) {
                dispatch(setProfileStatus(status));
                dispatch(setIsStatusUpdating(false));
            }else {
                dispatch(setIsStatusUpdating(false));
                return false;
            }

        })
    }
};

export const updateProfileInfo = (info: ProfileType) => {
    return async (dispatch: any, getState: any) => {
        const userId = getState().auth.id;
        dispatch(setIsFetching(true));

        let response = await ProfileAPI.updateInfo(info);
            if(response.resultCode === 0) {
                dispatch(setIsFetching(false));
                dispatch(setEditMode(false));
                dispatch(getProfileThunk(userId));

            }else {
                dispatch(setIsFetching(false));
                dispatch(stopSubmit( "profileInfoForm", {_error: response.messages[0]} ));
            }


    }
};
export const clearFrom = () => {
    return (dispatch: any) => {
        dispatch(reset('newpostForm'));
    }
};

export default profileReducer;
