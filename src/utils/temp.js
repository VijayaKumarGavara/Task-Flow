import { createContext } from "react";

const TasksContext=createContext({
    taskList:[],
    setTaskList:()=>{},
})

export default TasksContext;