export default function timeToMinutes(timeStr){
    const [time,period]=timeStr.split(' ');
    let [hours, minutes]=time.split(':').map(Number);
    if(period==='AM' && hours===12){
        hours=0;
    }
    if(period==='PM' && hours!==12){
        hours+=12;
    }
    return (hours*60)+minutes;
}