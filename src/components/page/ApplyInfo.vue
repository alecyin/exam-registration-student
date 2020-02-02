<template>
    <div>
        <div class="title-div">
            <el-row :gutter="20">
                <el-col :span="4" :offset="4">
                    <h1 class="title">报名信息查看</h1>
                </el-col>
            </el-row>
        </div>
        <div class="content-div">
            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="siteName" label="考点名称" width="180"></el-table-column>
                        <el-table-column prop="majorName" label="专业名称" width="180"></el-table-column>
                        <el-table-column prop="address" label="地址"></el-table-column>
                        <el-table-column prop="fee" label="应缴金额"></el-table-column>
                        <el-table-column label="是否支付" align="center">
                            <template slot-scope="scope">
                                <el-tag
                                    :type="scope.row.isPaid===true?'success':(scope.row.isPaid===false?'danger':'')"
                                >{{scope.row.isPaid===false?'否':'是'}}</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { fetchAllEnabledData, editData, fetchEnabledDataByCondition } from '../../api/base';
import { apply, applyInfo } from '../../api/order';
import VDistpicker from 'v-distpicker';
import { getUserInfo } from '../../api/user';
const mode = 'orders';
export default {
    name: 'student',
    data() {
        return {
            tableData: []
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

            applyInfo()
                .then(res => {
                    this.tableData = res.data;
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
                siteId: this.form.siteId
            };
            let qMode = 'majors';
            fetchEnabledDataByCondition({ qMode, condition }).then(res => {
                this.majorList = JSON.parse(JSON.stringify(res.data).slice(1, -1));
            });
        },
        selectMajorChange(e) {
            this.$forceUpdate(); // 强制更新，避免级联不更新的问题
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
            let form = this.form;
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
