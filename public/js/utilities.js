getMonthNumber = string =>{if(string=="Jan")return "01";if(string=="Feb")return "02";if(string=="Mar")return "03";if(string=="Apr")return "04";if(string=="May")return "05";if(string=="Jun")return "06";if(string=="Jul")return "07";if(string=="Aug")return "08";if(string=="Sep")return "09";if(string=="Oct")return "10";if(string=="Nov")return "11";if(string=="Dec")return "12";}

modifyDateString = date =>{
    if(date.includes("%20")){//Pikaday date
        let datePieces = date.split("%20");
        return `${datePieces[2]}/${getMonthNumber(datePieces[1])}/${datePieces[3].substring(2,4)}`;
    }else{ //original date
        let datePieces = date.split("-");
        return `${datePieces[2]}/${datePieces[1]}/${datePieces[0].substring(2,4)}`;
    }
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