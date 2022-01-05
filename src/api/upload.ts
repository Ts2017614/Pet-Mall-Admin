import request from "../utils/request";
// 下载
export const upload = (data: any) => {
  return request({
    url: `/api/common/upload`,
    method: "post",
    data: data
  });
};
