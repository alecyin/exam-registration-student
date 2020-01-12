import request from '../utils/request';

export const getUserInfo = idCardNumberInfo => {
    return request({
        url: '/students/info',
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