<template>
    <el-container>
        <el-header>招生院校</el-header>
        <el-main>
            <el-row>
                <el-col :span="8" :offset="8">
                    <el-form
                        :model="param"
                        :rules="rules"
                        ref="login"
                        label-width="0px"
                        class="ms-content"
                    >
                        <h2 class="login-form-h2">登录</h2>
                        <p class="login-form-p">请使用身份证号码登录</p>
                        <el-form-item prop="idCardNumber">
                            <el-input v-model="param.idCardNumber" placeholder="idCardNumber">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                type="password"
                                placeholder="password"
                                v-model="param.password"
                                @keyup.enter.native="submitForm()"
                            >
                                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button type="primary" @click="submitForm()">登录</el-button>
                        </div>
                    </el-form>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>Copyright © 2003-2020 招生院校 All Rights Reserved</el-footer>
    </el-container>
</template>

<script>
import auth from '../../auth/auth';
export default {
    data: function() {
        return {
            param: {
                idCardNumber: '220211200104260948',
                password: '123456'
            },
            rules: {
                idCardNumber: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    var info = {
                        idCardNumber: this.param.idCardNumber,
                        password: this.param.password
                    };
                    auth.login(this, info);
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style>
.el-header,
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: left;
    line-height: 86px;
    width: 100%;
    height: 86px;
    background: #fff;
}

.el-footer {
    text-align: center;
}

.login-form-h2 {
    color: #3c3c3c;
    text-align: center;
    font-size: 30px;
    line-height: 50px;
    font-weight: 400;
}

.login-form-p {
    color: #666;
    line-height: 22px;
    font-size: 14px;
    text-align: center;
    margin-bottom: 16px;
}

.el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    width: 100%;
}

body > .el-container {
    margin-bottom: 40px;
}
.ms-content {
    background: rgb(255, 255, 255);
    padding: 30px 30px;
    margin-top: 20%;
    margin-bottom: 30%;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>