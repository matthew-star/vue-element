<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="pass">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
            <el-input type="" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button >重置</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
    export default {
      data(){
          return{
              ruleForm:{},
              rules:{}
          }
      },
        methods:{
            submitForm(){
                this.axios.post('http://localhost:3000/admin/users/login',this.ruleForm).then((res)=>{
                    console.log(res)
                 if(!res.data.success){
                     return this.$message.error(res.data.message)
                 }
                    this.$message.success(res.data.message)
                    localStorage.token_type = 'Bearer'
                    localStorage.access_token = res.data.token
                    this.$router.push({name:'Home'})
                })


            }
        }
    }
</script>