import { useState, useEffect } from "react";
import parseTimeToDate from "../utils/parseEndTimeDate";
const Insights = () => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [displayData, setDisplayData] = useState({ num: 0, den: 0, info:'Total' });
  const [data, setData] = useState({
    totalPlanned: 0,
    totalCompleted: 0,
    highPlanned: 0,
    highCompleted: 0,
    mediumPlanned: 0,
    mediumCompleted: 0,
    lowPlanned: 0,
    lowCompleted: 0,
  });
  useEffect(() => {
    fetchAllTaskDetails();
    const timer = setInterval(() => {
      fetchAllTaskDetails();
      setCurrentTime(Date.now());
    }, 30000);
    return () => clearInterval(timer);
  }, []);
  async function fetchAllTaskDetails() {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/`);
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }
      const now = new Date();
      const jsonData = await response.json();
      // console.log(jsonData);
      const total = [],
        completed = [];
      let hp = 0,
        hc = 0,
        mp = 0,
        mc = 0,
        lp = 0,
        lc = 0;
      for (let task of jsonData) {
        if (parseTimeToDate(task.endTime, task.date) <= now) {
          total.push(task);
          if (task.priority === "High") hp++;
          else if (task.priority === "Medium") mp++;
          else lp++;
          if (task.isCompleted) {
            completed.push(task);
            if (task.priority === "High") hc++;
            else if (task.priority === "Medium") mc++;
            else lc++;
          }
        }
      }
      setData({
        ...data,
        totalPlanned: total.length,
        totalCompleted: completed.length,
        highPlanned: hp,
        highCompleted: hc,
        mediumPlanned: mp,
        mediumCompleted: mc,
        lowPlanned: lp,
        lowCompleted: lc,
      });
      setDisplayData({
        ...displayData,
        den: total.length,
        num: completed.length,
      });
      // console.log(total, completed);
    } catch (err) {
      console.log("Error while fetching the data: ", err.message);
    }
  }
  function handleMouseOver(c,t, name){
    setDisplayData({ num:c, den:t, info:name})
  }
  function handleMouseOut(){
    setDisplayData({ num:data.totalCompleted, den:data.totalPlanned, info:'Total'})
  }
  return (
    <>
      <div className="mt-32 mx-auto w-6/12 border border-slate-300 rounded-lg shadow-2xs">
        <h1 className="text-center mt-8 px-8 font-bold text-2xl text-blue-500">
          Priority Wise Efficinecy
        </h1>
        <div className=" flex flex-row justify-around mt-10">
          <div className="border  border-slate-300 rounded-full outline-2 outline-offset-8 outline-slate-200 shadow size-48 flex flex-col items-center justify-center">
            <span className={`font-bold text-2xl ${displayData.info==="High"?"text-red-500":displayData.info==="Medium"?"text-yellow-500":displayData.info==="Low"?"text-green-500":"text-cyan-800"}`}>{displayData.info}</span>
            <span className="font-bold text-2xl text-sky-700">{displayData.num}/{displayData.den}</span>
          </div>
          <div className="size-48 flex flex-col justify-between">
            <div
              onMouseOver={() =>
                handleMouseOver(data.highCompleted, data.highPlanned, "High")
              }
              onMouseOut={()=>handleMouseOut()}
              className="flex flex-col justify-around items-center w-24  border-transparent bg-slate-50  rounded-lg shadow"
            >
              <span className="font-medium text-red-500">High</span>
              <span className="font-semibold text-sky-800">
                {data.highCompleted}/{data.highPlanned}
              </span>
            </div>
            <div
              onMouseOver={() =>
                handleMouseOver(data.mediumCompleted, data.mediumPlanned,"Medium")
              }
              onMouseOut={()=>handleMouseOut()}
              className="flex flex-col justify-around items-center w-24  border-transparent bg-slate-50 rounded-lg shadow"
            >
              <span className="font-medium text-yellow-500">Medium</span>
              <span className="font-semibold text-sky-800">
                {data.mediumCompleted}/{data.mediumPlanned}
              </span>
            </div>
            <div
              onMouseOver={() =>
                handleMouseOver(data.lowCompleted, data.lowPlanned, "Low")
              }
              onMouseOut={()=>handleMouseOut()}
              className="flex flex-col justify-around items-center w-24  border-transparent bg-slate-50 rounded-lg shadow"
            >
              <span className="font-medium text-green-500">Low</span>
              <span className="font-semibold text-sky-800">
                {data.lowCompleted}/{data.lowPlanned}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Insights;
