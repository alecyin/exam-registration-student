<template>
    <div>
        <div class="title-div">
            <el-row :gutter="20">
                <el-col :span="4" :offset="4">
                    <h1 class="title">网上缴费</h1>
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
                        <el-table-column label="操作" align="center">
                            <el-button type="danger" plain @click="handlePay">立即支付</el-button>
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
import { getUserInfo } from '../../api/user';
const mode = 'orders';
export default {
    name: 'student',
    data() {
        return {
            tableData: []
        };
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
        },
        handlePay() {
            this.$message.success(`ss成功`);
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
