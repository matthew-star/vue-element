<template>
  <div>
    <div class="index">
      <div class="button">
        <div class="one"> <el-button type="success" @click="open">新增</el-button></div>
        <div class="one"> <el-button type="success">导出</el-button></div>
      </div>
      <template>

      </template>
    </div>
    <el-table
            :data="tableData"
            style="width: 100%">
      <el-table-column
              prop="id"
              label="id"
              width="180">
      </el-table-column>
      <el-table-column
              prop="name"
              label="名字"
              width="180">
      </el-table-column>
      <el-table-column
              prop="sort"
              label="序号"
              width="180">
      </el-table-column>
<!--      操作按钮-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--        新增弹出框-->
    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            @close="textclear"
           >
      <span>

        <el-form :model="form" label-width="80px" :rules="rules" ref="addformRef">
  <el-form-item label="商品名称" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
          <el-form-item label="商品序号" prop="sort">
    <el-input v-model="form.sort"></el-input>
  </el-form-item>
        </el-form>

      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialog">确 定</el-button>
  </span>
    </el-dialog>

<!--    编辑弹出框-->
    <el-dialog
            title="提示"
            :visible.sync="edit"
            width="30%"
            @close="textclear"
    >
      <span>

        <el-form :model="eddform" label-width="80px" :rules="rules" ref="addformRef">
  <el-form-item label="商品名称" prop="name">
    <el-input v-model="eddform.name"></el-input>
  </el-form-item>
          <el-form-item label="商品序号" prop="sort">
    <el-input v-model="eddform.sort"></el-input>
  </el-form-item>
        </el-form>

      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="edit = false">取 消</el-button>
    <el-button type="primary" @click="conform(eddform.id)">确 定</el-button>
  </span>
    </el-dialog>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        eddform:{name:'',sort:'',id:''},
        tableData: [],
        dialogVisible:false,
        edit:false,
        form:{name:'',sort:''},
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
        }

    };
    },
    created() {
      this.getchange()
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      textclear(){
        this.$refs.addformRef.resetFields()
      },
      getchange(){
        this.axios.get('http://localhost:3000/admin/categories').then(res=>{
          // console.log(res)
          this.tableData = res.data.categories
        })
      },

      handleDelete(id){
        this.axios.delete(`http://localhost:3000/admin/categories/${id}`).then(res=>{
          this.getchange()
        })
      },
      open() {

        this.dialogVisible = true
      },
      dialog() {
        this.axios.post('http://localhost:3000/admin/categories',this.form).then(res=>{
            // console.log(res)
          this.dialogVisible = false
          this.getchange()
        })

      },
      handleEdit(id){
        this.edit = true
        this.axios.get(`http://localhost:3000/admin/categories/${id}`).then(res=>{
          // console.log(res);
          let eddform = res.data.category
        this.eddform = eddform
        })
      },

      conform(id) {
        console.log(id)
        this.axios.put(`http://localhost:3000/admin/categories/${id}`,this.eddform).then(res=>{
          // console.log(res)
          this.edit = false
          this.getchange()
        })

      },
    }
  }
</script>