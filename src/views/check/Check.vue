// 日志页面
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工作日志</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 顶部搜索 -->
      <el-row class="search">
        <el-col :span="6">
          <el-date-picker
            v-model="checkdate"
            type="date"
            value-format="yyyyMMdd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="3"><el-button>搜索</el-button></el-col>
      </el-row>
      <el-table :data="checkList" border style="width: 100%" stripe>
        <!-- 查看预约 -->
        <el-table-column
          prop="uid.username"
          label="用户名"
          width="180px"
        ></el-table-column>

        <el-table-column prop="gid.gType" label="场地类型"> </el-table-column>
        <el-table-column prop="gid.gNo" label="场地编号"> </el-table-column>
        <el-table-column prop="date" label="预约时间"> </el-table-column>
        <el-table-column prop="type" label="预约场次">
          <template v-slot='scoped'>
            {{scoped.row.type | typeFilter }}
          </template>
        </el-table-column>

        <!-- 公告操作栏 -->
        <el-table-column prop="address" label="操作" width="180px">
          <template v-slot="slotscope">
            <!-- 取消预约 -->
            <el-tooltip
              :enterable="false"
              class="item"
              effect="dark"
              content="取消预约"
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
export default {
  components: {},
  data() {
    return {
      // 搜索时间
      // 搜索框
      checkdate: '',
      time: 0,
      checkList: [
        // {
        //   uname: 'Admin',
        //   gType: '乒乓球场',
        //   gNo: 1,
        //   date: 20210517,
        //   type: '上午',
        // },
        // {
        //   uname: 'Admin',
        //   gType: '乒乓球场',
        //   gNo: 1,
        //   date: 20210517,
        //   type: '晚上',
        // },
      ],
    }
  },
  filters: {
    typeFilter(type) {
      let text
      switch (type) {
        case 0:
          text = '上午'
          break
        case 1:
          text = '下午'
          break
        case 2:
          text = '晚上'
          break
      }
      return text
    },
  },
  created() {
    this.getCheckList()
 
  },
  methods: {
    getCheckList() {
      let uid = window.sessionStorage.getItem('_id')
      this.$http({
        url: '/api/check/getCheckList',
        method: 'post',
        data: { uid: uid, date: this.checkList },
      }).then((res) => {
        if (res.meta.status === 200) {
          this.checkList = res.data.checkList
        }
      })
    },
  },
}
</script>
<style scoped>
</style>