let TasksDiv = document.getElementById("tasks")
let btn = document.getElementById("btn")
let input = document.getElementById("input")
let ResetAll = document.querySelector("#reset")
let TasksArray = []


if (localStorage.getItem("tasks")) {
    TasksArray = JSON.parse(localStorage.getItem("tasks"))
}

GetDataFromLocalStorage()

btn.onclick =  function () {
    if (input.value != "") {
        AddTaskToArray(input.value)
        input.value = ""
    }
}

TasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        DelELementFromLocalStorage(e.target.parentElement.getAttribute("data-id"))
        e.target.parentElement.remove()
    }
})

function AddTaskToArray(TaskText) {
    const task = {
        id: Date.now(),
        content: TaskText
    }
    TasksArray.push(task)
    AddTasksToPage(TasksArray)
    AddDataToLocalStorage(TasksArray)
}
function AddTasksToPage(TasksArray) {
    TasksDiv.innerHTML = ""
    //TasksArray
    TasksArray.forEach(task => {
        let div = document.createElement("div")
        div.className = "task"
        div.setAttribute("data-id", task.id)

        div.appendChild(document.createTextNode(task.content))
        let del = document.createElement("span")
        del.className = "del"
        del.appendChild(document.createTextNode("Delete"))
        div.appendChild(del)
        TasksDiv.appendChild(div)
    });
}

function AddDataToLocalStorage(TasksArray) {
    window.localStorage.setItem("tasks", JSON.stringify(TasksArray))
}

function GetDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data)
        AddTasksToPage(tasks)
    }
}


function DelELementFromLocalStorage(TaskId) {
    TasksArray = TasksArray.filter((task) => task.id != TaskId)
    AddDataToLocalStorage(TasksArray)
}

ResetAll.ondblclick = function () {
    if (TasksDiv.innerHTML != "") {
        alert("The Deleted Items Cannot Be Restored")
        window.localStorage.removeItem("tasks")
        TasksDiv.innerHTML = ""
    }
}