<template>
  <div class>
    <el-pagination
      :page-sizes="page?.sizes"
      :page-size.sync="page?.size"
      :total="page?.total"
      :current-page.sync="page?.current"
      style="margin-top: 8px"
      layout="total, prev, pager, next, sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, PropType } from "vue";
import { pageItem } from "./type";
const emit = defineEmits(["changeSize", "changeCurrent"])
const props = defineProps({
  page: {
    type: Object as PropType<pageItem>,
    required: true
  }
});
const handleSizeChange = (val: number) => {
  console.log("size", typeof val);
  emit("changeSize", val);
};
const handleCurrentChange = (val: number) => {
  console.log("current", typeof val);
  emit("changeCurrent", val);
};
</script>
<style lang="scss" scoped></style>
