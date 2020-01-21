<template>
    <div>
        <div class="title-div">
            <el-row :gutter="20">
                <el-col :span="4" :offset="4">
                    <h1 class="title">照片上传</h1>
                </el-col>
            </el-row>
        </div>
        <div class="content-div">
            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                    <div class="tip">只能上传jpg/png文件，且不超过500kb</div>
                    <el-row type="flex" justify="space-between">
                        <el-col :span="6">
                            <el-card :body-style="{ padding: '0px' }">
                                <div style="padding: 14px;">
                                    <strong>个人免冠照</strong>
                                </div>
                                <img
                                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                    class="image"
                                />
                                <el-upload
                                    class="upload-demo"
                                    ref="upload"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="fileList"
                                    :auto-upload="false"
                                >
                                    <el-button style="float:left;margin-left: 10px;" slot="trigger" size="small" type="primary">选取文件</el-button>
                                    <el-button
                                        style="float:right;margin-right: 10px;"
                                        size="small"
                                        type="success"
                                        @click="submitUpload"
                                    >保存</el-button>
                                </el-upload>
                            </el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-card :body-style="{ padding: '0px' }">
                                <div style="padding: 14px;">
                                    <strong>手持身份证照片</strong>
                                </div>
                                <img
                                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                    class="image"
                                />
                                <el-button type="text" class="button">操作按钮</el-button>
                            </el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-card :body-style="{ padding: '0px' }">
                                <div style="padding: 14px;">
                                    <strong>省准考证照片</strong>
                                </div>
                                <img
                                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                    class="image"
                                />
                                <el-button type="text" class="button">操作按钮</el-button>
                            </el-card>
                        </el-col>
                    </el-row>
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
                    <v-distpicker
                        :province="select.province"
                        :city="select.city"
                        :area="select.area"
                        @selected="onSelected"
                    ></v-distpicker>
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
import VDistpicker from 'v-distpicker';
import { getUserInfo } from '../../api/user';
const mode = 'students';
export default {
    name: 'student',
    data() {
        return {
            userInfo: {},
            editVisible: false,
            form: {},
            select: {},
            fileList: [
                {
                    name: 'food.jpeg',
                    url:
                        'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                },
                {
                    name: 'food2.jpeg',
                    url:
                        'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }
            ]
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
            getUserInfo(idCardNumberInfo)
                .then(res => {
                    this.userInfo = res.data[0];
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleEdit() {
            this.form = Object.assign({}, this.userInfo);
            let area = this.userInfo.address.split('|', 4);
            this.form.address = area.slice(0, 3).join('|');
            console.log(area);
            this.select = {
                province: area[0],
                city: area[1],
                area: area[2]
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
            editData({ mode, form })
                .then(() => {
                    this.$message.success(`修改成功`);
                    this.userInfo = this.form;
                    localStorage.setItem('ms_username', form.name);
                })
                .catch(() => {
                    this.$message.error(`保存失败`);
                });
        },
        onSelected(data) {
            this.form.address = data.province.value + '|' + data.city.value + '|' + data.area.value;
        },
        change(e) {
            this.$forceUpdate();
            console.log(this.form.specific);
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
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
.image {
    padding: 5px;
    display: block;
}
.tip {
    text-align: center;
    padding-bottom: 10px;
    color: red;
}
</style>
