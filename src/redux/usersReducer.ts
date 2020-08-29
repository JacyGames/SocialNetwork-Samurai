import {UsersAPI} from "../api/api";
import {
    FOLLOW,
    SET_CURRENT_PAGE,
    SET_FETCHING_USERS,
    SET_IS_FOLLOWING,
    SET_TOTAL_COUNT,
    SET_USERS,
    UNFOLLOW
} from "./constants";

export type UserType = {
    name: string
    id: number
    photos: {small: string | null, large: string | null}
    status: string| null
    followed: boolean
}

type InitialStateType = {
    users: Array<UserType>
    totalCount: number
    itemsOnPage: number
    currentPage: number
    isFetching: boolean
    isFollowing: Array<UserType>
}

let initialState: InitialStateType = {
    users: [],
    totalCount: 0,
    itemsOnPage: 10,
    currentPage: 1,
    isFetching: true,
    isFollowing: []
};

let userReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type){
        case FOLLOW: {
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
        case UNFOLLOW: {
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
        case SET_USERS: {
            return {
                ...state, users: [ ...action.user]
            }
        }
        case SET_TOTAL_COUNT: {
            return {
                ...state, totalCount: action.count
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.count
            }
        }
        case SET_FETCHING_USERS: {
            return {
                ...state, isFetching: action.fetch
            }
        }
        case SET_IS_FOLLOWING: {
            return {
                ...state, isFollowing: action.fetch ? [ ...state.isFollowing, action.userID ] : state.isFollowing.filter(id => id != action.userID)
            }
        }

        default: return state;
    }


}

type FollowAction = {
    type: typeof FOLLOW
    id: number
}
export const follow = (id: number):FollowAction => ({type: FOLLOW, id: id});

type UnfollowAction = {
    type: typeof UNFOLLOW
    id: number
}

export const unfollow = (id: number): UnfollowAction => ({type: UNFOLLOW,  id: id});

type SetUserAction = {
    type: typeof SET_USERS
    user: UserType
}
export const setUser = (user: UserType): SetUserAction => ({type: SET_USERS,  user});

type SetTotalAction = {
    type: typeof SET_TOTAL_COUNT
    count: number
}
export const setTotal = (count: number): SetTotalAction => ({type: SET_TOTAL_COUNT,  count});

type CurrentPageAction = {
    type: typeof SET_CURRENT_PAGE
    count: number
}
export const currentPageAC = (count: number): CurrentPageAction => ({type: SET_CURRENT_PAGE,  count});

type SetFetchingAction = {
    type: typeof SET_FETCHING_USERS
    fetch: boolean
}
export const setFetching = (fetch: boolean): SetFetchingAction => ({type: SET_FETCHING_USERS,  fetch});

type setIsFollowingAction = {
    type: typeof SET_IS_FOLLOWING
    fetch: boolean
    userID: number
}
export const setIsFollowing = (fetch: boolean,userID: number): setIsFollowingAction => ({type: SET_IS_FOLLOWING,  fetch,userID});
export default userReducer;

export const getUsersThunk = (currentPage: number, itemsOnPage: number) => {
    return (dispatch: any) => {
        dispatch(setFetching(true));
        UsersAPI.getUsers(currentPage,itemsOnPage).then((data: any) => {
            dispatch(setFetching(false));
            dispatch(setUser(data.items));
            dispatch(setTotal(data.totalCount));
        })
    }
}
export const getUsersAnotherPageThunk = (currentPage: number, itemsOnPage: number,pageNumber: number) => {
    return (dispatch: any) => {
        dispatch(currentPageAC(pageNumber))
        dispatch(setFetching(true));
        UsersAPI.getUsers(currentPage,itemsOnPage).then((data: any) => {
            dispatch(setFetching(false));
            dispatch(setUser(data.items));
            dispatch(setTotal(data.totalCount));
        })
    }
}

export const unfollowThunk = (userID: number) => {
    return (dispatch: any) => {
        dispatch(setIsFollowing(true, userID));
        UsersAPI.unfollowAPI(userID).then((data: any) => {

            if (data.resultCode === 0) {
                dispatch(unfollow(userID));
                dispatch(setIsFollowing(false, userID));
            }

        });
    }
}
export const followThunk = (userID: number) => {
    return (dispatch: any) => {
        dispatch(setIsFollowing(true, userID));
        UsersAPI.followAPI(userID).then((data: any) => {

            if (data.resultCode === 0) {
                dispatch(follow(userID));
                dispatch(setIsFollowing(false, userID));
            }

        });
    }
}
