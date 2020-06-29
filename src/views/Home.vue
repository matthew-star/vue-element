<template>
 <div>
 <el-container>
  <el-header>
   <el-menu
           class="el-menu-demo"
           mode="horizontal"
           background-color="blanchedalmond"
           text-color="#fff"
           active-text-color="#ffd04b" router>

    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
   </el-menu>
  </el-header>
  <el-container>
   <el-aside>
    <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b" router>
     <el-submenu index="1">
      <template slot="title">
       <i class="el-icon-location"></i>
       <span>后台管理</span>
      </template>
      <el-menu-item-group>
       <el-menu-item index="/about">商品分类
       </el-menu-item>
       <el-menu-item index="/product">商品明细</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
       <el-menu-item index="1-3">商品管理</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
       <template slot="title">商品管理</template>
       <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
     </el-submenu>

     <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
     </el-menu-item>
    </el-menu>

   </el-aside>

   <el-main><router-view></router-view></el-main>
  </el-container>

 </el-container>
 </div>
</template>



<script></script>

<style>

</style>