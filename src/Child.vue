<template>
    <div>
      <!-- 使用父组件传递过来的值 -->
      <h1>{{ props.value }}</h1>
      <el-button plain @click="dialogVisible = true">
    Click to open the Dialog
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handelClick">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
    </div>
  </template>
  <script setup>
  // 从 vue 中引入defineProps, defineEmits
  import { defineProps, defineEmits } from 'vue'

  import { ref } from 'vue'
  
  // 接收父组件传递过来的值
  const props = defineProps(['value'])
  const dialogVisible = ref(false)
  // 接收父组件传递过来的方法
  const emit = defineEmits(['func'])
  
  const handelClick = function  () {
      //调用父组件传递过来的方法，传入参数修改父组件的值 
      emit('func', 'confirm')
      // 关闭弹窗
      dialogVisible.value = false
  }
  </script> 
  