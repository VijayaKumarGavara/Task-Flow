import { createContext } from "react";

const ToastContext=createContext({
    message:{text:'',type:''},
    setMessage:()=>{},
});
export default ToastContext;