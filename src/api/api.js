import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "919f4290-8df1-4c27-b14f-53987648839c"
    }
})


export const UsersAPI = {
    getUsers(currentPage, itemsOnPage) {
        return instance.get(`users?page=${currentPage}&count=${itemsOnPage}`)
            .then(response => response.data) ;
    },
    followAPI(id) {
        return  instance.post(`follow/${id}`).then(response => response.data);
    },
    unfollowAPI(id) {
        return instance.delete(`follow/${id}`).then(response => response.data);
    }
}

export const ProfileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => response.data);
    },
    getProfileStatus(userId){
        return instance.get(`profile/status/${userId}`).then(response => response.data);
    },
    updateProfileStatus(status) {
        return instance.put(`profile/status`, {status});
    },
    uploadPhoto(photo) {
        let imageFile = new FormData();
        imageFile.append("image", photo);
        return instance.put(`profile/photo`, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    }
}


export const AuthApi = {
    getAutorized() {
        return instance.get(`auth/me`).then(response => response.data);
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe});
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

