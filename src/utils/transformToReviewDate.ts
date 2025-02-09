import dayjs from "dayjs";

export default function (date: dayjs.ConfigType) {
  return dayjs(date).format("MMMM DD, YYYY");
}
