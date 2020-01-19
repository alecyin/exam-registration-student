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

        <!-- 添加弹出框 -->
        <el-dialog :title="'修改'" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.sex"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码">
                    <el-input v-model="form.idCardNumber"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="省市区">
                    <v-distpicker :province="select.province" :city="select.city" :area="select.area" @selected="onSelected"></v-distpicker>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input type="textarea" @input="change($event)" v-model="form.specific"></el-input>
                </el-form-item>
                <el-form-item label="学校">
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
import VDistpicker from 'v-distpicker'
import {getUserInfo} from '../../api/user';
const mode = 'students';
export default {
    name: 'student',
    data() {
        return {
            userInfo: {},
            editVisible: false,
            form: {},
            select: {}
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
                "idCardNumber": localStorage.getItem('idCardNumber')
            };
            getUserInfo(idCardNumberInfo).then(res => {
                this.userInfo = res.data[0];
            }).catch((error) => {
               console.log(error);
            });
        },
        handleEdit() {
            this.form = Object.assign({}, this.userInfo);
            let area = this.userInfo.address.split("|", 4);
            this.form.address = area.slice(0,3).join('|');
            console.log(area);
            this.select = {
                "province": area[0],
                "city": area[1],
                "area": area[2]
            };
            this.form.specific = area[3];
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            let form = this.form;
            console.log(form);
            form.address += '|' + this.form.specific;
            console.log(form);
            editData({mode, form}).then(() => {
                this.$message.success(`修改成功`);
                this.userInfo = this.form;
                localStorage.setItem('ms_username', form.name);
            }).catch(() => {
               this.$message.error(`保存失败`);
            });
        },
        onSelected(data) {
            this.form.address = data.province.value + '|' + data.city.value + '|' + data.area.value;
        },
        change(e) {
            this.$forceUpdate()
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
