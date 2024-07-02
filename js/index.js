
let item_value = document.getElementById("item_value")
let btn_add = document.getElementById("btn_add")
let btn_update = document.getElementById("btn_update")
let modal = document.getElementById("modal")
let btn_close = document.querySelector(".btn-close")


let temp
let itemLists = []

document.addEventListener("keydown",function(e){
    if(e.code =="Escape"){
        closeModal()
    }
})

btn_add.addEventListener("click", function () {
    if (item_value.value == "") {
        modal.classList.replace("d-none", "d-block")
    }
    else {

        addItem()
    }
})
btn_update.addEventListener("click", function () {
    updateItem()
})
btn_close.addEventListener("click",function(){
    closeModal()
})


if (localStorage.getItem("lists") != null) {
    itemLists = JSON.parse(localStorage.getItem("lists"))
    display(itemLists)
}
function addItem() {

    let isExist = false
    for (let index = 0; index < itemLists.length; index++) {
        if(itemLists[index].name == item_value.value.toLowerCase().trim() ){
            isExist=true
            alert("already exist")
            clear()
            break
        }
        else {
            isExist=false
        }  
    }

    if(isExist !=true){
        let item = {
            name: item_value.value.toLowerCase()
        }
        itemLists.push(item)
        display(itemLists)
        addToLocalStorage(itemLists)
        clear()
    }



}


function display(itemLists) {
    let cartona = ''
    for (let i = 0; i < itemLists.length; i++) {
        cartona += `
<tr>
<td>${i + 1}</td>
<td>${itemLists[i].name}</td>
<td><button class="btn btn-danger" onclick="deleteItem(${i})">Delete</button></td>
<td><button class="btn btn-warning" onclick="toggleBtns(${i})">Update</button></td>
</tr>
`
    }
    document.getElementById("tbody").innerHTML = cartona
}


function deleteItem(index) {
    itemLists.splice(index, 1)
    addToLocalStorage(itemLists)
    display(itemLists)

}
function toggleBtns(i) {
    item_value.value = itemLists[i].name
    btn_add.classList.replace("d-block", "d-none")
    btn_update.classList.replace("d-none", "d-block")
    temp = i
}
function updateItem() {
    itemLists[temp].name = item_value.value
    addToLocalStorage(itemLists)
    display(itemLists)
    clear()

    btn_add.classList.replace("d-none", "d-block")
    btn_update.classList.replace("d-block", "d-none")
}
function addToLocalStorage(itemLists) {
    localStorage.setItem("lists", JSON.stringify(itemLists))
}

function clear() {
    item_value.value = ''
}

function closeModal(){
    modal.classList.replace("d-block", "d-none")
}