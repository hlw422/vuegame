<template>
    <div>
      <!-- 通过子组件自定义属性传递值、方法 -->
      <Child :value="doc" @func="sayHello" />
      <button @click="sayHello(doc)">父组件按钮</button>

  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue'
  import Child from './Child.vue'

  // 待传递的值
  const doc = ref('hello');
  
  // 待传递的方法
  const sayHello = function (data) {
    alert(data);
  }
  </script>
  