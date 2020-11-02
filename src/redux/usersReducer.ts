import {ResultCodeMessage, UsersAPI} from "../api/api";
import {
    DELETE_FRIEND,
    FOLLOW,
    SET_CURRENT_PAGE,
    SET_FETCHING_USERS,
    SET_FRIENDS,
    SET_IS_FOLLOWING,
    SET_MINI_FETCHING_USERS,
    SET_MINI_FRIENDS, SET_SEARCHED_USERS,
    SET_TOTAL_COUNT,
    SET_TOTAL_COUNT_FRIENDS,
    SET_USERS,
    UNFOLLOW
} from "./constants";
import {ThunkAction} from "redux-thunk";
import {StateType, TypesFromObj} from "./reduxStore";

export type UserType = {
    name: string
    id: number
    photos: { small: string | undefined, large: string | undefined }
    status: string | null
    followed: boolean
}

export type InitialUsersType = {
    users: Array<UserType>
    friends: Array<UserType>
    miniFriends: Array<UserType>
    searchUsers: Array<UserType>
    totalCount: number
    totalCountFriends: number
    itemsOnPage: number
    currentPage: number
    isFetching: boolean
    isMiniFetching: boolean
    isFollowing: Array<number>

}

let initialState: InitialUsersType = {
    users: [],
    friends: [],
    miniFriends: [],
    searchUsers: [],
    totalCount: 0,
    totalCountFriends: 0,
    itemsOnPage: 10,
    currentPage: 1,
    isFetching: true,
    isMiniFetching: true,
    isFollowing: []
};
type MainActionType = TypesFromObj<typeof UsersActions>;

let userReducer = (state = initialState, action: MainActionType): InitialUsersType => {
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
                isFollowing: action.fetch ? [...state.isFollowing, action.userID] : state.isFollowing.filter((id) => id !== action.userID)
            }
        }
        case SET_FRIENDS: {
            return {
                ...state,
                friends: [...action.friends]
            }
        }
        case SET_TOTAL_COUNT_FRIENDS: {
            return {
                ...state,
                totalCountFriends: action.count
            }
        }
        case SET_MINI_FRIENDS: {
            return {
                ...state,
                miniFriends: [...action.friends]
            }
        }
        case SET_MINI_FETCHING_USERS: {
            return {
                ...state,
                isMiniFetching: action.fetch
            }
        }
        case DELETE_FRIEND: {
            return {
                ...state,
                friends: [...state.friends.filter(friend => friend.id !== action.id )]
            }
        }
        case SET_SEARCHED_USERS: {
            return {
                ...state,
                searchUsers: [...action.users]
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
    setMiniFetching: (fetch: boolean) => ({type: SET_MINI_FETCHING_USERS, fetch} as const),
    setIsFollowing: (fetch: boolean, userID: number) => ({type: SET_IS_FOLLOWING,fetch,userID} as const),
    setMiniFriends: (friends: Array<UserType>) => ({type: SET_MINI_FRIENDS, friends} as const),
    setFriends: (friends: Array<UserType>) => ({type: SET_FRIENDS, friends} as const),
    setTotalFriends: (count: number) => ({type: SET_TOTAL_COUNT_FRIENDS, count} as const),
    deleteFriend: (id: number) => ({type: DELETE_FRIEND, id} as const),
    setSearchedUsers: (users: Array<UserType>) => ({type: SET_SEARCHED_USERS, users} as const)
}

export default userReducer;

export type ThunkUsersType = ThunkAction<void, StateType, unknown, MainActionType>;

export const getUsersThunk = (currentPage: number, itemsOnPage: number, option: string = 'getUsers'): ThunkUsersType => {
    return async (dispatch) => {
        dispatch(UsersActions.setFetching(true));
        let getter
        if(option === 'getFriends'){
           getter = await UsersAPI.getFriends(currentPage, itemsOnPage)
            dispatch(UsersActions.setFriends(getter.items));
        }if(option === 'getMiniFriends'){
            dispatch(UsersActions.setMiniFetching(true));
            getter = await UsersAPI.getFriends(currentPage, itemsOnPage);
            dispatch(UsersActions.setMiniFriends(getter.items));
            dispatch(UsersActions.setTotalFriends(getter.totalCount));
            dispatch(UsersActions.setMiniFetching(false));
        }
        else{
            getter = await UsersAPI.getUsers(currentPage, itemsOnPage);
            dispatch(UsersActions.setUser(getter.items));
            dispatch(UsersActions.setTotal(getter.totalCount));
        }
            dispatch(UsersActions.setFetching(false));



    }
}

export const SearchUserThunk = (name: string): ThunkUsersType => {
    return (dispatch) => {
        dispatch(UsersActions.setFetching(true));
        UsersAPI.search(name).then((data) => {
            dispatch(UsersActions.setSearchedUsers(data.items));
            dispatch(UsersActions.setFetching(false));
        })
    }
}

export const getUsersAnotherPageThunk = (currentPage: number, itemsOnPage: number, pageNumber: number): ThunkUsersType => {
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

export const unfollowThunk = (userID: number): ThunkUsersType => {
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
export const followThunk = (userID: number): ThunkUsersType => {
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
