<template>
    <div>
        <navbar v-bind:activeIndex="'5'"></navbar>
        <div class="content-div">
            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="siteName" label="考点名称" width="100"></el-table-column>
                        <el-table-column prop="address" label="地址" width="200"></el-table-column>
                        <el-table-column prop="majorName" label="专业名称" width="180"></el-table-column>
                        <el-table-column prop="examineeNumber" label="考号" width="100"></el-table-column>
                        <el-table-column prop="startTime" label="开始时间" :formatter="dateFormat"></el-table-column>
                        <el-table-column prop="endTime" label="结束时间" :formatter="dateFormat"></el-table-column>
                        <el-table-column prop="fee" label="缴费金额/元" width="90"></el-table-column>
                        <el-table-column label="支付状态" align="center">
                            <template slot-scope="scope">
                                <el-tag
                                    :type="scope.row.isPaid?'success':'danger'"
                                >{{scope.row.isPaid?'已支付':'未支付'}}</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import navbar from '../common/navbar.vue'
import { fetchAllEnabledData, editData, fetchEnabledDataByCondition } from '../../api/base';
import { apply, applyInfo } from '../../api/order';
import VDistpicker from 'v-distpicker';
import { getUserInfo } from '../../api/user';
import moment from 'moment';
const mode = 'orders';
export default {
    name: 'student',
    data() {
        return {
            tableData: []
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
            applyInfo()
                .then(res => {
                    this.tableData = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return '';
            }
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
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
