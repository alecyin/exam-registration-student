<template>
    <div>
        <div class="title-div">
            <el-row :gutter="20">
                <el-col :span="4" :offset="4">
                    <h1 class="title">个人资料</h1>
                </el-col>
            </el-row>
        </div>
        <div class="content-div">
            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                    <el-card class="box-card" shadow="never">
                        <el-row>
                            <el-col :span="3">姓名：</el-col>
                            <strong>{{userInfo.name}}</strong>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row>
                            <el-col :span="3">性别：</el-col>
                            <strong>{{userInfo.sex}}</strong>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row>
                            <el-col :span="3">身份证号码：</el-col>
                            <strong>{{userInfo.idCardNumber}}</strong>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row>
                            <el-col :span="3">手机号码：</el-col>
                            <strong>{{userInfo.phone}}</strong>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row>
                            <el-col :span="3">邮箱：</el-col>
                            <strong>{{userInfo.email}}</strong>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row>
                            <el-col :span="3">地址：</el-col>
                            <strong>{{userInfo.address}}</strong>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row>
                            <el-col :span="3">学校：</el-col>
                            <strong>{{userInfo.school}}</strong>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row type="flex" justify="center">
                            <el-button type="primary" @click="handleEdit">修改</el-button>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <!-- 修改弹出框 -->
        <el-dialog :title="'修改'" :visible.sync="editVisible" width="40%">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="form.sex" label="男">男</el-radio>
                    <el-radio v-model="form.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="身份证号码" prop="idCardNumber">
                    <el-input v-model="form.idCardNumber"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="省市区">
                    <v-distpicker
                        :province="select.province"
                        :city="select.city"
                        :area="select.area"
                        @selected="onSelected"
                    ></v-distpicker>
                </el-form-item>
                <el-form-item label="详细地址" prop="specific">
                    <el-input type="textarea" @input="change($event)" v-model="form.specific"></el-input>
                </el-form-item>
                <el-form-item label="学校" prop="school">
                    <el-input v-model="form.school"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { editData } from '../../api/base';
import VDistpicker from 'v-distpicker';
import { getUserInfo } from '../../api/user';
const mode = 'students';
export default {
    name: 'student',
    data() {
        var isMobileNumber = (rule, value, callback) => {
            if (!value) {
                return new Error('请输入正确的电话号码');
            } else {
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
                const isPhone = reg.test(value);
                value = Number(value); //转换为数字
                if (typeof value === 'number' && !isNaN(value)) {
                    //判断是否为数字
                    value = value.toString(); //转换成字符串
                    if (value.length < 0 || value.length > 12 || !isPhone) {
                        //判断是否为11位手机号
                        callback(new Error('手机号码格式错误'));
                    } else {
                        callback();
                    }
                } else {
                    callback(new Error('请输入正确的电话号码'));
                }
            }
        };
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
        var isEmail = (rule, value, callback) => {
            if (!value) {
                callback();
            } else {
                const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                const email = reg.test(value);
                if (!email) {
                    callback(new Error('邮箱格式错误'));
                } else {
                    callback();
                }
            }
        };
        return {
            userInfo: {},
            editVisible: false,
            form: {},
            select: {},
            rules: {
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                specific: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: isMobileNumber, trigger: 'blur' }
                ],
                school: [{ required: true, message: '请输入学校', trigger: 'blur' }],
                idCardNumber: [
                    { required: true, message: '请输入身份证号', trigger: 'blur' },
                    { validator: isCardId, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: isEmail, trigger: 'blur' }
                ]
            }
        };
    },
    components: {
        VDistpicker
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let idCardNumberInfo = {
                idCardNumber: localStorage.getItem('idCardNumber')
            };
            getUserInfo(idCardNumberInfo)
                .then(res => {
                    this.userInfo = res.data[0];
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleEdit() {
            this.form = Object.assign({}, this.userInfo);
            let area = this.userInfo.address.split('|', 4);
            this.form.address = area.slice(0, 3).join('|');
            console.log(area);
            this.select = {
                province: area[0],
                city: area[1],
                area: area[2]
            };
            this.form.specific = area[3];
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.editVisible = false;
                    let form = this.form;
                    console.log(form);
                    form.address += '|' + this.form.specific;
                    console.log(form);
                    editData({ mode, form })
                        .then(() => {
                            this.$message.success(`修改成功`);
                            this.userInfo = this.form;
                            localStorage.setItem('ms_username', form.name);
                        })
                        .catch(() => {
                            this.$message.error(`保存失败`);
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        onSelected(data) {
            this.form.address = data.province.value + '|' + data.city.value + '|' + data.area.value;
        },
        change(e) {
            this.$forceUpdate();
            console.log(this.form.specific);
        }
    }
};
</script>

<style scoped>
.el-divider {
    margin: 12px 0;
}

.title-div {
    margin-bottom: 30px;
    border-bottom: 2px solid #1787e0;
}
.title {
    line-height: 40px;
    font-size: 30px;
    letter-spacing: 2px;
    color: #1787e0;
}
.el-row {
    margin-bottom: 20px;
}
strong {
    font-weight: bold;
}
</style>
