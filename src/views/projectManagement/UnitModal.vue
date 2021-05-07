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
            :before-close="handleModalCancel">
            <el-form :model="unitForm" ref="unitFormRef" label-position="top" size="small">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item
                            prop="projectName"
                            label="项目名称"
                            :rules="rules.projectName"
                        >
                            <el-input v-model="unitForm.projectName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            prop="sortNo"
                            label="排序"
                            :rules="rules.sortNo"
                        >
                            <el-input type="number" v-model="unitForm.sortNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item
                            prop="lng"
                            label="经度"
                            :rules="rules.lng"
                        >
                            <el-input v-model="unitForm.lng" @focus="onSearch"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                       <el-form-item
                            prop="lat"
                            label="纬度"
                            :rules="rules.lat"
                        >
                            <el-input v-model="unitForm.lat" @focus="onSearch"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item
                            prop="provinces"
                            label="省"
                            :rules="rules.provinces"
                        >
                            <el-input v-model="unitForm.provinces"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            prop="city"
                            label="市"
                            :rules="rules.city"
                        >
                            <el-input v-model="unitForm.city"></el-input>
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
                            <el-input v-model="unitForm.description" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            prop="remark"
                            label="备注"
                            
                            :rules="rules.remark"
                        >
                            <el-input v-model="unitForm.remark" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleModalCancel">取 消</el-button>
                <el-button type="primary" @click="handleSure">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            :visible="mapVisible"
             width="550px"
            :before-close="onClose"
        >

            <div>
                <addressSelection :storeLocation="storeLocation" v-on:handelPoint="point" ></addressSelection>
            </div>
            
        </el-dialog>
    </div>
</template>

<script>
    import addressSelection from './map';
    export default {
        name: 'UnitModal',
        props: ['type', 'visible', 'handleCancel', 'handleOk', 'unitData'],
        data() {
            return {
                unitForm: {
                    projectName: '',
                    sort: 1,
                    lng: '',
                    lat: '',
                    provinces: '',
                    city: '',
                    description: '',
                    remark: '',
                    modalType:　1
                },
                rules: {
                    projectName: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' },
                    ]
                },
                mapVisible: false,
                storeLocation:[]
            }
        },
        watch: {
            type: {
                immediate: true,
                handler(val) {
                    console.log(val, 'ssdfsdfsdfsdf')
                    if(val === 2) {
                        this.unitForm = {
                            ...this.unitForm,
                            ...this.unitData
                        }

                        console.log(this.unitForm, 'jjssss')
                    }
                }
            }
        },
        methods: {
            handleSure() {
                 this.$refs['unitFormRef'].validate((valid) => {
                     console.log(valid, 'sdfsdfsdfsdfsdf')
                    if (valid) {
                        console.log('wocaonima!!!')
                        this.handleOk(this.unitForm);
                        this.$refs['unitFormRef'].resetFields();
                    } else {
                        return false;
                    }
                });
            },
            handleModalCancel() {
                this.$refs['unitFormRef'].resetFields();
                this.handleCancel()
            },
            onSearch(e){
                console.log('aiyyy')
				this.mapVisible = true
			    console.log(e);
            },
            onClose(){
		      	this.mapVisible = false;
		    },
            handleMapOk(e){
		        this.mapVisible = false;
		    },
            point(pointData){
                console.log(pointData, 'ndaole');
                this.mapVisible = false;
                this.unitForm = { ...this.unitForm, lng: pointData.lng, lat: pointData.lat };
		    }
        },

        components: {
            addressSelection
        }
    }
</script>

