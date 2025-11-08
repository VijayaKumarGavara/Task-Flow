export default function getEndTimeDate(timeStr){
    const [time,period]=timeStr.split(' ');
    let [hours, minutes]=time.split(':').map(Number);
    if(period==='AM' && hours===12){
        hours=0;
    }
    if(period==='PM' && hours!==12){
        hours+=12;
    }

    const now=new Date();

    const endDate=new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes,
    )
    return endDate;
}