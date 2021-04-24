<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>场地信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 顶部搜索区域 -->
      <el-row>
        <el-col> </el-col>
      </el-row>
      <!-- 场地信息表格 -->
      <el-table :data="groundList" border style="width: 100%" stripe>
        <el-table-column type="expand" label="查看预约情况" width="180"></el-table-column>
        <el-table-column prop="groundName" label="场地名称" width="180">
        </el-table-column>
        <el-table-column prop="price" label="每小时价格" width="180">
        </el-table-column>
        <el-table-column prop="status" label="当前状态">
          <template v-slot="scoped">
            <el-tag v-if="(scoped.row.status = 1)" type="success">空闲</el-tag>
            <el-tag v-else type="danger">禁止使用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scoped">
            {{ scoped.row }}
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      groundList: [],
    }
  },
  created() {
    this.getGroundList()
  },
  methods: {
    getGroundList() {
      this.$http({ url: 'api/get/ground' }).then((res) => {
        console.log(res)
        this.groundList = res.data.ground
      })
    },
  },
}
</script>
<style scoped>
</style>