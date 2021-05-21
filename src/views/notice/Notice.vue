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
      <el-row class="search">
        <el-col :span="6">
          <el-input
            v-model="title"
            placeholder="请输入标题查询公告内容"
          ></el-input>
        </el-col>
        <el-col :span="3"><el-button>搜索</el-button></el-col>
        <el-col :span="6"
          ><el-button type="primary">查看最新公告</el-button></el-col
        >
      </el-row>
      <!-- 表格 -->
      <el-table :data="noticeList" border style="width: 100%" stripe>
        <!-- 查看预约 -->
        <el-table-column type="expand" label="查看公告内容" width="180px">
          <template v-slot="scoped">
            {{ scoped.row.content }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="公告标题"> </el-table-column>
        <el-table-column prop="time" label="发布时间"> </el-table-column>
        <!-- 公告操作栏 -->
        <el-table-column prop="address" label="操作" width="180px">
          <template v-slot="slotscope">
            <!-- 修改 -->
            <el-tooltip
              :enterable="false"
              class="item"
              effect="dark"
              content="修改"
              placement="top"
            >
              <el-button
                @click="showEditDialog(slotscope.row._id)"
                type="primary"
                icon="el-icon-edit"
                size="mini"
              />
            </el-tooltip>
            <!-- 删除 -->
            <el-tooltip
              :enterable="false"
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                @click="removeUserByID(slotscope.row._id)"
                type="danger"
                icon="el-icon-delete"
                size="mini"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Course from '../../components/corse/Course.vue'
export default {
  components: { Course },
  data() {
    return {
      noticeList: [
        {
          title: '5月18日闭馆',
          time: '20210516',
          content:
            '由于要进行馆内设施更新升级，决定5月20日闭馆，希望各位游客们能够得知，给各位带来的不便造成了困扰，抱歉！',
        },
        {
          title: '4月20日新设备引入',
          time: '20210420',
          content: '由于要进行馆内设施更新升级，决定5月20日闭馆',
        },
        {
          title: '4月15日正常运营',
          time: '20210413',
          content: '由于要进行馆内设施更新升级，决定5月20日闭馆',
        },
        {
          title: '3月20日闭馆',
          time: '20210318',
          content: '由于要进行馆内设施更新升级，决定5月20日闭馆',
        },
      ],
      title: '',
    }
  },
  created() {},
  methods: {
    // 修改
    showEditDialog(id) {},
    // 删除
    removeUserByID(id) {},
  },
}
</script>
<style scoped>
.search {
  margin-bottom: 15px;
}
</style>