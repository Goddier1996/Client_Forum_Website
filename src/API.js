import { Config } from "./Config" // config ייבוא של כתובת השרת מדף 

export const API = {

    CATEGORIES: {

        GET: `${Config.API.BASE}/api/categories`,

        ADD: `${Config.API.BASE}/api/categories/add`,

        UPDATE: `${Config.API.BASE}/api/categories/update`,

        DELETE: `${Config.API.BASE}/api/categories/delete`,

        REACTIVATE: `${Config.API.BASE}/api/categories/reactivate`,

        SHOW: `${Config.API.BASE}/api/categories/show`,

        UPLOAD: `${Config.API.BASE}/api/categories/upload`
    },

    TOPICS: {

        GET: `${Config.API.BASE}/api/topics`,

        ADD: `${Config.API.BASE}/api/topics/add`,

        UPDATE: `${Config.API.BASE}/api/topics/update`,

        DELETE: `${Config.API.BASE}/api/topics/delete`,

        REACTIVATE: `${Config.API.BASE}/api/topics/reactivate`,

        SHOW: `${Config.API.BASE}/api/topics/show`,

        SHOWTOPICSUSER: `${Config.API.BASE}/api/topics/showTopicsUser`
    },

    COMMENTS: {

        GET: `${Config.API.BASE}/api/comments`,

        ADD: `${Config.API.BASE}/api/comments/add`,

        UPDATE: `${Config.API.BASE}/api/comments/update`,

        DELETE: `${Config.API.BASE}/api/comments/delete`,

        REACTIVATE: `${Config.API.BASE}/api/comments/reactivate`,

        SHOW: `${Config.API.BASE}/api/comments/show`,

        SHOWCOMMENTSUSER: `${Config.API.BASE}/api/comments/showCommentsUser`
    },

    USERS: {

        GET: `${Config.API.BASE}/api/users`,

        ADD: `${Config.API.BASE}/api/users/add`,

        UPDATE: `${Config.API.BASE}/api/users/update`,

        DELETE: `${Config.API.BASE}/api/users/delete`,

        REACTIVATE: `${Config.API.BASE}/api/users/reactivate`,

        LOGIN: `${Config.API.BASE}/api/users/login`,

        SHOW: `${Config.API.BASE}/api/users/show`,

        UPLOAD: `${Config.API.BASE}/api/users/upload`,

        FORGET: `${Config.API.BASE}/api/users/forget`,

        UPDATE_PASSWORD: `${Config.API.BASE}/api/users/updatePassword`
    },


    TYPES_USERS: {

        GET: `${Config.API.BASE}/api/types_users`,

        ADD: `${Config.API.BASE}/api/types_users/add`,

        UPDATE: `${Config.API.BASE}/api/types_users/update`,

        DELETE: `${Config.API.BASE}/api/types_users/delete`,

        REACTIVATE: `${Config.API.BASE}/api/types_users/reactivate`
    }

}