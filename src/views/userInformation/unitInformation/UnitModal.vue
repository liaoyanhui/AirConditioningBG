<!--
 * @Descripttion: 新增或编辑单位 弹窗
 * @version: 
 * @Author: shang xia
 * @Date: 2021-04-01 18:47:12
 * @LastEditors: shang xia
 * @LastEditTime: 2021-04-01 19:14:09
-->

<template>
    <div>
        <el-dialog
            :title="type === 1 ? '新增单位' : '修改单位'"
            :visible.sync="visible"
            width="550px"
            :before-close="handleModalCancel">
            <el-form :model="unitForm" ref="unitFormRef" label-width="100px">
                <el-form-item
                    prop="unitName"
                    label="单位名称"
                    :rules="rules.unitName"
                >
                    <el-input v-model="unitForm.unitName"></el-input>
                </el-form-item>
                <el-form-item
                    prop="address"
                    label="地址"
                    :rules="rules.address"
                >
                    <el-input v-model="unitForm.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleModalCancel">取 消</el-button>
                <el-button type="primary" @click="handleSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'UnitModal',
        props: ['type', 'visible', 'handleCancel', 'handleOk', 'unitData'],
        data() {
            return {
                unitForm: {
                    unitName: '',
                    address: '',
                },
                rules: {
                    unitName: [
                        { required: true, message: '请输入单位名称', trigger: 'blur' },
                    ],
                    address: { required: true, message: '请输入地址', trigger: 'blur' },
                },
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
                        this.handleOk()
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
        },

        mounted() {

        }
    }
</script>

