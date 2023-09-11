import axios from "axios";

export const chartApi = () => {
  const params = {
    bucket: "gns",
    range: "-30s",
    measurement: "temperature",
    sort: "desc",
  };
  return axios
    .post("http://192.168.0.172:9090/Influx/Read", params)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
