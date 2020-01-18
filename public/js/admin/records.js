//////***Searching***\\\\\\
let searchButton = document.getElementById("openSearchPanel");
searchButton.addEventListener("click", (e)=>{
    e.stopPropagation();
    changePanelVisibility(searchPanel,!isSearchOpen);
});
document.getElementById("titleString").addEventListener("click", (e)=>{
    e.stopPropagation();
    changePanelVisibility(searchPanel,!isSearchOpen);
});
document.getElementById("closeSearchButton").addEventListener("click", ()=>changePanelVisibility(searchPanel,false));
let searchPanel = document.getElementById("recordDateChoice");
searchPanel.addEventListener("click", (e)=>{
    e.stopPropagation();
});

let searchString = document.getElementById("searchString");
let searchDate = document.getElementById("dateFromInput");
searchDate.addEventListener("change", ()=>getSearchStringValue());
let searchSelect = document.getElementById("timeFrameSelect");
searchSelect.addEventListener("change", ()=>getSearchStringValue());

getSearchStringValue = () =>{
    let boilerplate = `Find all records from`
    if(searchDate.value==="")boilerplate+=` the beginning of time`;
    else boilerplate+=` ${modifyDateString(searchDate.value)}`;
    boilerplate+=` for ${searchSelect.options[searchSelect.selectedIndex].innerHTML}`;

    searchString.textContent = boilerplate;
    let startDate = findQueryString("startDate");
    if(startDate){
        let tempString = `Showing Records From ${modifyDateString(startDate)} Till ${modifyDateString(findQueryString("endDate"))}`;
        document.getElementById("titleString").textContent = tempString;
    }else{
        document.getElementById("resetSearch").style.display ="none";
    }
}

document.getElementById("searchForNewDatesButton").addEventListener("click", ()=>{
    let thisDate = searchDate.value;
    let futureDate = getDateInFuture(thisDate, parseInt(searchSelect.value));
    let filter = findQueryString("filter");
    window.location.href = `/admin/records?filter=${(filter===null?"":filter)}&startDate=${thisDate}&endDate=${futureDate.toISOString().split("T")[0]}`;
});

document.getElementById("resetSearch").addEventListener("click", ()=>{
    let filter = findQueryString("filter");
    window.location.href = `/admin/records?filter=${(filter===null?"":filter)}&startDate=&endDate=`;
});

/////***Filtering***\\\\\
let filterButton = document.getElementById("filterButton");
filterButton.addEventListener("click", (e)=>{
    e.stopPropagation();
    changePanelVisibility(filterPanel,!isFilterOpen);
})
let filterPanel = document.getElementById("filterDiv");
let filterOptions = document.getElementsByClassName("filterOption");
for(let i = 0; i < filterOptions.length; i++){
    filterOptions[i].addEventListener("click", ()=>{
        let startDate = findQueryString("startDate");
        let endDate = findQueryString("endDate");
        window.location.href = `/admin/records?filter=${i}&startDate=${(startDate===null?"":startDate)}&endDate=${(endDate===null?"":endDate)}`;
    });
}

changePanelVisibility = (ele,boo) =>{
    if(boo){
        ele.style.transform = "scaleY(1)";
    }else{
        ele.style.transform = "scaleY(0)";
    }
    if(ele === searchPanel){
        if(!boo){
            searchButton.style.filter = "brightness(0.5)";
        }else{
            searchButton.style.filter = "brightness(1)";
        }
        isSearchOpen = boo;
    }
    else if(ele === filterPanel){
        if(!boo){
            filterButton.style.filter = "brightness(0.5)";
        }else{
            filterButton.style.filter = "brightness(1)";
        }
        isFilterOpen = boo;
    }
}

let isFilterOpen = false;
let isSearchOpen = false;
document.addEventListener("click", ()=>{
    if(isSearchOpen)changePanelVisibility(searchPanel,false);
    if(isFilterOpen)changePanelVisibility(filterPanel,false);
});

findQueryString = (target) =>{
    let url = window.location.href.split("?");
    if(url.length <= 1)return null;
    let query = url[1];
    if(query){
        let pieces = query.split("&");
        for(let piece of pieces){
            let split = piece.split("=");
            if(split[0] === target)return split[1];
        }
        return null;
    }else{
        return null;
    }
}

getSearchStringValue();