import Data from "../models/data.js";
import axios from "axios";

export const fetchList = async (req, res) => {
  let fetchReq = false;
  const existingData = await Data.findOne({ id: 1 });
  if (!existingData) {
    fetchReq = true;
  } else {
    const currDate = new Date();
    const currTime = currDate.getTime();
    const fetchTime = existingData.date;
    const diff = currTime - fetchTime;
    if (diff > 60 * 60 * 1000) {
      fetchReq = true;
    }
  }
  if (!fetchReq) {
    return res.status(200).json({ data: existingData.data });
  } else {
    const date = new Date().toLocaleDateString();
    const datebreak = date.split("/");
    const time = new Date().toLocaleTimeString();
    const dat = time.split(" ");

    try {
      const data = await axios.get(
        `https://clist.by/api/v1/contest/?username=rkas&api_key=2af8de4db93746d3d1ef7b60440c57b77943427b&resource__id__in=1,2,3,12,25,26,29,35,63,65,67,73,90,93,102,117,120&start__gte=${datebreak[2]}-${datebreak[0]}-${datebreak[1]}T${dat[0]}&order_by=start&limit=300`
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
      return res.status(500).json({ message: error });
    }
  }
};

//
export const fetchListForBot = async (req, res) => {
  let fetchReq = false;
  const existingData = await Data.findOne({ id: 1 });
  if (!existingData) {
    fetchReq = true;
  } else {
    const currDate = new Date();
    const currTime = currDate.getTime();
    const fetchTime = existingData.date;
    const diff = currTime - fetchTime;
    if (diff > 60 * 60 * 1000) {
      fetchReq = true;
    }
  }
  if (!fetchReq) {
    return res.status(200).json({ data: existingData.data });
  } else {
    const date = new Date().toLocaleDateString();
    const datebreak = date.split("/");
    const time = new Date().toLocaleTimeString();
    const dat = time.split(" ");

    const { limit } = req.query;

    try {
      const data = await axios.get(
        `https://clist.by/api/v1/contest/?username=rkas&api_key=2af8de4db93746d3d1ef7b60440c57b77943427b&resource__id__in=1,2,29,35,90,102,117,120&start__gte=${datebreak[2]}-${datebreak[0]}-${datebreak[1]}T${dat[0]}&order_by=start&limit=${limit}`
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
      return res.status(500).json({ message: error });
    }
  }
};

//
