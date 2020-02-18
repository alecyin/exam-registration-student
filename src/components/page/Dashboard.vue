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
                            <a target="_blank" @click="handleEditPass">修改密码</a>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-dialog title="修改密码" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="原密码">
                    <el-input :type="passw1" v-model="form.oldPass">
                        <i slot="suffix" :class="icon1" @click="showPass1"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input :type="passw2" v-model="form.newPass">
                        <i slot="suffix" :class="icon2" @click="showPass2"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input :type="passw3" v-model="form.confirmPass">
                        <i slot="suffix" :class="icon3" @click="showPass3"></i>
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        </div>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import {updatePass} from '../../api/user';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            dialog: {},
            passw1: 'password',
            passw2: 'password',
            passw3: 'password',
            icon1: 'el-input__icon el-icon-view',
            icon2: 'el-input__icon el-icon-view',
            icon3: 'el-input__icon el-icon-view',
            form: {},
            editVisible: false
        };
    },
    methods: {
        handleEditPass() {
            this.editVisible = true;
        },
        saveEdit() {
            if (this.form.newPass != this.form.confirmPass) {
                this.$message.error('两次输入的新密码不一样，请重新输入');
            } else {
                let form =  this.form;
                updatePass(form).then(res => {
                    this.$message.success(`修改成功`);
                });
                this.editVisible = false;
                this.form = {};
            }
        },
        cancelEdit() {
            this.editVisible = false;
            this.form = {};
        },
        showPass1() {
            if (this.passw1 == 'text') {
                this.passw1 = 'password';
                this.icon1 = 'el-input__icon el-icon-view';
            } else {
                this.passw1 = 'text';
                this.icon1 = 'el-input__icon el-icon-loading';
            }
        },
        showPass2() {
            if (this.passw2 == 'text') {
                this.passw2 = 'password';
                this.icon2 = 'el-input__icon el-icon-view';
            } else {
                this.passw2 = 'text';
                this.icon2 = 'el-input__icon el-icon-loading';
            }
        },
        showPass3() {
            if (this.passw3 == 'text') {
                this.passw3 = 'password';
                this.icon3 = 'el-input__icon el-icon-view';
            } else {
                this.passw3 = 'text';
                this.icon3 = 'el-input__icon el-icon-loading';
            }
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
