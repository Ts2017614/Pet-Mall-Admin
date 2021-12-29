<template>
  <div class="icon-body">
    <el-input
      v-model="keyword"
      style="position: relative"
      clearable
      placeholder="请输入图标名称"
    >
    </el-input>
    <div class="icon-list">
      <div
        v-for="(item, index) in list"
        :key="index"
        @click="selectedIcon(item)"
      >
        <i
          :class="`el-icon-lx-${item}`"
          style="
            height: 30px;
            width: 16px;
            line-height: 30px;
            vertical-align: super;
          "
        ></i>
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const emit = defineEmits(["selected"]);
const iconList = [
  "attentionforbid",
  "attentionforbidfill",
  "attention",
  "attentionfill",
  "tag",
  "tagfill",
  "people",
  "peoplefill",
  "notice",
  "noticefill",
  "mobile",
  "mobilefill",
  "voice",
  "voicefill",
  "unlock",
  "lock",
  "home",
  "homefill",
  "delete",
  "deletefill",
  "notification",
  "notificationfill",
  "notificationforbidfill",
  "like",
  "likefill",
  "comment",
  "commentfill",
  "camera",
  "camerafill",
  "warn",
  "warnfill",
  "time",
  "timefill",
  "location",
  "locationfill",
  "favor",
  "favorfill",
  "skin",
  "skinfill",
  "news",
  "newsfill",
  "record",
  "recordfill",
  "emoji",
  "emojifill",
  "message",
  "messagefill",
  "goods",
  "goodsfill",
  "crown",
  "crownfill",
  "move",
  "add",
  "hot",
  "hotfill",
  "service",
  "servicefill",
  "present",
  "presentfill",
  "pic",
  "picfill",
  "rank",
  "rankfill",
  "male",
  "female",
  "down",
  "top",
  "recharge",
  "rechargefill",
  "forward",
  "forwardfill",
  "info",
  "infofill",
  "redpacket",
  "redpacket_fill",
  "roundadd",
  "roundaddfill",
  "friendadd",
  "friendaddfill",
  "cart",
  "cartfill",
  "more",
  "moreandroid",
  "back",
  "right",
  "shop",
  "shopfill",
  "question",
  "questionfill",
  "roundclose",
  "roundclosefill",
  "roundcheck",
  "roundcheckfill",
  "global",
  "mail",
  "punch",
  "exit",
  "upload",
  "read",
  "file",
  "link",
  "full",
  "group",
  "friend",
  "profile",
  "addressbook",
  "calendar",
  "text",
  "copy",
  "share",
  "wifi",
  "vipcard",
  "weibo",
  "remind",
  "refresh",
  "filter",
  "settings",
  "scan",
  "qrcode",
  "cascades",
  "apps",
  "sort",
  "searchlist",
  "search",
  "edit"
];
const keyword = ref("");
const list = computed(() => {
  return iconList.filter((item) => {
    return item.indexOf(keyword.value) !== -1;
  });
});
const selectedIcon = (item: string) => {
  emit("selected", item);

  document.body.onclick = function () {
    console.log(123);
  };
};
</script>
<style lang="scss" scoped>
.icon-body {
  width: 100%;
  padding: 10px;
  .icon-list {
    height: 200px;
    overflow-y: scroll;
    div {
      height: 30px;
      line-height: 30px;
      margin-bottom: -5px;
      cursor: pointer;
      width: 33%;
      float: left;
    }
    span {
      display: inline-block;
      vertical-align: -0.15em;
      line-height: 30px;
      fill: currentColor;
      overflow: hidden;
    }
  }
}
</style>
