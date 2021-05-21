<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>场地信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="tip">体育馆提示:上午场是8-12点,下午场是14-17点,晚上场是18-21点</div>
      <!-- 顶部搜索区域 -->
      <el-row class="search">
        <el-col :span="6">
          <el-select
            v-model="type"
            filterable
            allow-create
            default-first-option
            clearable
            placeholder="请选择场地类型"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button @click="getGroundList" type="primary" icon="el-icon-search"
            >搜索场地类型</el-button
          >
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addDialogVisible = true"
            >添加场地</el-button
          >
        </el-col>
      </el-row>
      <!-- 场地信息表格 -->
      <el-table :data="groundList" border style="width: 100%" stripe>
        <!-- 查看预约 -->
        <el-table-column label="查看预约情况" width="180">
          <template v-slot="scoped">
            <el-button @click="showCheckDialog(scoped.row._id)">预约</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="gType" label="场地类型" width="180">
        </el-table-column>
        <el-table-column prop="gNo" label="场地编号" width="180">
        </el-table-column>
        <el-table-column prop="gPrice" label="每小时价格" width="180">
        </el-table-column>
        <el-table-column prop="status" label="当前状态">
          <template v-slot="scoped">
            <el-tag v-if="(scoped.row.gState = true)" type="success"
              >空闲</el-tag
            >
            <el-tag v-else type="danger">禁止使用</el-tag>
          </template>
        </el-table-column>
        <!-- 场地操作栏 -->
        <el-table-column prop="address" label="操作">
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
    <!-- 预约功能   弹出提示框 -->
    <el-dialog
      title="查看今日预约"
      @close="checkDialogClosed"
      :visible.sync="checkDialogVisible"
      width="50%"
    >
      <el-row>
        <el-col :span="6">
          <el-select v-model="dateType" clearable placeholder="请选择预约时间">
            <el-option
              v-for="item in dateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="bookGround"
            >确定预约</el-button
          ></el-col
        >
      </el-row>
      <!-- 预约情况表 -->
      <el-table :data="checkList">
        <el-table-column prop="uid.username" label="用户名称" width="180">
        </el-table-column>
        <el-table-column prop="type" label="预约场次" width="180">
          <template v-slot="scoped">
            {{ scoped.row.type | typeFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="gid.gType" label="场地类型" width="180">
        </el-table-column>
        <el-table-column prop="gid.gNo" label="场地编号" width="180">
        </el-table-column>
      </el-table>
      <!-- 内容主体区 -->
      <el-form ref="checkFormRef" label-width="80px"> </el-form>
      <!-- 底部按钮区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!-- 添加场地功能  -->
    <el-dialog
      title="添加场地"
      @close="addDialogClosed"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <!-- 内容主体区 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="120px"
      >
        <el-form-item label="场地类型" prop="gType">
          <el-input v-model="addForm.gType"></el-input>
        </el-form-item>
        <el-form-item label="场地编号" prop="gNo">
          <el-input v-model.number="addForm.gNo"></el-input>
        </el-form-item>
        <el-form-item label="每小时价格" prop="gPrice">
          <el-input v-model.number="addForm.gPrice"></el-input>
        </el-form-item>
        <el-form-item label="场地状态">
          <el-select v-model="addForm.gState" placeholder="请选择">
            <el-option
              v-for="item in stateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGround"> 确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import '../../utils/dateFormat'
export default {
  components: {},
  data() {
    return {
      // 数据列表
      groundList: [],
      // 总数
      total: 0,
      // 场地类型
      type: '',
      // 场地类型列表
      typeList: [
        {
          value: '乒乓球',
          label: '乒乓球',
        },
        {
          value: '篮球',
          label: '篮球',
        },
        {
          value: '羽毛球',
          label: '羽毛球',
        },
        {
          value: '排球',
          label: '排球',
        },
      ],
      // 预约框
      checkDialogVisible: false,
      // 当天时间
      date: 0,
      // 预约情况表
      checkList: [],
      // 已预约过的时间列表
      checktype: [],
      // 下拉选择时间
      dateList: [
        { value: 0, label: '上午', disabled: false },
        { value: 1, label: '下午', disabled: false },
        { value: 2, label: '晚上', disabled: false },
      ],
      // 选择的预约时间
      dateType: 0,
      // 添加弹框控制
      addDialogVisible: false,
      // 场地添加表
      addForm: {
        gType: '',
        gNo: '',
        gPrice: '',
        gState: '',
      },
      // 场地添加验证
      addFormRules: {
        gType: [
          { required: true, message: '请场地类型', trigger: 'blur' },
          {
            min: 2,
            max: 8,
            message: '场地类型在 2 到 8 个字符',
            trigger: 'blur',
          },
        ],
        gNo: [
          { required: true, message: '请输入场地编号', trigger: 'blur' },
          {
            type: 'number',
            min: 1,
            message: '请正确场地编号',
            trigger: 'blur',
          },
        ],
        gPrice: [
          { required: true, message: '请输入场地小时价格', trigger: 'blur' },
          { type: 'number', min: 1, message: '请正确的价格', trigger: 'blur' },
        ],
      },
      // 场地状态下拉框
      stateList: [
        {
          value: true,
          label: '空闲',
        },
        {
          value: false,
          label: '占用',
        },
      ],
      checkGid: '',
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
    this.getGroundList()
    this.date = new Date().Format('yyyyMMdd')
    console.log(this.date)
  },
  methods: {
    // 获取列表
    getGroundList() {
      this.$http({
        url: '/api/ground/getGroundList',
        params: { type: this.type },
      }).then((res) => {
        console.log(res)
        this.groundList = res.data.grounds
      })
    },
    // 点击预约按钮 显示提示框
    showCheckDialog(id) {
      this.checkGid = id
      this.checkDialogVisible = true
      this.$http({
        url: '/api/ground/checkGround',
        method: 'post',
        data: { gid: id, date: this.date },
      }).then((res) => {
        this.checkList = res.data.checkList
        console.log(this.checkList)
        this.checkList.forEach((item, index, array) => {
          this.checktype.push(item.type)
        })
        // 排除 以出现的 时间选项
        for (let i = 0; i < this.checktype.length; i++) {
          let index = this.checktype[i]
          this.dateList[index].disabled = true
        }
      })
      console.log(id)
    },
    // 关闭 预约弹框
    checkDialogClosed() {
      this.checktype = []
      this.dateList.forEach((item, index, array) => {
        item.disabled = false
      })
    },
    // 预约场地
    bookGround() {
      let gid = this.checkGid
      let uid = window.sessionStorage.getItem('_id')
      let date = this.date
      let type = this.dateType
      this.$http({
        url: '/api/check/bookGround',
        method: 'post',
        data: { gid, uid, date, type },
      }).then((res) => {
        if(res.meta.status==204){
          this.showCheckDialog(gid)
        }
        console.log(res);
      })
    },
    // 添加场地
    addGround() {
      this.$http({
        url: '/api/ground/addGround',
        method: 'post',
        data: this.addForm,
      }).then((res) => {
        console.log(res)
        if (res.meta.status == 201) {
          this.addDialogClosed()
          this.getGroundList()
        }
      })
    },
    // 关闭添加框
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
      this.addDialogVisible = false
    },
  },
}
</script>
<style scoped>
.search {
  margin-bottom: 15px;
}
.tip{
  margin-bottom: 15px;
  font-size: 18px;
}
</style>