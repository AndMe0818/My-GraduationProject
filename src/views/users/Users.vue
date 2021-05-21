// 用户管理
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 头部搜索区域 -->
      <!-- 搜索框 区域 -->
      <el-row :gutter="20" class="search">
        <el-col :span="9">
          <el-input
            v-model="queryInfo.info"
            placeholder="请输入用户名查找内容"
            class="input-with-select"
            clearable
            @clear="getUserList"
          >
            <el-button
              @click="getUserList"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表  :data="tableData" -->
      <el-table stripe border :data="userInfo" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="email" label="用户邮箱" width="260" />
        <el-table-column prop="role" label="用户角色" >
          <template v-slot="scoped">
            {{ scoped.row.role == 'admin' ? '管理员' : '普通用户' }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="用户状态" >
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.state"
              @change="userStateChange(scoped.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- 用户操作栏 -->
        <el-table-column
          prop="address"
          label="操作"
          v-if="roleShow === 'admin' ? true : false"
        >
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
      <!-- 底部分页 区域 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!--添加用户的 弹出提示框 -->
    <el-dialog
      title="添加用户"
      @close="addDialogClosed"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <!-- 内容主体区 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="addForm.state" placeholder="请选择">
            <el-option
              v-for="item in stateList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户权限">
          <el-select v-model="addForm.role" placeholder="请选择">
            <el-option
              v-for="item in roleList"
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
        <el-button type="primary" @click="addUser"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的 弹出提示框 -->
    <el-dialog
      title="修改用户"
      @close="editDialogClosed"
      :visible.sync="editDialogVisible"
      width="50%"
    >
      <!-- 内容主体区 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="role">
          <el-select v-model="editForm.role" placeholder="请选择">
            <el-option
              v-for="item in roleList"
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
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo"> 确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    return {
      // 获取列表请求参数
      queryInfo: {
        // 根据query查询
        info: '',
        // 当前页数
        pagenum: 1,
        // 每页数据个数
        pagesize: 5,
      },
      // 添加用户 表单
      addForm: {
        username: '',
        password: '',
        state: '',
        email: '',
        role: '',
      },
      // 用户编辑 表单参数
      editForm: {},
      // 用户信息
      userInfo: [],
      // 总数：
      total: 0,
      // 添加弹出框
      addDialogVisible: false,
      // 修改弹出框
      editDialogVisible: false,
      // 添加用户 表单验证规则
      addFormRules: {
        username: [
          { required: true, message: '请用户名称', trigger: 'blur' },
          {
            min: 3,
            max: 5,
            message: '用户名长度在 3 到 5 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '密码长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        role: [
          { required: true, message: '请输入用户权限', trigger: 'blur' },
          {
            min: 3,
            max: 5,
            message: '用户名权限在 3 到 5 个字符',
            trigger: 'blur',
          },
        ],
      },
      // 用户编辑表单验证
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        role: [
          { required: true, message: '请输入用户权限', trigger: 'blur' },
          {
            min: 3,
            max: 5,
            message: '用户名权限在 3 到 5 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '密码长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
      // 删除的id
      id: '',
      // 下拉框
      roleList: [
        {
          value: 'normal',
          label: '普通用户',
        },
        {
          value: 'admin',
          label: '管理员',
        },
      ],
      stateList: [
        {
          value: true,
          label: '启用',
        },
        {
          value: false,
          label: '未启用',
        },
      ],
      roleValue: '',
      roleShow: '',
    }
  },
  created() {
    this.roleShow = window.sessionStorage.getItem('role')
    this.getUserList()
  },
  methods: {
    // 获取用户列表
    getUserList() {
      this.$http({
        url: '/api/user/getUserList',
        // method: 'get',
        params: this.queryInfo,
      }).then((res) => {
        console.log(res)
        this.userInfo = res.data.users
        this.total = res.data.total
        // console.log(this.userInfo);
      })
    },
    // 处理展示条数变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 处理翻页
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 处理用户状态
    userStateChange(userInfo) {
      console.log(userInfo)
    },
    // 用户修改
    showEditDialog(id) {
      this.editDialogVisible = true
      this.$http({ url: '/api/user/getUser', params: { id: id } }).then(
        (res) => {
          this.editForm = res.data.user
        }
      )
    },
    // 关闭修改框
    editDialogClosed() {
      this.$refs.editFormRef.clearValidate()
    },
    // 点击确定 修改用户信息
    editUserInfo() {
      this.$http({
        url: '/api/user/updateUser',
        method: 'post',
        data: this.editForm,
      }).then((res) => {
        console.log(res)
        if (res.meta.status === 201) {
          this.editDialogVisible = false
          this.getUserList()
        }
      })
    },
    // 点击确定按钮添加用户
    addUser() {
      this.$http({
        url: '/api/user/addUser',
        method: 'post',
        data: this.addForm,
      }).then((res) => {
        console.log(res)
        ;(this.addDialogVisible = false), this.getUserList()
      })
    },
    // 监听 添加用户对话框关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 删除用户
    removeUserByID(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          this.$http({
            url: '/api/user/deleteUser',
            method: 'post',
            data: { id: id },
          }).then((res) => {
            console.log(res)
            this.getUserList()
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
  },
}
</script>
<style scoped>
.search {
  margin-bottom: 15px;
}
</style>