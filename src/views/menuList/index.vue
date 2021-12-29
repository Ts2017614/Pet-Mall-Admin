<template>
  <div class="content">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-copy"></i> 权限/菜单列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          @click="addEdit()"
          class="add-button"
          type="primary"
          icon="el-icon-plus"
          >新增</el-button
        >
        <el-input placeholder="菜单名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column
          prop="name"
          label="菜单标题"
          align="center"
        ></el-table-column>
        <el-table-column prop="icon" label="icon" align="center">
          <template #default="scope">
            <i :class="`el-icon-lx-${scope.row.icon}`"></i>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建日期" align="center">
          <template #default="scope">{{
            $filter.formatTime(scope.row.createdAt)
          }}</template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新日期" align="center">
          <template #default="scope">{{
            $filter.formatTime(scope.row.updatedAt)
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="addEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <Pagination :page="page" />
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      v-model="dialogVisible"
      title="Tips"
      width="580px"
      :before-close="handleClose"
    >
      <div style="margin: 20px"></div>
      <el-form
        ref="menuForm"
        :rules="addRules"
        label-width="100px"
        :model="form"
      >
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="form.type" size="small">
            <el-radio-button label="0">目录</el-radio-button>
            <el-radio-button label="1">菜单</el-radio-button>
            <el-radio-button label="2">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="icon" label="菜单图标">
          <el-popover placement="bottom-start" trigger="click" :width="450">
            <IconSelect @selected="selected" />
            <template #reference>
              <el-input
                readonly
                v-model="form.icon"
                placeholder="请选择图标"
                :prefix-icon="`el-icon-lx-${form.icon}`"
              ></el-input>
            </template>
          </el-popover>
        </el-form-item>
        <el-form-item prop="name" label="菜单标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="路由地址">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.type.toString() == '1'"
          prop="router"
          label="组件路径"
        >
          <el-input v-model="form.router"></el-input>
        </el-form-item>
        <el-form-item prop="parentIdName" label="上级目录">
          <el-popover placement="bottom-start" trigger="click" :width="450">
            <el-tree
              :data="data"
              :props="defaultProps"
              @node-click="handleNodeClick"
            />
            <template #reference>
              <el-input
                readonly
                v-model="form.parentIdName"
                placeholder="请选择上级目录"
              ></el-input>
            </template>
          </el-popover>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue";
import { ElMessageBox, ElForm } from "element-plus";
import Config from "@/settings";
// 类型
import { menuList } from "@/api/menuList";
import { addRules } from "./verify";
import { pageItem } from "@/components/pagination/type";
// 组件
import IconSelect from "@/components/IconSelect/IconSelect.vue";
import Pagination from "@/components/pagination/index.vue";

//NOTE:生命周期
onMounted(() => {
  menuList(Config.isPetsMenu, { current: 1, size: 10 }).then((res) => {
    tableData.value = res.data.data;
  });
});
// NOTE:声明变量
const tableData = ref([]); //表格
const dialogVisible = ref(false); //弹窗
const menuForm = ref<InstanceType<typeof ElForm>>(); //表单ref
const form = ref({
  name: "",
  url: "",
  router: "",
  type: 0,
  icon: "",
  parentId: "",
  parentIdName: ""
});
const defaultProps = {
  children: "children",
  label: "name"
};
const data = ref([
  {
    name: "Level one 1",
    parentId: 0,
    children: [
      {
        name: "Level two 2-1",
        parentId: 1,
        children: [
          {
            parentId: 11,
            name: "Level three 2-1-1"
          }
        ]
      },
      {
        name: "Level two 2-2",
        parentId: 2,
        children: [
          {
            name: "Level three 2-2-1"
          }
        ]
      }
    ]
  }
]);









const page = ref<pageItem>({
  size: 10,
  total: 1000,
  current: 1
});
// NOTE:声明方法
const handleClose = (done: () => void) => {
  done();
};
// 搜索
const handleSearch = () => {
  console.log("搜索");
};
// 新增
const addEdit = (index?: number | string, row?: any) => {
  if (!row) {
    menuForm.value?.resetFields();
  }
  dialogVisible.value = true;
};
// 删除
const handleDelete = (index: number | string, row: any) => {
  console.log(123);
};
// 选中图标
const selected = (item: string) => {
  form.value.icon = item;
};
//选择上级目录
const handleNodeClick = (item) => {
  console.log(item);
  form.value.parentIdName = item.name;
  form.value.parentId = item.id;
};
</script>
<script lang="ts">
export default {
  name: "menuList"
};
</script>
<style lang="scss" scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.add-button {
  margin-right: 10px;
}
</style>
