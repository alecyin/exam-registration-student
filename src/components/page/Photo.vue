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
                    <el-tabs type="border-card">
                        <el-tab-pane label="个人免冠照">
                                <img
                                    style="padding: 5px;width:40%;"
                                    :src="'http://47.105.93.192/api/photo/' + userPic.idCardPic + '?n=' + Math.random()"
                                />
                                <div class="tip">只能上传jpg文件，且不超过2mb</div>
                                <el-upload
                                    ref="upload1"
                                    action="http://47.105.93.192/api/students/upload/1"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-upload="beforeUpload"
                                    :auto-upload="false"
                                    :limit="1"
                                    :on-success="uploadSuccess1"
                                    :on-error="uploadError"
                                    :headers="authHeader"
                                >
                                    <el-button
                                        style="float:left;margin-left: 10px;"
                                        slot="trigger"
                                        size="small"
                                        type="primary"
                                    >选取文件</el-button>
                                    <el-button
                                        style="float:right;margin-right: 60%;"
                                        size="small"
                                        type="success"
                                        @click="submitUpload(1)"
                                    >保存</el-button>
                                </el-upload>
                        </el-tab-pane>
                        <el-tab-pane label="手持身份证照片">
                                <img
                                    style="padding: 5px;"
                                    :src="'http://47.105.93.192/api/photo/' + userPic.profilePic + '?n=' + Math.random()"
                                />
                                <div class="tip">只能上传jpg文件，且不超过2mb</div>
                                <el-upload
                                    ref="upload2"
                                    action="http://47.105.93.192/api/students/upload/2"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-upload="beforeUpload"
                                    :auto-upload="false"
                                    :limit="1"
                                    :on-success="uploadSuccess2"
                                    :on-error="uploadError"
                                    :headers="authHeader"
                                >
                                    <el-button
                                        style="float:left;margin-left: 10px;"
                                        slot="trigger"
                                        size="small"
                                        type="primary"
                                    >选取文件</el-button>
                                    <el-button
                                        style="float:right;margin-right: 60%;"
                                        size="small"
                                        type="success"
                                        @click="submitUpload(2)"
                                    >保存</el-button>
                                </el-upload>
                        </el-tab-pane>
                        <el-tab-pane label="省准考证照片">
                                <img
                                    style="padding: 5px;"
                                    :src="'http://47.105.93.192/api/photo/' + userPic.provincialExamineePic + '?n=' + Math.random()"
                                />
                                <div class="tip">只能上传jpg文件，且不超过2mb</div>
                                <el-upload
                                    ref="upload3"
                                    action="http://47.105.93.192/api/students/upload/3"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-upload="beforeUpload"
                                    :auto-upload="false"
                                    :limit="1"
                                    :on-success="uploadSuccess3"
                                    :on-error="uploadError"
                                    :headers="authHeader"
                                >
                                    <el-button
                                        style="float:left;margin-left: 10px;"
                                        slot="trigger"
                                        size="small"
                                        type="primary"
                                    >选取文件</el-button>
                                    <el-button
                                        style="float:right;margin-right: 60%;"
                                        size="small"
                                        type="success"
                                        @click="submitUpload(3)"
                                    >保存</el-button>
                                </el-upload>
                        </el-tab-pane>
                    </el-tabs>
                    <el-row type="flex" justify="space-between">
                        <el-col :span="7">
                            
                        </el-col>
                        <el-col :span="7">
                            
                        </el-col>
                        <el-col :span="7">
                            
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import auth from '../../auth/auth';
import { getUserPic } from '../../api/user';
const mode = 'students';
var token = auth.getToken();
export default {
    name: 'student',
    data() {
        return {
            userPic: {
                "idCardPic": "default.jpg",
                "profilePic": "default.jpg",
                "provincialExamineePic": "default.jpg"
            },
            editVisible: false,
            form: {},
            select: {},
            authHeader: {
                Authorization: token
            }
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
            getUserPic(idCardNumberInfo)
                .then(res => {
                    this.userPic = res.data[0];
                    this.$forceUpdate();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        submitUpload(type) {
            if (type === 1) {
                this.$refs.upload1.submit();
            } else if (type === 2) {
                this.$refs.upload2.submit();
            } else if (type === 3) {
                this.$refs.upload3.submit();
            }
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        uploadSuccess1(response, file, fileList) {
            this.$message.success('上传成功');
            this.$refs.upload1.clearFiles();
            this.getData();
        },
        uploadSuccess2(response, file, fileList) {
            this.$message.success('上传成功');
            this.$refs.upload2.clearFiles();
            this.getData();
        },
        uploadSuccess3(response, file, fileList) {
            this.$message.success('上传成功');
            this.$refs.upload3.clearFiles();
            this.getData();
        },
        uploadError(err, file, fileList) {
            this.$message.error('上传失败');
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
.tip {
    text-align: center;
    padding-bottom: 10px;
    color: red;
    width: 30%;
}
</style>
