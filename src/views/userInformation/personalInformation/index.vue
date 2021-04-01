<!--
 * @Descripttion: 
 * @version: 
 * @Author: shang xia
 * @Date: 2021-04-01 10:27:16
 * @LastEditors: shang xia
 * @LastEditTime: 2021-04-01 18:46:45
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-list">
        <div class="filter">
          <span>用户名:</span>
          <el-input v-model="userName" placeholder="账户" @keyup.enter.native="handleQuery"/>
        </div>
        <div class="filter">
          <span>手机号:</span>
          <el-input v-model="phoneNumber" placeholder="手机号" @keyup.enter.native="handleQuery"/>
        </div>
        <div class="filter">
          <span>用户类型:</span>
          <el-select v-model="type" placeholder="请选择" clearable>
            <el-option v-for="item in userType" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </div>
        <div class="filter">
          <span>单位名称:</span>
          <el-input v-model="unitName" placeholder="单位名称" @keyup.enter.native="handleQuery"/>
        </div>
      </div>
       <div class="filter-btn">
          <el-button class="btn" type="primary" @click="handleQuery">
            <i class="el-icon-search" />
            查询
          </el-button>
          <el-button class="btn" type="primary" @click="handleAddUser">
            <i class="el-icon-plus" />
            新增用户
          </el-button>
        </div>
    </div>
    <el-table
      v-loading="listLoading"
      class="components-tabeList"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
       <el-table-column label="用户类型" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
        <el-table-column label="用户状态" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
        <el-table-column label="单位名称" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
        <el-table-column label="注册时间" align="center">
       <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
        <el-table-column label="操作" align="center"  width="180">
        <template slot-scope="scope">
          <el-button
            @click="handleChange(scope.row.$index)"
            type="text">修改</el-button>
           <el-button
            @click="handleDelete(scope.row.$index)"
            type="text">删除</el-button>
           <el-button
            @click="handlePermis(scope.row.$index)"
            type="text">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page="page" :limit="limit" @pagination="getTableList"/>
    <UserModal :visible="visible" :type="modalType" :handleCancel="handleUserCancel" :handleOk="handleUserOk" :userData="userData"/>
    <UserDelModal :visible="delVisible" :handleCancel="handleDelCancel" :handleOk="handleDelOk" />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import UserModal from './UserModa.vue';
import UserDelModal from './UserDelModal.vue';
import pagination from '@/components/Pagination';

export default {
  data() {
    return {
      list: null,
      listLoading: false,
      total: 0,
      page: 1, // 第几页
      limit: 10, // 一页有多少条数

      userId: '', // 需要被操作的用户id
      userName: '',
      phoneNumber: '',
      userType: [],
      type: '',
      unitName: '',
      visible: false,
      modalType: 1,
      userData: {},

      delVisible: false,
    }
  },
  components: {
    UserModal,
    UserDelModal,
    pagination
  },
  created() {
    this.fetchData()
  },
  methods: {
    getTableList() {},
    fetchData() {
      this.listLoading = true
      getList({limit: 10}).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },

    handleQuery() {},
    handleAddUser() {
      this.modalType = 1;
      this.visible = true;

    },
    handleChange(userId) {
      this.userId = userId;
      this.modalType = 2;
      this.userData = {
        userName: '刘成宝是傻逼',
        password: 'lcbsb',
        userType: '0',
        phoneNumber: '110',
        email: '2@qq.com',
        unitName: '警察学院'
      }
      this.visible = true;
    },
    
    handleDelete(userId) {
      this.userId = userId;
      this.delVisible = true;
    },
    handlePermis(userId) {},
 
    // 新增/编辑用户弹窗 取消
    handleUserCancel() {
      this.visible = false;
    },

    // 新增/编辑用户弹窗 确定
    handleUserOk() {},

    // 取消删除
    handleDelCancel() {
      this.userId = '';
      this.delVisible = false;
    },

    // 确定删除
    handleDelOk(userId) {
      this.userId = '';
      this.delVisible = false;
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.fn-span {
  
}
</style>

