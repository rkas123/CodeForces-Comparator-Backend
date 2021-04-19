import axios from "axios";

export const fetchList = async (req, res) => {
  const date = new Date().toLocaleDateString();
  const datebreak = date.split("/");
  const time = new Date().toLocaleTimeString();
  const dat = time.split(" ");

  try {
    const data = await axios.get(
      `https://clist.by/api/v1/contest/?username=rkas&api_key=2af8de4db93746d3d1ef7b60440c57b77943427b&resource__id__in=1,2,3,12,25,26,29,35,63,65,67,73,90,93,102,117,120&start__gte=${datebreak[2]}-${datebreak[0]}-${datebreak[1]}T${dat[0]}&order_by=start&limit=300`
    );
    return res.status(200).json({ data: data.data.objects });
  } catch (error) {
    console.log(error);
    console.log("error here");
    return res.status(500).json({ message: error });
  }
};

// https://clist.by/api/v1/contest/?username=rkas&api_key=2af8de4db93746d3d1ef7b60440c57b77943427b&resource_id=1&start__lt=2021-04-10T12:00:00&order_by=start
