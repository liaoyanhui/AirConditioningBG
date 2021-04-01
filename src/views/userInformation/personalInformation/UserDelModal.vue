<!--
 * @Descripttion: 人员删除
 * @version: 
 * @Author: shang xia
 * @Date: 2021-04-01 18:17:17
 * @LastEditors: shang xia
 * @LastEditTime: 2021-04-01 18:29:55
-->

<template>
    <div>
        <el-dialog
            title="删除用户"
            :visible.sync="visible"
            width="300px"
            :before-close="handleCancel">
            <span>确定要删除该用户?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'UserDelModal',
    props: ['handleCancel', 'visible', 'handleOk'],
    data() {
        return {
            
        }
    }
}
</script>
