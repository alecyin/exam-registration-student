const SERVER_URL = 'http://127.0.0.1/api'
const LOGIN_URL = SERVER_URL+'/students/login'
import request from '../utils/request';
export default{
    data:{
        authenticated:false
    },
    login(context, info){
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
            console.log(res);
            localStorage.setItem('token', res.data[0]);
            console.log(localStorage.getItem('token'));
            this.authenticated = true;
            context.$message.success('登录成功');
            localStorage.setItem('ms_username', context.param.username);
            context.$router.push('/');
        }).catch(() => {
        });
    },
    getAuthHeader(){
        return {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    },
    getToken(){
        return {

        };
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