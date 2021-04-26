// 场地公告
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>场地公告</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <course></course>
    </el-card>
  </div>
</template>

<script>

import Course from '../../components/corse/Course.vue'
export default {
  components: { Course,},
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>
<style scoped>
</style>