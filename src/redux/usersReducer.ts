import {ResultCodeMessage, UsersAPI} from "../api/api";
import {
    FOLLOW,
    SET_CURRENT_PAGE,
    SET_FETCHING_USERS,
    SET_IS_FOLLOWING,
    SET_TOTAL_COUNT,
    SET_USERS,
    UNFOLLOW
} from "./constants";
import {ThunkAction} from "redux-thunk";
import {StateType, TypesFromObj} from "./reduxStore";

export type UserType = {
    name: string
    id: number
    photos: { small: string | null, large: string | null }
    status: string | null
    followed: boolean
}

type InitialStateType = {
    users: Array<UserType>
    totalCount: number
    itemsOnPage: number
    currentPage: number
    isFetching: boolean
    isFollowing: Array<number>
}

let initialState: InitialStateType = {
    users: [],
    totalCount: 0,
    itemsOnPage: 10,
    currentPage: 1,
    isFetching: true,
    isFollowing: []
};
type MainActionType = TypesFromObj<typeof UsersActions>;

let userReducer = (state = initialState, action: MainActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: true};
                    }
                    return u;
                })
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: false};
                    }
                    return u;
                })
            };
        }
        case SET_USERS: {
            return {
                ...state, users: [...action.user]
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
                ...state,
                isFollowing: action.fetch ? [...state.isFollowing, action.userID] : state.isFollowing.filter((id) => id != action.userID)
            }
        }

        default:
            return state;
    }


}

export const UsersActions = {
    follow: (id: number) => ({type: FOLLOW, id: id} as const),
    unfollow: (id: number) => ({type: UNFOLLOW, id: id} as const),
    setUser: (user: Array<UserType>) => ({type: SET_USERS, user} as const),
    setTotal: (count: number) => ({type: SET_TOTAL_COUNT, count} as const),
    currentPageAC: (count: number) => ({type: SET_CURRENT_PAGE, count} as const),
    setFetching: (fetch: boolean) => ({type: SET_FETCHING_USERS, fetch} as const),
    setIsFollowing: (fetch: boolean, userID: number) => ({type: SET_IS_FOLLOWING,fetch,userID} as const)
}

export default userReducer;

type ThunkType = ThunkAction<void, StateType, unknown, MainActionType>;

export const getUsersThunk = (currentPage: number, itemsOnPage: number): ThunkType => {
    return (dispatch) => {
        dispatch(UsersActions.setFetching(true));
        UsersAPI.getUsers(currentPage, itemsOnPage).then((data) => {
            dispatch(UsersActions.setFetching(false));
            dispatch(UsersActions.setUser(data.items));
            dispatch(UsersActions.setTotal(data.totalCount));
        })
    }
}
export const getUsersAnotherPageThunk = (currentPage: number, itemsOnPage: number, pageNumber: number): ThunkType => {
    return (dispatch) => {
        dispatch(UsersActions.currentPageAC(pageNumber))
        dispatch(UsersActions.setFetching(true));
        UsersAPI.getUsers(currentPage, itemsOnPage).then((data) => {
            dispatch(UsersActions.setFetching(false));
            dispatch(UsersActions.setUser(data.items));
            dispatch(UsersActions.setTotal(data.totalCount));
        })
    }
}

export const unfollowThunk = (userID: number): ThunkType => {
    return (dispatch) => {
        dispatch(UsersActions.setIsFollowing(true, userID));
        UsersAPI.unfollowAPI(userID).then((data) => {

            if (data.resultCode === ResultCodeMessage.Success) {
                dispatch(UsersActions.unfollow(userID));
                dispatch(UsersActions.setIsFollowing(false, userID));
            }

        });
    }
}
export const followThunk = (userID: number): ThunkType => {
    return (dispatch) => {
        dispatch(UsersActions.setIsFollowing(true, userID));
        UsersAPI.followAPI(userID).then((data) => {

            if (data.resultCode === ResultCodeMessage.Success) {
                dispatch(UsersActions.follow(userID));
                dispatch(UsersActions.setIsFollowing(false, userID));
            }

        });
    }
}
