import axios from 'axios'
import {Message} from 'element-ui';
import router from "../router";

axios.interceptors.response.use(success => {
        if (success.status && success.status == 200 && success.data.code == 500) {
            Message.error({message: success.data.message})
            return;
        }
        if (success.data.message) {
            Message.success({message: success.data.message})
        }
        return success.data;
    }, error => {
        if (error.response.status == 504 || error.response.status == 404) {
            Message.error({message: "服务器被吃了o(╯□╰)o"})
        } else if (error.response.status == 403) {
            Message.error({message: "权限不足，请联系管理员"})
        } else if (error.response.status == 401) {
            Message.error({message: "尚未登录，请登录"})
            router.replace('/');
        } else {
            if (error.response.data.message) {
                Message.error({message: error.response.data.message})
            } else {
                Message.error({message: "未知错误！"})
            }
        }
        return;
    }
)

let base = '';

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            console.log(ret);
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    });
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
};
export const getRequest = (url) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
    })
};
export const deleteRequest = (url) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
    });
}
