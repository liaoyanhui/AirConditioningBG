<!--
 * @Descripttion: 单位删除
 * @version: 
 * @Author: shang xia
 * @Date: 2021-04-01 18:17:17
 * @LastEditors: shang xia
 * @LastEditTime: 2021-04-01 18:42:58
-->

<template>
    <div>
        <el-dialog
            title="删除单位"
            :visible.sync="visible"
            width="300px"
            :before-close="handleCancel">
            <span>确定要删除该单位?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'UnitDelModal',
    props: ['handleCancel', 'visible', 'handleOk'],
    data() {
        return {
            
        }
    }
}
</script>
