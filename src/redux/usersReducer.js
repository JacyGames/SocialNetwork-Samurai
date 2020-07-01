import {DataAPI} from "../api/api";

let initialState = {
    users: [],
    totalCount: 0,
    itemsOnPage: 5,
    currentPage: 1,
    isFetching: true,
    isFollowing: []
};

let userReducer = (state = initialState, action) => {
    switch (action.type){
        case "FOLLOW": {
            return {
                ...state,
                users: state.users.map( u =>{
                    if(u.id === action.id){
                        return {...u, followed: true};
                    }
                    return u ;
                } )
            };
        }
        case "UNFOLLOW": {
            return {
                ...state,
                users: state.users.map( u =>{
                    if(u.id === action.id){
                        return {...u, followed: false};
                    }
                    return u ;
                } )
            };
        }
        case "SET_USERS": {
            return {
                ...state, users: [ ...action.user]
            }
        }
        case "SET_TOTAL_COUNT": {
            return {
                ...state, totalCount: action.count
            }
        }
        case "SET_CURRENT_PAGE": {
            return {
                ...state, currentPage: action.count
            }
        }
        case "SET_FETHING": {
            return {
                ...state, isFetching: action.fetch
            }
        }
        case "SET_ISFOLLOWING": {
            return {
                ...state, isFollowing: action.fetch ? [ ...state.isFollowing, action.userID ] : state.isFollowing.filter(id => id != action.userID)
            }
        }

        default: return state;
    }


}

export const follow = (id) => ({type:"FOLLOW", id: id});
export const unfollow = (id) => ({type: "UNFOLLOW",  id: id});
export const setuser = (user) => ({type: "SET_USERS",  user});
export const setTotal = (count) => ({type: "SET_TOTAL_COUNT",  count});
export const curentPage = (count) => ({type: "SET_CURRENT_PAGE",  count});
export const setFetching = (fetch) => ({type: "SET_FETHING",  fetch});
export const setIsFollowing = (fetch,userID) => ({type: "SET_ISFOLLOWING",  fetch,userID});
export default userReducer;

export const getUsersThunk = (currentPage, itemsOnPage) => {
    return (dispatch) => {
        dispatch(setFetching(true));
        DataAPI.getUsers(currentPage,itemsOnPage).then(data => {
            dispatch(setFetching(false));
            dispatch(setuser(data.items));
            dispatch(setTotal(data.totalCount));
        })
    }
}
export const getUsersAnotherPageThunk = (currentPage, itemsOnPage,pageNumber) => {
    return (dispatch) => {
        dispatch(curentPage(pageNumber))
        dispatch(setFetching(true));
        DataAPI.getUsers(currentPage,itemsOnPage).then(data => {
            dispatch(setFetching(false));
            dispatch(setuser(data.items));
            dispatch(setTotal(data.totalCount));
        })
    }
}

export const unfollowThunk = (userID) => {
    return (dispatch) => {
        dispatch(setIsFollowing(true, userID));
        DataAPI.unfollowAPI(userID).then(data => {

            if (data.resultCode === 0) {
                dispatch(unfollow(userID));
                dispatch(setIsFollowing(false, userID));
            }

        });
    }
}
export const followThunk = (userID) => {
    return (dispatch) => {
        dispatch(setIsFollowing(true, userID));
        DataAPI.followAPI(userID).then(data => {

            if (data.resultCode === 0) {
                dispatch(follow(userID));
                dispatch(setIsFollowing(false, userID));
            }

        });
    }
}
