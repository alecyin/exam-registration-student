import request from '../utils/request';

export const getUserInfo = () => {
    return request({
        url: '/students/info',
        method: 'get'
    });
};

export const getUserPic = idCardNumberInfo => {
    return request({
        url: '/students/pic',
        method: 'post',
        idCardNumberInfo,
        headers:{
            'Content-Type':'application/json;'
        },
        transformRequest: [function() {
            return JSON.stringify(idCardNumberInfo)
        }]
    });
};

export const updatePass = form => {
    return request({
        url: '/students/update-pass',
        method: 'post',
        headers:{
            'Content-Type':'application/json;'
        },
        form,
        transformRequest: [function() {
            return JSON.stringify(form)
        }]
    });
};

export const reg = form => {
    return request({
        url: '/students/reg',
        method: 'post',
        headers:{
            'Content-Type':'application/json;'
        },
        form,
        transformRequest: [function() {
            return JSON.stringify(form)
        }]
    });
};