<template>
    <div class="all">
        <el-form ref="ruleForm" :model="form" label-width="80px" :rules="rules">
<!--              多选框            -->
            <el-form-item label="所属分类">
                <el-select v-model="form.categoryId" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
<!--         输入框-->
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入内容"></el-input>
            </el-form-item>
<!--            图片框-->
            <el-form-item label="缩略图" >
                <el-upload
                        class="upload-demo"
                        :data="qiniuForm"
                        :before-upload="beforeUpload"
                        :on-success="uploadSuccess"
                        action="https://upload.qiniup.com/"
                        >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
<!--            单价-->
            <el-form-item label="单价" prop="name">
                <el-input v-model="form.price" placeholder="请输入内容"></el-input>
            </el-form-item>
<!--            库存-->
            <el-form-item label="库存" prop="name">
                <el-input v-model="form.stock" placeholder="请输入内容"></el-input>
            </el-form-item>
<!--            商品描述-->
            <el-form-item label="描述" prop="name">
<!--                <el-input v-model="form.body" placeholder="请输入内容"></el-input>-->

                    <vue-simplemde v-model="form.body" ref="markdownEditor" />

            </el-form-item>
<!--            提交按钮-->
            <el-form-item>
                <router-link to="/product">
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                </router-link>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

    </div>

</template>

<script>

    import { v4 as uuidv4 } from 'uuid';
    import VueSimplemde from 'vue-simplemde'

    export default {
        components: {
            VueSimplemde
        },
        data(){
            return{
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 1, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                },
                form:{

                },
                options:[],
                value: {
                    name:'',
                    categoryId:''
                },
                qiniuForm:{
                    key:'',
                    token:''
                }
            }
        },
        created() {
            this.axios.get("http://localhost:3000/admin/categories").then(res=>{
                this.options = res.data.categories
                console.log(this.options)
            })
        },

        methods:{

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post('http://localhost:3000/admin/products',this.form).then(res=>{
                            console.log(this.form)
                            this.$message.success('创建商品成功');
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            async beforeUpload(file){
                console.log(file)
                const isJPG = file.type === 'image/jpeg'||file.type === 'jpg/png'
                const isLt2M = file.size /1024 / 1024 < 2
                if(!isJPG){
                    this.$message.error('上传图片只能是JPG3或者PNG格式')
                }
                if(!isLt2M){
                    this.$message.error('上传图片必须小于2M')
                }

                // 验证成功就获取token值
                let fileType = file.type == 'image/jpeg' ? 'jpg' : 'png'
                let res = await this.axios.get("http://localhost:3000/admin/photos/uploadToken")
                    this.qiniuForm = {
                        key:`${uuidv4()}.${fileType}`,
                        token:res.data.data.token
                    };
                    return true;
            },
            // 验证成功
            uploadSuccess(res,file){
                this.form.image = 'http://qc2qvpt3o.bkt.clouddn.com/'+ res.key
            }
        }

    }
</script>

<style>
    @import '~simplemde/dist/simplemde.min.css';
</style>