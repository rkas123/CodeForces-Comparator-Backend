import Data from "../models/data.js";
import axios from "axios";

export const fetchList = async (req, res) => {
  console.log("in fetchlist");
  let fetchReq = false;
  const existingData = await Data.findOne({ id: 1 });
  // console.log(existingData);
  if (!existingData) {
    console.log("No existing data");
    fetchReq = true;
  } else {
    console.log("data exists");
    const currDate = new Date();
    const currTime = currDate.getTime();
    const fetchTime = existingData.date;
    const diff = currTime - fetchTime;
    if (diff > 60 * 60 * 1000) {
      fetchReq = true;
    }
  }
  if (!fetchReq) {
    console.log("No new fetch required");
    return res.status(200).json({ data: existingData.data });
  } else {
    console.log("fetching");
    const date = new Date().toLocaleDateString();
    const datebreak = date.split("/");
    const time = new Date().toLocaleTimeString();
    const dat = time.split(" ");

    try {
      const data = await axios.get(
        `https://clist.by/api/v1/contest/?username=rkas&api_key=2af8de4db93746d3d1ef7b60440c57b77943427b&resource__id__in=1,2,3,12,25,26,29,35,63,65,67,73,90,93,102,117,120&start__gte=${datebreak[2]}-${datebreak[1]}-${datebreak[0]}T${dat[0]}&order_by=start&limit=300`
      );
      const currDate = new Date();
      const currTime = currDate.getTime();
      if (!existingData) {
        const newData = new Data({
          id: 1,
          date: currTime,
          data: data.data.objects,
        });
        newData.save();
      } else {
        Data.findOneAndUpdate(
          { id: 1 },
          { $set: { date: currTime, data: data.data.objects } }
        );
      }

      return res.status(200).json({ data: data.data.objects });
    } catch (error) {
      // console.log(error);
      console.log("error here");
      return res.status(500).json({ message: error });
    }
  }
};
