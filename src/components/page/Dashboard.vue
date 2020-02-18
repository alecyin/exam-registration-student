<template>
    <div class="card-top">
        <div class="title-div">
            <el-row :gutter="20">
                <el-col :span="4" :offset="4">
                    <h1 class="title">用户中心</h1>
                </el-col>
            </el-row>     
        </div>
        <div class="content-div">
            <el-row :gutter="20">
                <el-col :span="4" :offset="4">
                    <el-card shadow="hover" :body-style="{ padding: '50px', }">
                        <div class="card-div">
                            <a target="_blank" href="/#/announcement">通知公告</a>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="4">
                    <el-card shadow="hover" :body-style="{ padding: '50px', }">
                        <div class="card-div">
                            <a target="_blank" href="/#/info">个人资料</a>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="4">
                    <el-card shadow="hover" :body-style="{ padding: '50px', }">
                        <div class="card-div">
                            <a target="_blank" href="/#/photo">照片上传</a>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="4">
                    <el-card shadow="hover" :body-style="{ padding: '50px', }">
                        <div class="card-div">
                            <a target="_blank" href="/#/apply">网上报名</a>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" :offset="4">
                    <el-card shadow="hover" :body-style="{ padding: '50px', }">
                        <div class="card-div">
                            <a target="_blank" href="/#/apply-info">报名信息查看</a>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="4">
                    <el-card shadow="hover" :body-style="{ padding: '50px', }">
                        <div class="card-div">
                            <a target="_blank" href="/#/pay">网上缴费</a>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="4">
                    <el-card shadow="hover" :body-style="{ padding: '50px', }">
                        <div class="card-div">
                            <a target="_blank" href="/#/download-ticket">下载准考证</a>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="4">
                    <el-card shadow="hover" :body-style="{ padding: '50px', }">
                        <div class="card-div">
                            <a target="_blank" href="/#/pass">修改密码</a>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import {getUserInfo} from '../../api/user';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username')
        };
    },
    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        }
    }
};
</script>


<style scoped>
.title {
    line-height: 40px;
    font-size: 30px;
    letter-spacing: 2px;
    color: #1787e0;
}

.content-div {
    padding: 0px;
}

.content-div a {
    color:#000;
}

.title-div {
    margin-bottom: 30px;
    border-bottom: 2px solid #1787e0;
}

.card-div {
    text-align: center;
    font-size: 20px;
}

.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
