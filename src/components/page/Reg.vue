<template>
    <el-container>
        <el-header style="height: 70px">
            <el-row :gutter="20">
                <el-col :span="4" :offset="4">
                    <img style="padding: 5px;height:60px;" src="../../assets/logo.png" />
                </el-col>
                <el-col :span="4" :offset="8">
                    <p style="line-height:70px;">
                        <el-link
                            type="primary"
                            :underline="false"
                            href="/#/login"
                            target="_blank"
                        >登录 /</el-link>
                        <el-link
                            type="primary"
                            :underline="false"
                            href="/#/reg"
                            target="_blank"
                        >&nbsp;注册</el-link>
                    </p>
                </el-col>
            </el-row>
        </el-header>
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
                        <h2 class="login-form-h2">注册</h2>
                        <p class="login-form-p">请使用身份证号码注册</p>
                        <el-form-item prop="idCardNumber">
                            <el-input v-model="param.idCardNumber" placeholder="身份证号码">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                type="password"
                                placeholder="密码"
                                v-model="param.password"
                                @keyup.enter.native="submitForm()"
                            >
                                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-form-item prop="verifycode">
                                <el-input
                                    v-model="param.verifycode"
                                    placeholder="请输入验证码"
                                    class="identifyinput"
                                >
                                    <el-button slot="prepend" icon="el-icon-chat-round"></el-button>
                                </el-input>
                            </el-form-item>
                            <div class="identifybox">
                                <div @click="refreshCode">
                                    <s-identify :identifyCode="identifyCode"></s-identify>
                                </div>
                                <!-- 刷新验证码 -->
                                <el-button @click="refreshCode" type="text" class="textbtn">看不清，换一张</el-button>
                            </div>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button type="primary" @click="submitForm()">注册</el-button>
                        </div>
                        <div style="text-align:right">
                            <el-link type="primary" href="/#/login" target="_blank">已有账号？点击登录</el-link>
                        </div>
                    </el-form>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>Copyright © 2003-2020 网上报名系统 All Rights Reserved</el-footer>
    </el-container>
</template>

<script>
import auth from '../../auth/auth';
import { reg } from '../../api/user';
import SIdentify from '../common/RandomCode';
export default {
    data: function() {
        var isCardId = (rule, value, callback) => {
            if (!value) {
                return new Error('请输入身份证号)');
            } else {
                const reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$/;
                const card = reg.test(value);
                if (!card) {
                    //判断座机为12位
                    callback(new Error('身份证格式错误'));
                } else {
                    callback();
                }
            }
        };
        const validateVerifycode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'));
            } else if (value !== this.identifyCode) {
                console.log('validateVerifycode:', value);
                callback(new Error('验证码不正确'));
            } else {
                callback();
            }
        };
        return {
            param: {
                idCardNumber: '',
                password: '',
                verifycode: ''
            },
            identifyCode: '',
            identifyCodes: '1234567890',
            rules: {
                idCardNumber: [
                    { required: true, message: '请输入身份证号', trigger: 'blur' },
                    { validator: isCardId, trigger: 'blur' }
                ],

                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 30,
                        message: '长度在 6 到 30 个字符'
                    },
                    {
                        pattern: /^(\w){6,20}$/,
                        message: '只能输入6-20个字母、数字、下划线'
                    }
                ],
                verifycode: [{ required: true, trigger: 'blur', validator: validateVerifycode }]
            }
        };
    },
    components: {
        SIdentify
    },
    methods: {
        // 生成随机数
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        // 切换验证码
        refreshCode() {
            this.identifyCode = '';
            this.makeCode(this.identifyCodes, 4);
        },
        // 生成四位随机验证码
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
            }
            console.log(this.identifyCode);
        },
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    var form = {
                        idCardNumber: this.param.idCardNumber,
                        password: this.param.password
                    };
                    reg(form).then(res => {
                        this.$message(`注册成功！正在跳转到登录界面...`);
                        this.$router.push({ path: '/login' });
                    });
                } else {
                    this.refreshCode();
                    return false;
                }
            });
            this.refreshCode();
        }
    },
    mounted() {
        this.refreshCode();
    }
};
</script>

<style>
.el-header {
    text-align: center;
    height: 88px;
    /* font-size: 20px; */
    font-weight: 500;
    line-height: 88px;
    padding: 0 20px;
}
.el-footer {
    background-color: #b3c0d1;
    color: #666;
    text-align: left;
    line-height: 80px;
    width: 100%;
    height: 80px;
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
.identifybox {
    display: flex;
    justify-content: flex-start;
    margin-top: 7px;
}
</style>