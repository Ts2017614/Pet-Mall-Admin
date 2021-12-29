<template>
  <div class="">
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
const props = defineProps({
  page: {
    type: Object as PropType<pageItem>,
    required: true
  }
});
const handleSizeChange = (val: number) => {
  console.log("size", typeof val);
};
const handleCurrentChange = (val: number) => {
  console.log("current", typeof val);
};
</script>
<style lang="scss" scoped></style>
