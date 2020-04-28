<template>
    <div class="mod-config">
        <el-row :gutter="20">
            <el-col :span="10" :offset="9">
                <div style="padding: 10px;">
                    <el-button type="primary" @click="handleDown">PDF下载-准考证</el-button>
                    <el-button type="primary" @click="handleWindowPrint( '#demo', '准考证' )">浏览器方式下载</el-button>
                    <el-button
                        class="filter-item"
                        style="margin-left: 10px;"
                        type="primary"
                        icon="el-icon-back"
                        @click="goBack"
                    >返回</el-button>
                </div>
            </el-col>
        </el-row>

        <div style="width: 100%">
            <div id="demo">
                <table border="1" class="table_style">
                    <thead>
                        <th colspan="4" style="font-size: 30px">2020年某学院艺术准考证</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>姓名</td>
                            <td colspan="2">{{data.student.name}}</td>
                            <td rowspan="5">
                                <img
                                    style="padding: 1px;width:150px;"
                                    :src="'http://47.105.93.192/api/photo/' + data.student.idCardPic + '.jpg?n=' + Math.random()"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>准考证号码</td>
                            <td colspan="2">{{data.student.name}}</td>
                        </tr>
                        <tr>
                            <td>身份证号码</td>
                            <td colspan="2">{{data.student.idCardNumber}}</td>
                        </tr>
                        <tr>
                            <td>省统考号</td>
                            <td colspan="2">{{data.student.provincialExamineeNumber}}</td>
                        </tr>
                        <tr>
                            <td>学校</td>
                            <td colspan="2">{{data.student.school}}</td>
                        </tr>
                        <!-- <tr>
          <td colspan="3" style="font-size: 20px">注意事项</td>
                        </tr>-->
                        <tr>
                            <td colspan="4" style="text-align: left" v-html="data.note.content"></td>
                        </tr>
                        <tr>
                            <td colspan="4" style="font-size: 20px">考试安排</td>
                        </tr>
                        <tr>
                            <td>科目</td>
                            <td>地址</td>
                            <td>开始时间</td>
                            <td>结束时间</td>
                        </tr>
                        <tr :key="index" v-for="(item, index) in data.subjects">
                            <td>{{item.subjectName}}</td>
                            <td>{{item.address}}</td>
                            <td>{{item.startTime | formatDate}}</td>
                            <td>{{item.endTime | formatDate}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from '../common/navbar.vue';
import { fetchDataById } from '../../api/base';
import { apply, applyPaidInfo, downloadTicket } from '../../api/order';
import VDistpicker from 'v-distpicker';
import { getUserInfo } from '../../api/user';
import request from '../../utils/request';
import moment from 'moment';
const mode = 'tickets';
import htmlToPdf from '../../utils/htmlToPdf';
export default {
    name: 'pdf',
    data() {
        return {
            data: {
                subjects: []
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            let id = this.$route.params.id;
            fetchDataById({ mode, id })
                .then(res => {
                    this.data = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleWindowPrint(ele, fileName) {
            document.head.innerHTML =
                '<meta charset="utf-8">\n' +
                ' <title> ' +
                fileName +
                '</title>\n' +
                ' <meta name="format-detection" content="telephone=no">\n' +
                ' <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">\n' +
                ' <meta name="viewport" content="width=device-width,initial-scale=1.0">\n' +
                ' <link rel="stylesheet" href="./static/css/contract.css"/>'; // 生成pdf的外部css样式
            document.body.innerHTML = document.querySelector(ele).outerHTML;

            // window.print();

            // 转异步 等待dom元素渲染（样式）完毕在打印
            setTimeout(() => {
                // 打印
                window.print();
                // 刷新页面
                window.location.reload();
            }, 20);

        },
        goBack() {
          window.location.href="/#/download-ticket";
        },
        handleDown() {
            htmlToPdf.downloadPDF(document.querySelector('#demo'), '准考证');
        }
    },
    filters: {
        formatDate: function(value) {
            let date = new Date(value);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? '0' + MM : MM;
            let d = date.getDate();
            d = d < 10 ? '0' + d : d;
            let h = date.getHours();
            h = h < 10 ? '0' + h : h;
            let m = date.getMinutes();
            m = m < 10 ? '0' + m : m;
            let s = date.getSeconds();
            s = s < 10 ? '0' + s : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        }
    }
};
</script>

<style scoped>
#demo {
    background-color: #fff;
    width: 1000px;
    /* height: 400px; */
    margin: auto;
    padding: 40px;
    box-sizing: border-box;
}

.table_style td,
th {
    padding: 10px;
    font-size: 15px;
}

.table_style {
    border-collapse: collapse;
    width: 100%;
    text-align: center;
}
</style>

