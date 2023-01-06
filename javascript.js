let inputURLIDEl = document.getElementById("inputURLID")
let addURLIDEl = document.getElementById("addURLID")
let deleteURLIDEl = document.getElementById("deleteURLID")
let displayURLIdEl = document.getElementById("displayURLId")
let alertDisplayEl = document.getElementById("alertDisplay")

let bookmark = []
const localBookmark = JSON.parse(localStorage.getItem("bookmark") )

if(localBookmark){
    bookmark = localBookmark
}

addURLIDEl.addEventListener("click", async() => {
    // console.log(inputURLIDEl.value)
    // bookmark.push(inputURLIDEl.value)
    // bookmark.unshift(inputURLIDEl.value)

    //chrome extensions
    let queryOptions = { active: true, currentWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let tab = await chrome.tabs.query(queryOptions,(tab)=>{
        if(bookmark.includes(tab[0].url)){
            alertDisplayEl.style.color  = "red"
            alertDisplayEl.textContent = "Already available link !!"
        }else{
            bookmark.unshift(tab[0].url)
            alertDisplayEl.style.color  = "green"
            alertDisplayEl.textContent = "Successfull added link !!"
        }
        localStorage.setItem("bookmark",JSON.stringify(bookmark))
        render()
    });
    

    inputURLIDEl.value = ""
})

async function url(){
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions,(tab)=>{
        inputURLIDEl.value = tab[0].url
    })
}

url()


deleteURLIDEl.addEventListener("click",()=>{
    bookmark = []
    localStorage.clear()
    render()
})


function render(){
    let renderHTML = ""
    bookmark.forEach(el => {
        renderHTML +=  `<div class="contentURL">
        <i class="fa-solid fa-link"></i>
        <a href="${el}" target="_blank">${el}</a>
        </div>`
    })
    displayURLIdEl.innerHTML = renderHTML
}
render()