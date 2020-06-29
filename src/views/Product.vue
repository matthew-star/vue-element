<template>
    <div class="product">

                <!--            行内表单-->
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item >
                        <router-link to="/addproduct">
                        <el-button type="success" @click="open">新增</el-button>
                        </router-link>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="danger" @click="deleteAll">删除</el-button>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="success">导出</el-button>
                    </el-form-item>
                    <el-form-item label="所有分类">
                        <el-select v-model="value.categoryId"  placeholder="请选择" @change="changecategory">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品">
                        <el-input v-model="value.name" placeholder="请输入内容" value="value.name"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="warning" icon="el-icon-search" @click="search">搜索</el-button>
                    </el-form-item>
                </el-form>
            <template>
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="id"
                            label="id"
                           >
                    </el-table-column>
                    <el-table-column
                            prop="categoryId"
                            label="分类"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="名称"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="图片"
                           >
                        <template slot-scope="scope"><img :src="scope.row.image" style="width: 100px;"/></template>
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="价格"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="sale"
                            label="是否售出"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="stock"
                            label="库存"
                            >
                    </el-table-column>
                    <el-table-column label="操作" width="150">
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
            </template>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="page.total"
                    :page-size="page.pageSize"
                    @current-change="pagechange">
            </el-pagination>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                formInline: {
                    user: '',
                    region: ''
                },
                tableData: [],
                multipleSelection: [],
                options: [],
                value: {
                    name:'',
                    categoryId:''
                },
                page:{
                    currentPage: 1,
                    pageSize: 0,
                    total: 0
                },
                checked:[]
            }

        },
        created() {
            this.open()
            this.axios.get('http://localhost:3000/admin/categories').then(res=>{
                // console.log(res)
                this.options = res.data.categories
                // console.log(this.options )
            })
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            open(){
                this.axios.get(`http://localhost:3000/admin/products?currentPage=${this.page.currentPage}&categoryId=${this.value.categoryId}`).then(res=>{
                    console.log(res)
                    this.tableData = res.data.products
                    const {pagination} = res.data
                    this.page={
                        currentPage:pagination.currentPage,
                        pageSize:pagination.pageSize,
                        total:pagination.total
                    }
            })
            },
            handleSelectionChange(val) {
                console.log(val)
                this.checked = val.map(item=>{
                    return item.id
                });
            },
            handleDelete(id){
                this.axios.delete(`http://localhost:3000/admin/products/${id}`).then(res=>{
                    this.open()
                })

            },
            pagechange(val){
                console.log(val)
                this.page.currentPage = val
                this.open()
            },
            changecategory(){
                this.open()
            },
            search(){
                this.axios.get(`http://localhost:3000/admin/products?name=${this.value.name}`).then(res=>{
                    console.log(res)
                    this.tableData = res.data.products
                    // this.open()

                })

            },
          deleteAll(){
              this.axios.post('http://localhost:3000/admin/products/delete_checked',{checked_id:this.checked}).then(res=>{
                  this.open()
              })
          }
        }
    }
</script>
<style lang="scss">
    .one{
        /*display: flex;*/
    }
</style>