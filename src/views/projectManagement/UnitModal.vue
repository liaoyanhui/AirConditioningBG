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
                            prop="productName"
                            label="项目名称"
                            :rules="rules.prodctName"
                        >
                            <el-input v-model="unitForm.prodctName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            prop="sort"
                            label="排序"
                            :rules="rules.sort"
                        >
                            <el-input type="number" v-model="unitForm.sort"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item
                            prop="longitude"
                            label="经度"
                            :rules="rules.longitude"
                        >
                            <el-input v-model="unitForm.longitude" @focus="onSearch"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                       <el-form-item
                            prop="latitude"
                            label="纬度"
                            :rules="rules.latitude"
                        >
                            <el-input v-model="unitForm.latitude" @focus="onSearch"></el-input>
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
                111
                <addressSelection :storeLocation="storeLocation" v-on:point="point"></addressSelection>
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
                    prodctName: '',
                    sort: 1,
                    longitude: 1.12,
                    latitude: 1.3,
                    provinces: '',
                    city: '',
                    description: '',
                    remark: ''
                },
                rules: {
                    prodctName: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' },
                    ],
                    sort: { required: true, message: '请输入排序方式', trigger: 'blur' },
                    longitude: { required: true, message: '请输入经度', trigger: 'blur' },
                    latitude: { required: true, message: '请输入纬度', trigger: 'blur' },
                    provinces: { required: true, message: '请输入省份', trigger: 'blur' },
                    city: { required: true, message: '请输入排序所在市', trigger: 'blur' },
                    description: {},
                    remark: {},
                },
                mapVisible: false,
                storeLocation:[]
            }
        },
        watch: {
            type: {
                immediate: true,
                handler(val) {
                    if(val === 2) {
                        this.unitForm = {
                            ...this.unitForm,
                            ...this.unitData
                        }
                    }
                }
            }
        },
        methods: {
            handleSure() {
                 this.$refs['unitFormRef'].validate((valid) => {
                    if (valid) {
                        this.handleOk(this.unitForm)
                    } else {
                        return false;
                    }
                });
                console.log(this.unitForm, 'unitForm')
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
            point(e){
		    	console.log(e)
		    	this.storeLocation=[e.lng,e.lat]
		    }
        },

        components: {
            addressSelection
        }
    }
</script>

