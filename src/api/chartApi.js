import axios from "axios";

export const chartApi = (range, location) => {
  const params = {
    bucket: "echart",
    range: range,
    measurement: "temperature",
    sort: "asc",
    filterMap: {
      location: location,
    },
  };
  return axios
    .post("http://localhost:9090/Influx/Read", params)
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
