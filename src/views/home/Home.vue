<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div class="header-info">
        <img src="../../assets/img/ball11.png" alt="" />
        <span> 热血体育馆场地管理系统 </span>
      </div>
      <el-button class="logout">退出</el-button>
    </el-header>
    <!-- 容器 -->
    <el-container>
      <!-- 侧边导航 -->
      <el-aside width="200px">
        <el-menu
          default-active="2"
          @open="handleOpen"
          @close="handleClose"
          background-color="#008080"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>
<style  lang="less"  scoped>
.el-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  height: 60px;
  background-color: #4e72b8;
  .header-info {
    height: 100%;
    img {
      height: 100%;
      vertical-align: top;
      margin-right: 30px;
    }
    span {
      font-size: 22px;
      font-weight: 800;
      line-height: 60px;
      color: #eaedf1;
    }
  }
  .logout {
    height: 40px;
    margin-top: 10px;
    font-weight: 700;
  }
}
.el-aside {
  background-color: 		#008080;
}
.el-main {
  background-color: #eaedf1;
}
</style>