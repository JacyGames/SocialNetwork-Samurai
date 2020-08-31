import {ProfileAPI, ResultCodeMessage} from "../api/api";
import {stopSubmit} from "redux-form";
import {reset} from "redux-form";
import {
    UPDATE_PHOTO,
    SET_EDIT_MODE,
    SET_FETCHING,
    SET_IS_STATUS_UPDATING,
    GET_PROFILE,
    DELETE_POST,
    SET_PROFILE_STATUS,
    ADD_POST
} from "./constants"
import {ThunkAction} from "redux-thunk";
import {StateType, TypesFromObj} from "./reduxStore";


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

type MainActionType = TypesFromObj<typeof ProfileActions>

let profileReducer = (state = initialState, action: MainActionType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {

            return {
                ...state, data: [...state.data,
                    {
                        id: 6,
                        messages: action.newPost,
                        likesCount: 0
                    }
                ]
            };
        }
        case SET_PROFILE_STATUS: {
            return {...state, status: action.status};
        }
        case GET_PROFILE: {
            return {...state, profile: action.profile};
        }
        case UPDATE_PHOTO: {
            return {
                ...state,
                profile: {...state.profile, photos: {small: action.photo, large: action.photo}} as ProfileType
            };
        }
        case SET_EDIT_MODE: {
            return {...state, editMode: action.editMode};
        }
        case SET_FETCHING: {
            return {...state, isFetchingProfile: action.isFetching};
        }
        case SET_IS_STATUS_UPDATING: {
            return {...state, updatingStatus: action.isUpdating};
        }
        case DELETE_POST: {
            return {...state, data: state.data.filter(post => post.id !== action.id)};
        }

        default:
            return state;
    }
}

export const ProfileActions = {
    addPostActionCreator: (newPost: string) => ({type: ADD_POST, newPost} as const),
    getProfile: (profile: ProfileType) => ({type: GET_PROFILE, profile} as const),
    setProfileStatus: (status: string) => ({type: SET_PROFILE_STATUS, status} as const),
    deletePost: (id: number) => ({type: DELETE_POST, id} as const),
    updateProfilePhoto: (photo: any) => ({type: UPDATE_PHOTO, photo} as const),
    setEditMode: (editMode: boolean) => ({type: SET_EDIT_MODE, editMode} as const),
    setIsFetching: (isFetching: boolean) => ({type: SET_FETCHING, isFetching} as const),
    setIsStatusUpdating: (isUpdating: boolean) => ({type: SET_IS_STATUS_UPDATING,isUpdating} as const)
}
export const addPostForEnv = ProfileActions.addPostActionCreator;


type ThunkActionType = ThunkAction<void, StateType, unknown, MainActionType>;


export const getProfileThunk = (userId: number | null): ThunkActionType => {
    return (dispatch) => {
        ProfileAPI.getProfile(userId).then((data: any) => {
            dispatch(ProfileActions.getProfile(data));
            dispatch(ProfileActions.setIsFetching(false));
        })
    }
};

export const uploadProfilePhotoThunk = (photo: any): ThunkActionType => {
    return (dispatch) => {
        ProfileAPI.uploadPhoto(photo).then((data: any) => {
            if (data.resultCode === 0) {
                dispatch(ProfileActions.updateProfilePhoto(data.data.photos.large));
            }
        })
    }
};


export const getProfileStatus = (userId: number): ThunkActionType => {
    return (dispatch) => {
        ProfileAPI.getProfileStatus(userId).then((data) => {
            dispatch(ProfileActions.setProfileStatus(data));

        })
    }
};

export const updateProfileStatus = (status: string): ThunkActionType => {
    return (dispatch) => {
        dispatch(ProfileActions.setIsStatusUpdating(true));
        ProfileAPI.updateProfileStatus(status).then((data) => {
            if (!data.resultCode) {
                dispatch(ProfileActions.setProfileStatus(status));
                dispatch(ProfileActions.setIsStatusUpdating(false));
            } else {
                dispatch(ProfileActions.setIsStatusUpdating(false));
                return false;
            }

        })
    }
};

export const updateProfileInfo = (info: ProfileType): ThunkActionType => {
    return async (dispatch: any, getState) => {
        const userId = getState().auth.id;
        dispatch(ProfileActions.setIsFetching(true));

        let response = await ProfileAPI.updateInfo(info);
        if (response.resultCode === ResultCodeMessage.Success) {
            dispatch(ProfileActions.setIsFetching(false));
            dispatch(ProfileActions.setEditMode(false));
            dispatch(getProfileThunk(userId));

        } else {
            dispatch(ProfileActions.setIsFetching(false));
            dispatch(stopSubmit("profileInfoForm", {_error: response.messages[0]}));
        }


    }
};
export const clearFrom = (): ThunkActionType => {
    return (dispatch: any) => {
        dispatch(reset('newpostForm'));
    }
};

export default profileReducer;
