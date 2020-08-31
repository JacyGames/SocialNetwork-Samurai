import  axios from "axios";
import {ProfileType} from "../redux/profileReducer";
import {UserType} from "../redux/usersReducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "919f4290-8df1-4c27-b14f-53987648839c"
    }
})
export enum ResultCodeMessage {
    Success = 0,
    Error = 1
}
export enum ResultCodeCaptcha {
    CaptchaRequired = 10
}

type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string
}
type MainResponse = {
    resultCode: ResultCodeMessage
    messages: Array<string>
    data: {}
}


export const UsersAPI = {
    getUsers(currentPage: number, itemsOnPage: number) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${itemsOnPage}`)
            .then(response => response.data) ;
    },
    followAPI(id: number) {
        return  instance.post<MainResponse>(`follow/${id}`).then(response => response.data);
    },
    unfollowAPI(id: number) {
        return instance.delete<MainResponse>(`follow/${id}`).then(response => response.data);
    }
}

type UploadPhotoType = {
    data: {small: string, large: string}
    resultCode: ResultCodeMessage
    messages: Array<string>
}

export const ProfileAPI = {
    getProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data);
    },
    getProfileStatus(userId: number){
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data);
    },
    updateProfileStatus(status: string) {
        return instance.put<MainResponse>(`profile/status`, {status}).then(response => response.data);
    },
    uploadPhoto(photo: any) {
        let imageFile = new FormData();
        imageFile.append("image", photo);
        return instance.put<UploadPhotoType>(`profile/photo`, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    updateInfo(info: ProfileType) {
        return instance.put<MainResponse>(`profile`, info).then(response => response.data)
    }
}

type AuthMeType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodeMessage
    messages: Array<string>
}
type LoginizationType = {
    resultCode: ResultCodeMessage | ResultCodeCaptcha
    messages: Array<string>
    data: {}
}

export const AuthApi = {
    getAuthorized() {
        return instance.get<AuthMeType>(`auth/me`).then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: boolean | null) {
        return instance.post<LoginizationType>(`auth/login`, {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete<MainResponse>(`auth/login`);
    }
}

type SecureType = {
    url: string
}
export const SecureApi = {
    getGaptcha() {
        return instance.get<SecureType>(`security/get-captcha-url`).then(response => response.data);
    }

}

