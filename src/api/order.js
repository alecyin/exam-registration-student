import request from '../utils/request';

export const apply = form => {
    return request({
        url: 'orders/apply',
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

export const applyInfo = () => {
    return request({
        url: 'orders/apply-info',
        method: 'get'
    });
};


export const applyPaidInfo = () => {
    return request({
        url: 'orders/paid/apply-info',
        method: 'get'
    });
};

export const pay = form => {
    return request({
        url: 'alipay/getWebPay',
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

export const cancelOrder = form => {
    return request({
        url: 'orders/cancel-order',
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