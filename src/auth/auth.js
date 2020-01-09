const SERVER_URL = 'http://127.0.0.1/api'
const LOGIN_URL = SERVER_URL+'/students/login'
import request from '../utils/request';
import qs from 'qs';
export default{
    data:{
        authenticated:false
    },
    login(context,info){
        
        request({
            url: '/students/login',
            method: 'post',
            info,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: [function() {
                return qs.stringify(info);
            }]
        }).then(function(data){
            console.log(data.bodyText)
            localStorage.setItem('token',data.bodyText);
            this.authenticated = true
            this.$router.push('home')
        },function(err){
            console.log(err+","+err.body.message)
            context.error = err.body.message
        })

    },
    getAuthHeader(){
        return {
            'Authorization':'Bearer '+localStorage.getItem('token')
        }
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