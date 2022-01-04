import request from "../utils/request";
// 分页列表
export const upload = (data: any) => {
  return request({
    url: `/api/common/upload`,
    method: "post",
    data: data
  });
};
