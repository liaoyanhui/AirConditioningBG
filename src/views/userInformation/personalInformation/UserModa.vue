<!--
 * @Descripttion: 新增或编辑人员 弹窗
 * @version: 
 * @Author: shang xia
 * @Date: 2021-04-01 15:45:56
 * @LastEditors: shang xia
 * @LastEditTime: 2021-04-01 18:46:32
-->

<template>
    <div>
        <el-dialog
            :title="type === 1 ? '新增用户' : '修改用户'"
            :visible.sync="visible"
            width="550px"
            :before-close="handleModalCancel">
            <el-form :model="userForm" ref="userFormRef" label-width="100px">
                <el-form-item
                    prop="userName"
                    label="用户名"
                    :rules="rules.userName"
                >
                    <el-input v-model="userForm.userName" :disabled="type === 2 && true"></el-input>
                </el-form-item>
                <el-form-item
                    prop="password"
                    label="密码"
                    :rules="rules.password"
                >
                    <el-input v-model="userForm.password"></el-input>
                </el-form-item>
                <el-form-item
                    prop="userType"
                    label="用户类型"
                    :rules="rules.userType"
                >
                     <el-select v-model="userForm.userType" placeholder="请选择用户类型" clearable>
                        <el-option v-for="item in userTypeList" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="unitName"
                    label="单位名称"
                    :rules="rules.unitName"
                >
                     <el-select
                        v-model="userForm.unitName"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入单位名称关键词"
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="phoneNumber"
                    label="手机号"
                    :rules="rules.phoneNumber"
                >
                    <el-input v-model="userForm.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item
                    prop="email"
                    label="邮箱"
                    :rules="rules.email"
                >
                    <el-input v-model="userForm.email"></el-input>
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
        name: 'UserModal',
        props: ['type', 'visible', 'handleCancel', 'handleOk', 'userData'],
        data() {
            return {
                userTypeList: [
                    {value: '0', label: '刘成宝nc'},
                    {value: '1', label: '刘成宝sb'}
                ],
                userForm: {
                    userName: '',
                    password: '',
                    userType: '',
                    phoneNumber: '',
                    email: '',
                    unitName: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: { required: true, message: '请输入密码', trigger: 'blur' },
                    userType: { required: true, message: '请选择用户类型', trigger: 'blur' },
                    phoneNumber: { required: true, message: '请输入手机号', trigger: 'blur' },
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                },
                options: [],
                value: [],
                list: [],
                loading: false,
                states: ["Alabama", "Alaska", "Arizona",
                "Arkansas", "California", "Colorado",
                "Connecticut", "Delaware", "Florida",
                "Georgia", "Hawaii", "Idaho", "Illinois",
                "Indiana", "Iowa", "Kansas", "Kentucky",
                "Louisiana", "Maine", "Maryland",
                "Massachusetts", "Michigan", "Minnesota",
                "Mississippi", "Missouri", "Montana",
                "Nebraska", "Nevada", "New Hampshire",
                "New Jersey", "New Mexico", "New York",
                "North Carolina", "North Dakota", "Ohio",
                "Oklahoma", "Oregon", "Pennsylvania",
                "Rhode Island", "South Carolina",
                "South Dakota", "Tennessee", "Texas",
                "Utah", "Vermont", "Virginia",
                "Washington", "West Virginia", "Wisconsin",
                "Wyoming"]
            }
        },
        watch: {
            type: {
                immediate: true,
                handler(val) {
                    if(val === 2) {
                        this.userForm = {
                            ...this.userForm,
                            ...this.userData
                        }
                    }
                }
            }
        },
        methods: {
            handleSure() {
                 this.$refs['userFormRef'].validate((valid) => {
                    if (valid) {
                        this.handleOk()
                    } else {
                        return false;
                    }
                });
                console.log(this.userForm, 'userForm')
            },
            handleModalCancel() {
                this.$refs['userFormRef'].resetFields();
                this.handleCancel()
            },
            remoteMethod(query) {
                if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.options = this.list.filter(item => {
                    return item.label.toLowerCase()
                        .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
                } else {
                this.options = [];
                }
            }
        },

        mounted() {
            this.list = this.states.map(item => {
                return { value: `value:${item}`, label: `label:${item}` };
            });
        }
    }
</script>

