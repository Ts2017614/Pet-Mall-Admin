<template>
  <div class="content">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-copy"></i> 权限/菜单列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 内容 -->
    <div class="container">
      <div class="handle-box">
        <div class="btn">
          <el-button
            @click="addEdit()"
            class="add-button"
            type="primary"
            icon="el-icon-plus"
            >新增</el-button
          >
        </div>
        <div>
          <el-button
            @click="getDataList"
            type="primary"
            icon="el-icon-lx-refresh"
            circle
          ></el-button>
        </div>
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
          <template #default="scope">
            {{ $filter.formatTime(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新日期" align="center">
          <template #default="scope">
            {{ $filter.formatTime(scope.row.updatedAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="addEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              @confirm="handleDelete(scope.$index, scope.row)"
              title="Are you sure to delete this?"
            >
              <template #reference>
                <el-button type="text" icon="el-icon-delete" class="red"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <Pagination
          @changeSize="changeSize"
          @changeCurrent="changeCurrent"
          :page="page"
        />
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
          v-if="form.type?.toString() == '1'"
          prop="router"
          label="组件路径"
        >
          <el-input v-model="form.router"></el-input>
        </el-form-item>
        <el-form-item prop="parentId" label="上级目录">
          <el-popover placement="bottom-start" trigger="click" :width="450">
            <el-tree
              :data="data"
              :props="defaultProps"
              @node-click="handleNodeClick"
            />
            <template #reference>
              <el-input
                clearable
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
          <el-button type="primary" @click="addConfig">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue";
import { ElMessageBox, ElForm, ElMessage } from "element-plus";
import Config from "@/settings";
// 类型
import { pageItem } from "@/components/pagination/type";
import { addRules } from "./verify";
import { tableItem, formType } from "@/type/menuList";

// 接口
import { menuList, add, detail, edit, del, treeList } from "@/api/menuList";
// 组件
import IconSelect from "@/components/IconSelect/IconSelect.vue";
import Pagination from "@/components/pagination/index.vue";

//NOTE:生命周期
onMounted(() => {
  getDataList();
  getTreeList();
});
// NOTE:声明变量
const tableData = ref<tableItem[]>([]); //表格
const dialogVisible = ref<boolean>(false); //弹窗
const menuForm = ref<InstanceType<typeof ElForm>>(); //表单ref
const form = ref<formType>({
  _id: null,
  name: "",
  url: "",
  router: "",
  type: 0,
  icon: "",
  parentId: null,
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
  total: null,
  current: 1
});
// NOTE:声明方法
// 列表数据,分页
const getDataList = () => {
  let { current, size } = page.value;
  menuList(Config.isPetsMenu, { current, size }).then((res) => {
    tableData.value = res.data.data;
    page.value.total = res.data.total;
  });
};
// 上级tree数据
const getTreeList = () => {
  treeList(Config.isPetsMenu).then((res) => {
    data.value = res.data;
  });
};
// 关闭弹窗
const handleClose = (done: () => void) => {
  done();
};
// 新增，编辑展示
const addEdit = (index?: number | string, row?: any) => {
  if (!row) {
    menuForm.value?.resetFields();
    form.value.parentIdName = "";
    form.value._id = null;
  } else {
    detail(Config.isPetsMenu, row._id).then((res) => {
      for (const key in form.value) {
        for (const keys in res.data) {
          if (key == keys) {
            (form.value as any)[key] = res.data[key];
          }
        }
      }
      console.log(form.value);
    });
  }
  dialogVisible.value = true;
};
// 新增,编辑确认
const addConfig = () => {
  menuForm.value?.validate((valid) => {
    if (valid) {
      if (!form.value.parentId) form.value.parentId = "0";
      console.log(form.value._id);
      // return false;
      const addIsEdit = form.value._id ? edit : add;
      addIsEdit(Config.isPetsMenu, form.value).then((res) => {
        dialogVisible.value = false;
        ElMessage.success("成功-success");
        getDataList();
      });
    }
  });
};
// 删除
const handleDelete = (index: number | string, row: any) => {
  del(Config.isPetsMenu, row._id).then((res) => {
    ElMessage.warning("删除成功");
    getDataList();
  });
};
// 选中图标
const selected = (item: string) => {
  form.value.icon = item;
};
//选择上级目录
const handleNodeClick = (item: any) => {
  console.log(item);
  form.value.parentIdName = item.name;
  form.value.parentId = item.parentId;
};
// 分页器：改变条数
const changeSize = (val: number) => {
  page.value.size = val;
  getDataList();
};
// 分页器：改变页数
const changeCurrent = (val: number) => {
  page.value.current = val;
  getDataList();
};
</script>
<script lang="ts">
export default {
  name: "menuList"
};
</script>
<style lang="scss" scoped>
.handle-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
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
