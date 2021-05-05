<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div class="header-info">
        <img src="../../assets/img/ball11.png" alt="" />
        <span> 热血体育馆场地管理系统 </span>
      </div>
      <!-- 头部用户区域 -->
      <el-dropdown>
        <el-button type="primary">
          用户名称12<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <el-button class="logout">退出</el-button> -->
    </el-header>
    <!-- 容器 -->
    <el-container>
      <!-- 侧边导航 -->
      <!-- 折叠展开区 -->

      <el-aside :width="isToggle ? '64px' : '200px'">
        <div class="toggle-button" @click="toogleCollapse">
          <div v-if="isToggle" class="el-icon-d-arrow-right"></div>
          <div v-else class="el-icon-d-arrow-left"></div>
        </div>
        <!-- 菜单路由区域 -->
        <el-menu
          router
          :collapse="isToggle"
          default-active="1"
          background-color="#3a3d46"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse-transition="false"
        >
      
          <el-menu-item index="notice">
            <i class="el-icon-menu"></i>
            <span slot="title">管内公告</span>
          </el-menu-item>
          <el-menu-item index="ground">
            <i class="el-icon-menu"></i>
            <span slot="title">场地信息</span>
          </el-menu-item>
          <el-menu-item index="shop">
            <i class="el-icon-menu"></i>
            <span slot="title">场内商品</span>
          </el-menu-item>
          <el-menu-item index="users">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="date">
            <i class="el-icon-menu"></i>
            <span slot="title">工作日志</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isToggle: false,
      menuList: [
        { index: 'notice', title: '管内公告' },
        { index: 'ground', title: '场地信息' },
        { index: 'shop', title: '场内商品' },
        { index: 'users', title: '用户管理' },
        { index: 'date', title: '工作日志' },
      ],
    }
  },
  created() {
    // this.getUserList()
  },
  methods: {
    // getUserList() {
    //   this.$http({ url: 'api/get/users' }).then((res) => {
    //     console.log(res)
    //   })
    // },

    toogleCollapse() {
      this.isToggle = !this.isToggle
    },
  },
}
</script>
<style  lang="less"  scoped>
.el-container {
  height: 100%;
  overflow: auto;
}
.el-header {
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  height: 60px;
  background-color: #3b4354;
  .header-info {
    height: 100%;
    img {
      height: 100%;
      vertical-align: top;
      margin-right: 30px;
      background-color: tomato;
      border-radius: 50%;
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
  .el-dropdown {
    margin-top: 10px;
  }
}
.el-aside {
  background-color: rgb(58, 61, 70);
  .el-menu {
    border: none;
    margin-right: 10px;
    .el-menu-item {
      margin-bottom: 10px;
      box-shadow: 7px 4px 8px 2px #333;
    }
    .el-menu-item:hover {
      background-color: #364c7b;
    }
  }
  .toggle-button {
    width: 100%;
    height: 40px;
    color: #fff;
    background-image: linear-gradient(to right, #40547d, #364c7b);
    text-align: center;
    margin-bottom: 5px;
    > div {
      margin: 3px auto;
      width: 60px;
      height: 33px;
      line-height: 40px;
      box-shadow: 3px 2px 6px 1px #333;
      cursor: pointer;
    }
  }
}
.el-main {
  background-color: #eaedf1;
}
</style>