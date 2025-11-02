let timings=[];
for(let h=5;h<=22;h++){
    for(let m=0;m<60;m+=30){
        if(h===22 && m>30) break;
        const hours=h%12===0?12:h%12;
        const ampm=h<12?'AM':'PM';
        const min=m===0?'00':'30';
        timings.push(`${hours}:${min} ${ampm}`);
    }
}

export default timings;