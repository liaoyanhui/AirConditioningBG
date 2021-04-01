<!--
 * @Descripttion: 
 * @version: 
 * @Author: shang xia
 * @Date: 2021-04-01 18:31:14
 * @LastEditors: shang xia
 * @LastEditTime: 2021-04-01 18:32:50
-->

<template>
    <div>
        <el-dialog
            title="权限配置"
            :visible.sync="visible"
            width="400px"
            :before-close="handleCancel">
            <span>权限</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'PermisModal',
    props: ['handleCancel', 'visible', 'handleOk'],
    data() {
        return {
            
        }
    }
}
</script>
