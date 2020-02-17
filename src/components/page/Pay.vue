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
                        <el-table-column prop="address" label="地址" width="260"></el-table-column>
                        <el-table-column prop="majorName" label="专业名称" width="180"></el-table-column>
                        <el-table-column prop="fee" label="应缴金额/元"></el-table-column>
                        <el-table-column label="操作" width="200" align="center">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="primary"
                                    @click="handlePay(scope.$index, scope.row)"
                                >立即支付</el-button>
                                <el-button
                                size="mini"
                                type="warning"
                                    @click="handleCancel(scope.$index, scope.row)"
                                >取消报名</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
        <div>
            <dl v-html="jump">{{jump}}</dl>
        </div>
    </div>
</template>

<script>
import { fetchAllEnabledData, editData, fetchEnabledDataByCondition } from '../../api/base';
import { apply, applyUnpaidInfo, pay, cancelOrder } from '../../api/order';
import { getUserInfo } from '../../api/user';
const mode = 'orders';
export default {
    name: 'student',
    data() {
        return {
            tableData: [],
            jump: ''
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

            applyUnpaidInfo()
                .then(res => {
                    this.tableData = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handlePay(index, row) {
            console.log(row);
            pay(row)
                .then(res => {
                    this.jump = res.data[0];
                    this.$message(`正在跳转...`);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleCancel(index, row) {
            cancelOrder(row)
                .then(res => {
                    this.jump = res.data[0];
                    this.$message(`取消成功`);
                    this.tableData.splice(index, 1);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    watch: {
        jump(val) {
            this.$nextTick(function() {
                document.forms[0].submit();
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
