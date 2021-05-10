<!--
 * @Descripttion: 新增或编辑单位 弹窗
 * @version:
 * @Author: shang xia
 * @Date: 2021-04-01 18:47:12
 * @LastEditors: shang xia
 * @LastEditTime: 2021-04-12 16:20:12
-->

<template>
  <div>
    <el-dialog
      :title="type === 1 ? '新增单位' : '修改单位'"
      :visible.sync="visible"
      width="550px"
      :before-close="handleModalCancel"
    >
      <el-form
        ref="unitFormRef"
        :model="unitForm"
        label-position="top"
        size="small"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              prop="projectName"
              label="项目名称"
              :rules="rules.projectName"
            >
              <el-input v-model="unitForm.projectName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="sortNo" label="排序" :rules="rules.sortNo">
              <el-input v-model="unitForm.sortNo" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item prop="lng" label="经度" :rules="rules.lng">
              <el-input v-model="unitForm.lng" @focus="onSearch" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="lat" label="纬度" :rules="rules.lat">
              <el-input v-model="unitForm.lat" @focus="onSearch" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item prop="provinces" label="省" :rules="rules.provinces">
              <!-- <el-input v-model="unitForm.provinces" /> -->
              <el-select
                v-model="unitForm.areaId"
                filterable
                placeholder="请选择"
                @change="proviceChange"
                style="width: '200px' !important"
              >
                <el-option
                  v-for="item in provicesOptions"
                  :key="item.areaId"
                  :label="item.areaName"
                  :value="item.areaId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="city" label="市" :rules="rules.city">
              <el-select
                v-model="unitForm.city"
                filterable
                placeholder="请选择"
                @change="proviceChange"
                style="width: '100%'"
              >
                <el-option
                  v-for="item in childAreaOptions"
                  :key="item.areaId"
                  :label="item.areaName"
                  :value="item.areaId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              prop="description"
              label="描述"
              :rules="rules.description"
            >
              <el-input v-model="unitForm.description" type="textarea" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="remark" label="备注" :rules="rules.remark">
              <el-input v-model="unitForm.remark" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleModalCancel">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible="mapVisible" width="550px" :before-close="onClose">
      <div>
        <addressSelection
          :store-location="storeLocation"
          @handelPoint="point"
        />
      </div>
    </el-dialog>
  </div>
</template>

<style>
.el-select {
  width: 100% !important;
}
</style>

<script>
import addressSelection from "./map";
export default {
  name: "UnitModal",

  components: {
    addressSelection
  },
  props: ["type", "visible", "handleCancel", "handleOk", "unitData"],
  data() {
    return {
      provicesOptions: [],
      childAreaOptions: [],
      unitForm: {
        projectName: "",
        sort: 1,
        lng: "",
        lat: "",
        provinces: "",
        city: "",
        description: "",
        remark: "",
        modalType: 1
      },
      rules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ]
      },
      mapVisible: false,
      storeLocation: []
    };
  },
  created() {
    this.getPrivice();
  },
  watch: {
    type: {
      immediate: true,
      handler(val) {
        if (val === 2) {
          this.unitForm = {
            ...this.unitForm,
            ...this.unitData
          };
        }
      }
    }
  },
  methods: {
    getPrivice() {
      this.$store.dispatch("userInformation/getProviceList", {}).then(res => {
        this.provicesOptions = res;
      });
    },
    proviceChange(e) {
      this.$store
        .dispatch("userInformation/getChildAreaByAreaId", { areaId: e })
        .then(res => {
          this.childAreaOptions = res;
        });
    },
    handleSure() {
      this.$refs["unitFormRef"].validate(valid => {
        if (valid) {
          console.log("wocaonima!!!");
          this.handleOk(this.unitForm, () => {
            this.resetForm();
          });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["unitFormRef"].resetFields();
    },
    handleModalCancel() {
      this.$refs["unitFormRef"].resetFields();
      this.handleCancel();
    },
    onSearch(e) {
      console.log("aiyyy");
      this.mapVisible = true;
      console.log(e);
    },
    onClose() {
      this.mapVisible = false;
    },
    handleMapOk(e) {
      this.mapVisible = false;
    },
    point(pointData) {
      console.log(pointData, "ndaole");
      this.mapVisible = false;
      this.unitForm = {
        ...this.unitForm,
        lng: pointData.lng,
        lat: pointData.lat
      };
    }
  }
};
</script>
