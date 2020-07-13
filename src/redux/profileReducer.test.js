import React from 'react';
import profileReducer, {addPostActionCreator, deletePost, getProfile, setProfileStatus} from "./profileReducer";

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

test('Add post should make post array increment', () => {

    let action = addPostActionCreator("Hello");

   let newState =  profileReducer(initialState,action);

    expect(newState.data.length).toBe(6);

});

test('Get profile should set profile in store', () => {
    let profile = {name: "al;dkfj", lastName: "daslkfj;"}

    let action = getProfile(profile);

    let newState =  profileReducer(initialState,action);

    expect(newState.profile).toBe(profile);

});

test('Set profile status should set profile status in store', () => {
    let status = "single";

    let action = setProfileStatus(status);

    let newState =  profileReducer(initialState,action);

    expect(newState.status).toBe(status);

});

test('Delete should decrement data array', () => {

    let action = deletePost(1);

    let newState =  profileReducer(initialState,action);

    expect(newState.data.length).toBe(4);

});