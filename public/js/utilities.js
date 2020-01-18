modifyDateString = date =>{
    let datePieces = date.split("-");
    console.log(datePieces);
    return `${datePieces[2]}/${datePieces[1]}/${datePieces[0].substring(2,4)}`;
}

//////***Get all date inputs and default them to the current day***\\\\\\
changeToCurrentDate = ele =>{
    let date = new Date();
    ele.value = date.toISOString().split("T")[0];
}
let inputEles = document.getElementsByTagName("input");
let dateEles = [];
for(let ele of inputEles){
    if(ele.type === "date")changeToCurrentDate(ele);
}

getDateInFuture = (currentDate, amount) =>{
    let tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() +amount);
    return tomorrow;
}