<!--
 * @Descripttion: 
 * @version: 
 * @Author: shang xia
 * @Date: 2021-04-01 10:27:30
 * @LastEditors: shang xia
 * @LastEditTime: 2021-04-08 14:13:58
-->
<template>
 <div class="app-container">
    <div class="filter-container">
      <div class="filter-list">
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
          <el-button class="btn" type="primary" @click="handleAddUnit">
            <i class="el-icon-plus" />
            新增单位
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
      <el-table-column label="单位名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
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
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page="page" :limit="limit" @pagination="getTableList"/>
    <UnitModal :visible="visible" :type="modalType" :handleCancel="handleUnitCancel" :handleOk="handleUnitOk" :unitData="unitData"/>
    <UnitDelModal :visible="delVisible" :handleCancel="handleDelCancel" :handleOk="handleDelOk" />
  </div>
</template>

<script>
import { getOrganList } from '@/api/api'
import pagination from '@/components/Pagination';
import UnitDelModal from './UnitDelModal.vue';
import UnitModal from './UnitModal.vue';

export default {
  data() {
    return {
      list: null,
      listLoading: false,
      total: 0,
      page: 1, // 第几页
      limit: 10, // 一页有多少条数

      delVisible: false,
      unitName: '',
      unitId: '',

      visible: false,
      modalType: 1,
      unitData: {},
    }
  },
   components: {
    UnitDelModal,
    UnitModal,
    pagination
  },
  created() {
    this.fetchData()
  },
  methods: {
    getTableList() {},
    fetchData() {
      this.listLoading = true
      getOrganList({organId: ''}).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleQuery() {},
    handleReset() {},
    
    handleAddUnit() {
      this.modalType = 1;
      this.visible = true;
    },
    handleChange(id) {
      this.unitId = id;
      this.modalType = 2;
      this.visible = true;
      this.unitData = {
        unitName: '公司名称',
        address: '公司地址',
      }
    },

    handleUnitCancel() {
      this.visible = false;
      this.modalType = 1;
      this.unitId = '';
      this.unitData = {};
    },
    handleUnitOk() {},

    handleDelete(id) {
      this.unitId = id;
      this.delVisible = true;
    },

    handleDelCancel() {
      this.unitId = '';
      this.delVisible = false;
    },
    handleDelOk() {
      this.unitId = '';
      this.delVisible = false;
    }
  }
}
</script>
