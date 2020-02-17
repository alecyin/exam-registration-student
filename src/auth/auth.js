import request from '../utils/request';
import {getUserInfo} from '../api/user';
export default{
    data:{
        authenticated:false
    },
    login(context, info) {
        request({
            url: '/students/login',
            method: 'post',
            info,
            headers:{
                'Content-Type':'application/json;'
            },
            transformRequest: [function() {
                return JSON.stringify(info)
            }]
        }).then(res => {
            localStorage.setItem('token', res.data[0]);
            this.authenticated = true;
            context.$message.success('登录成功');
            getUserInfo().then(res => {
                localStorage.setItem('id', res.data[0].id);
                localStorage.setItem('idCardNumber', res.data[0].idCardNumber);
                localStorage.setItem('ms_username', res.data[0].name);
                context.$router.push('/');
            }).catch((error) => {
               console.log(error);
            });
        }).catch(() => {
        });
    },
    getAuthHeader(){
        return {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    },
    getToken(){
        return 'Bearer ' + localStorage.getItem('token');
    },
    checkAuth(){
        var token = localStorage.getItem('token')
        if(token){
            this.authenticated = true
        }else{
            this.authenticated = false
        }
    }
}