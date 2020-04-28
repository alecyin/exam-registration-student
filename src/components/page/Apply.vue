<template>
    <div>
        <navbar v-bind:activeIndex="'4'"></navbar>
        <div class="content-div">
            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                    <el-card class="box-card" shadow="never">
                        <el-row>
                            <el-col :span="3">选择考点：</el-col>
                            <el-col :span="21">
                                <el-select
                                    v-model="form.siteName"
                                    placeholder="请选择"
                                    @change="selectSiteChange"
                                    clearable 
                                >
                                    <el-option
                                        v-for="item in siteList"
                                        :key="item.id"
                                        :lable="item.id"
                                        :value="item.name"
                                    ></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row>
                            <el-col :span="3">选择专业：</el-col>
                            <el-col :span="8">
                                <el-select
                                    v-model="form.majorName"
                                    placeholder="请选择专业考试"
                                    @change="selectMajorChange"
                                    clearable 
                                >
                                    <el-option
                                        v-for="item in majorList"
                                        :key="item.id"
                                        :lable="item.id"
                                        :value="item.name"
                                    ></el-option>
                                </el-select> 
                            </el-col> 
                        </el-row>
                        <el-divider></el-divider>
                        <el-row>
                            <el-col :span="3">应缴金额：</el-col>
                            <el-col :span="8">
                                {{form.fee + ' 元'}}
                            </el-col>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row>
                            <el-button type="primary" @click="handleApply">报名</el-button>      
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import navbar from '../common/navbar.vue'
import { fetchAllEnabledData, editData, fetchEnabledDataByCondition } from '../../api/base';
import { apply } from '../../api/order';
import VDistpicker from 'v-distpicker';
import { getUserInfo } from '../../api/user';
const mode = "orders";
export default {
    name: 'student',
    data() {
        return {
            userInfo: {},
            editVisible: false,
            form: {
                "fee": 0.0
            },
            select: {},
            siteList: [],
            majorList: []
        };
    },
    components: {
        VDistpicker,
        navbar
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
            // fetchAllEnabledData("majors").then(res => {
            //     this.majorList = JSON.parse(JSON.stringify(res.data).slice(1, -1));
            // }).catch(error => {
            //    this.$message.error(`获取专业信息失败，稍后再试`);
            // });
            fetchAllEnabledData('sites')
            .then(res => {
                this.siteList = JSON.parse(JSON.stringify(res.data).slice(1, -1));
            })
            .catch(error => {
                this.$message.error(`获取考点信息失败，稍后再试`);
            });
        },
        selectSiteChange(e) {
            let obj = {};
            this.form.majorName = '';
            this.form.majorId = '';
            this.form.fee = 0;
            obj = this.siteList.find(item => {
                return item.name === e; //筛选出匹配数据
            });
            this.form.siteName = obj.name;
            this.form.siteId = obj.id;
            let condition = {
                "siteId": this.form.siteId
            };
            let qMode = "majors";
            fetchEnabledDataByCondition({qMode, condition}).then(res => {
                this.majorList = JSON.parse(JSON.stringify(res.data).slice(1, -1));
            });
        },
        selectMajorChange(e) {
            this.$forceUpdate();// 强制更新，避免级联不更新的问题
            this.form.fee = 0;
            let obj = {};
            obj = this.majorList.find(item => {
                return item.name === e; //筛选出匹配数据
            });
            this.form.majorId = obj.id;
            this.form.majorName = obj.name;
            this.form.fee = obj.fee;
        },
        handleApply() {
            let form =  this.form;
            apply(form).then(res => {
                this.$message.success(`报名成功`);
            });
        }
    }
};
</script>

<style scoped>
.el-divider {
    margin: 12px 0;
}
.el-menu-item {
    padding: 0 17px;
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
