<template>
    <div>
         <navbar v-bind:activeIndex="'7'"></navbar>
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
                        <el-table-column label="操作" width="200" header-align="center">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="primary"
                                    @click="handleDownload(scope.$index, scope.row)"
                                >下载准考证</el-button>
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
import { apply, applyPaidInfo, downloadTicket } from '../../api/order';
import VDistpicker from 'v-distpicker';
import { getUserInfo } from '../../api/user';
import request from '../../utils/request';
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
            applyPaidInfo()
                .then(res => {
                    this.tableData = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleDownload(index, row) {
            downloadTicket(row)
                .then(res => {
                    console.log(res.data[0].pdfPath);
                    window.location.href = "http://47.105.93.192/api/ticket/" + res.data[0].pdfPath + '?n=' + Math.random();
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
.el-menu-item {
    padding: 0 17px;
}
.el-row {
    margin-bottom: 20px;
}
strong {
    font-weight: bold;
}
</style>
