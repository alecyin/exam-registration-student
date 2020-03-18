<template>
    <div class="header">
        <div>
            <el-row :gutter="20">
                <el-col :span="4" :offset="4">
                    <img
                        style="padding: 5px;height:30px;"
                        src="../../assets/logo.png"
                    />
                </el-col>
                <el-col :span="8" :offset="4">
                    <p style="line-height:40px;float:right">
                        <el-link :underline="false" href="/#/dashboard" target="_blank">首页&nbsp;&nbsp;</el-link>
                        <el-link :underline="false" href="/#/info" target="_blank">{{username}}&nbsp;&nbsp;</el-link>  
                        <el-link :underline="false" @click="handleCommand('loginout')" target="_blank">登出</el-link>&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                </el-col>
            </el-row>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <a href="https://github.com/lin-xin/网上报名系统" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a>-->
                        <el-dropdown-item divided command="handleEditPass">修改密码</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
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
</template>
<script>
import bus from '../common/bus';
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
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username');
                this.$router.push('/login');
            } else {
                this.handleEditPass();
            }
        },
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
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    font-size: 20px;
    color: #000;
    background: #f7f9fa;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 50px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 50px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 50px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #000;
}
.btn-bell .el-icon-bell {
    color: #000;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #000;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
