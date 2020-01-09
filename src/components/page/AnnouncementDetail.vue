<template>
    <div>
        <div class="title-div">
            <el-row :gutter="20">
                <el-col :span="4" :offset="4">
                    <h1 class="title">通知公告详情</h1>
                </el-col>
            </el-row>
        </div>
        <div class="content-div">
            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                    <el-card class="box-card" shadow="never">
                        <div slot="header" class="clearfix">
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item :to="{ path: '/announcement' }">通知公告</el-breadcrumb-item>
                                <el-breadcrumb-item>通知公告详情</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                         <div v-html="announcement[0].title" style="text-align:center"></div>
                         <el-divider
                                content-position="right"
                            >{{announcement[0].createTime | dateFormat }}</el-divider>
                        <div v-html="announcement[0].content"></div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { fetchData, fetchDataById } from '../../api/base';
import moment from 'moment';
const mode = 'announcements';
export default {
    name: 'announcementtable',
    data() {
        return {
            announcement: []
        };
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
            let id = this.$route.params.id;
            fetchDataById({ mode, id }).then(res => {
                this.announcement = res.data;
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
</style>
