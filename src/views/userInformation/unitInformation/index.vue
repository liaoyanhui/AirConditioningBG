<!--
 * @Descripttion: 
 * @version: 
 * @Author: shang xia
 * @Date: 2021-04-01 10:27:30
 * @LastEditors: shang xia
 * @LastEditTime: 2021-04-12 17:35:04
-->
<template>
 <div class="app-container">
    <div class="filter-container">
      <div class="filter-list">
        <div class="filter">
          <span>单位名称:</span>
          <el-input v-model="organName" placeholder="单位名称" @keyup.enter.native="handleQuery"/>
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
          {{ scope.row.organName }}
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作" align="center"  width="180">
        <template slot-scope="scope">
          <el-button
            @click="handleChange(scope.row)"
            type="text">修改</el-button>
           <el-button
            @click="handleDelete(scope.row.organId)"
            type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="pagination.totleCount" :page="pagination.offset" :limit="pagination.max" @pagination="getTableList"/>
    <UnitModal :visible="visible" :type="modalType" :handleCancel="handleUnitCancel" :handleOk="handleUnitOk" :unitData="unitData"/>
    <UnitDelModal :visible="delVisible" :handleCancel="handleDelCancel" :handleOk="handleDelOk" />
  </div>
</template>

<script>
import pagination from '@/components/Pagination';
import UnitDelModal from './UnitDelModal.vue';
import UnitModal from './UnitModal.vue';

export default {
  data() {
    return {
      list: null,
      listLoading: false,
      pagination: {
        max: 10,
        offset: 1,
        totleCount: 0
      },
      
      delVisible: false,
      organName: '',
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
    this.fetchData({offset: 1, max: 10})
  },
  methods: {
    getTableList(pag) {
       const data = {
          offset: pag.page,
          max: pag.limit
        };
        this.fetchData(data)
    },
    fetchData(data) {
      this.listLoading = true
      this.$store.dispatch('userInformation/getUnitList', {...data}).then(res => {
        this.list = res.list;
        this.pagination = {
          max: res.max,
          offset: res.offset,
          totleCount: res.totleCount
        }
        this.listLoading = false;
      })
    },
    handleQuery() {
      this.fetchData({offset: 1, max: 10, organName: this.organName})
    },
    
    handleAddUnit() {
      this.modalType = 1;
      this.visible = true;
    },
    handleChange(data) {
      this.unitId = data.organId;
      this.modalType = 2;
      this.visible = true;
      this.unitData = {
        organName: data.organName,
        address: data.address,
      }
    },

    handleUnitCancel() {
      this.visible = false;
      this.modalType = 1;
      this.unitId = '';
      this.unitData = {};
    },
    handleUnitOk(data) {
      if(this.modalType === 1) {
        this.$store.dispatch('userInformation/addUnit', data).then(res => {
          this.$message({
            message: '新增单位成功！',
            type: 'success',
          });
          this.fetchData({offset: 1, max: 10})
          this.handleUnitCancel();
        })
      }else if(this.modalType === 2) {
        this.$store.dispatch('userInformation/updateUnit', {...data, organId: this.unitId}).then(res => {
          this.$message({
            message: '单位信息修改成功！',
            type: 'success',
          });
          this.fetchData({offset: this.pagination.offset, max: this.pagination.max})
          this.handleUnitCancel();
        })
      }
    },

    handleDelete(id) {
      this.unitId = id;
      this.delVisible = true;
    },

    handleDelCancel() {
      this.unitId = '';
      this.delVisible = false;
    },
    handleDelOk() {
      this.$store.dispatch('userInformation/deleteUnit', {organId: this.unitId}).then(res => {
        this.$message({
          message: '单位已成功删除',
          type: 'success',
        });
        this.unitId = '';
        this.delVisible = false;
      })
    }
  }
}
</script>
