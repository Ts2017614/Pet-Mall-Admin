import dayjs from "dayjs";
const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss"
const timeFun = {
  formatUtcString(newValue: string, value = DATE_TIME_FORMAT) {
    return dayjs(newValue).format(value)
  }
}
export default timeFun
