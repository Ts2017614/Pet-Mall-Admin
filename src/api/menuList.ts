import request from "../utils/request";
import { menuListType, tableItem, formType } from "@/type/menuList";
// 分页列表
export const menuList = (isAdminOfPet = "admin", query: menuListType) => {
  return request({
    url: `/api/${isAdminOfPet}/customer-page`,
    method: "get",
    params: {
      ...query
    }
  });
};
// 新增
export const add = (isAdminOfPet = "admin", query: formType) => {
  return request({
    url: `/api/${isAdminOfPet}/create`,
    method: "post",
    data: {
      ...query
    }
  });
};
// 编辑
export const edit = (isAdminOfPet = "admin", query: formType) => {
  return request({
    url: `/api/${isAdminOfPet}/update/${query._id}`,
    method: "patch",
    data: {
      ...query
    }
  });
};
// 详情
export const detail = (isAdminOfPet = "admin", id:string) => {
  return request({
    url: `/api/${isAdminOfPet}/detail/${id}`,
    method: "get",
  });
};
// 删除
export const del = (isAdminOfPet = "admin", id:string) => {
  return request({
    url: `/api/${isAdminOfPet}/remove/${id}`,
    method: "delete",
  });
};
// tree数据
export const treeList = (isAdminOfPet = "admin") => {
  return request({
    url: `/api/${isAdminOfPet}/list`,
    method: "get",
  });
};
