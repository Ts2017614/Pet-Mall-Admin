import request from "../utils/request";
import { currentPageType } from "@/type";

export const fetchData = (query: any) => {
  return request({
    url: "./table.json",
    method: "get",
    params: query
  });
};
//分页列表
export const currentPage = (isAdminOfPet = "admin", query: currentPageType) => {
  return request({
    url: `/api/${isAdminOfPet}/customer-page`,
    method: "get",
    params: {
      ...query
    }
  });
};
// 新增
export const add = (isAdminOfPet = "admin", query: any) => {
  return request({
    url: `/api/${isAdminOfPet}/create`,
    method: "post",
    data: {
      ...query
    }
  });
};
// 编辑
export const edit = (isAdminOfPet = "admin", query: any) => {
  return request({
    url: `/api/${isAdminOfPet}/update/${query._id}`,
    method: "patch",
    data: {
      ...query
    }
  });
};
// 详情
export const detail = (isAdminOfPet = "admin", id: string) => {
  return request({
    url: `/api/${isAdminOfPet}/detail/${id}`,
    method: "get",
  });
};
// 删除
export const del = (isAdminOfPet = "admin", id: string) => {
  return request({
    url: `/api/${isAdminOfPet}/remove/${id}`,
    method: "delete",
  });
};
// 上级目录tree数据
export const treeList = (isAdminOfPet = "admin") => {
  return request({
    url: `/api/${isAdminOfPet}/list`,
    method: "get",
  });
};
// 角色列表接口
export const roleList = () => {
  return request({
    url: `/api/role/list`,
    method: "get",
  });
};
// 宠物店列表
export const petsStoreList = () => {
  return request({
    url: `/api/pets-store/list`,
    method: "get",
  });
};
