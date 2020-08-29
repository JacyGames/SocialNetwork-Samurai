import  axios from "axios";
import {ProfileType} from "../redux/profileReducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "919f4290-8df1-4c27-b14f-53987648839c"
    }
})


export const UsersAPI = {
    getUsers(currentPage: number, itemsOnPage: number) {
        return instance.get(`users?page=${currentPage}&count=${itemsOnPage}`)
            .then(response => response.data) ;
    },
    followAPI(id: number) {
        return  instance.post(`follow/${id}`).then(response => response.data);
    },
    unfollowAPI(id: number) {
        return instance.delete(`follow/${id}`).then(response => response.data);
    }
}

export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`).then(response => response.data);
    },
    getProfileStatus(userId: number){
        return instance.get(`profile/status/${userId}`).then(response => response.data);
    },
    updateProfileStatus(status: string) {
        return instance.put(`profile/status`, {status});
    },
    uploadPhoto(photo: any) {
        let imageFile = new FormData();
        imageFile.append("image", photo);
        return instance.put(`profile/photo`, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    updateInfo(info: ProfileType) {
        return instance.put(`profile`, info).then(response => response.data)
    }
}


export const AuthApi = {
    getAuthorized() {
        return instance.get(`auth/me`).then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: boolean | null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}
export const SecureApi = {
    getGaptcha() {
        return instance.get(`security/get-captcha-url`).then(response => response.data);
    }

}

