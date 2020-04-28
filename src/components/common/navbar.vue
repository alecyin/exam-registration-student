<template>
        <el-row :gutter="20">
            <el-col :span="16" :offset="4">
                <el-menu
                    :default-active="activeIndex"
                    text-color="#000"
                    mode="horizontal"
                    active-text-color="#409EFF"
                >
                    <el-menu-item index="1">
                        <i class="el-icon-bell"></i>
                        <a href="/#/announcement">通知公告</a>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-user"></i>个人资料
                        </template>
                        <el-menu-item index="2-1">
                            <a href="/#/info">修改个人资料</a>
                        </el-menu-item>
                        <el-menu-item index="2-2" @click="handleEditPass()">修改密码</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3">
                        <i class="el-icon-upload2"></i>
                        <a href="/#/photo">照片上传</a>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-cloudy"></i>
                        <a href="/#/apply">网上报名</a>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i class="el-icon-chat-dot-round"></i>
                        <a href="/#/apply-info">报名信息</a>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <i class="el-icon-shopping-cart-2"></i>
                        <a href="/#/pay">网上缴费</a>
                    </el-menu-item>
                    <el-menu-item index="7">
                        <i class="el-icon-download"></i>
                        <a href="/#/download-ticket">下载准考证</a>
                    </el-menu-item>
                    <el-menu-item index="9">
                        <i class="el-icon-switch-button"></i>
                        <a @click="logout()">退出系统</a>
                    </el-menu-item>
                </el-menu>
                <div class="line"></div>
            </el-col>
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
        </el-row>
</template>
<script>
import {updatePass} from '../../api/user';
export default {
    data() {
        return {
            collapse: false,
            fullscreen: false,
            name: 'yhf',
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
    props: {
        activeIndex: {
            type: String
        }
    },
    methods: {
        // // 用户名下拉菜单选择事件
        // handleCommand(command) {
        //     if (command == 'loginout') {
        //         localStorage.removeItem('ms_username');
        //         this.$router.push('/login');
        //     } else {
        //         this.handleEditPass();
        //     }
        // },
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
.el-menu-item {
    padding: 0 17px;
}
</style>