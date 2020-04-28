<template>
    
</template>
<template>
    <div>
        <!-- <div class="title-div">
            <el-row :gutter="20">
                <el-col :span="4" :offset="4">
                    <h1 class="title">通知公告</h1>
                </el-col>
            </el-row>
        </div>-->
        <navbar v-bind:activeIndex="'1'"></navbar>
        <div class="content-div">
            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                    <el-card class="box-card" shadow="never">
                        <p v-for="announcement in tableData" :key="announcement.id">
                            <el-link
                                :href="'/#/announcement/' + announcement.id"
                            >{{announcement.title }}</el-link>
                            <el-divider
                                content-position="right"
                            >{{announcement.createTime | dateFormat }}</el-divider>
                        </p>
                    </el-card>
                    <div class="pagination">
                        <el-pagination
                            background
                            layout="total, prev, pager, next"
                            :current-page="query.pageIndex"
                            :page-size="query.pageSize"
                            :total="pageTotal"
                            @current-change="handlePageChange"
                        ></el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../../api/base';
import navbar from '../common/navbar.vue'
import moment from 'moment';
const mode = 'announcements';
export default {
    name: 'announcementtable',
    data() {
        return {
            query: {
                keyword: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            pageTotal: 0,
            idx: -1,
            id: -1
        };
    },
    components: {
        navbar
    },
    created() {
        this.getData();
    },
    filters: {
        dateFormat(value) {
            var date = new Date(value);
            if (date == undefined) {
                return '';
            }
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    methods: {
        getData() {
            let query = this.query;
            fetchData({ mode, query }).then(res => {
                this.tableData = res.data;
                this.pageTotal = res.pageTotal;
            });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
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
</style>
