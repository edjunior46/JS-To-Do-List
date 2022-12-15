const taskInput = document.querySelector("#inputTasks")
const addTasksBtn = document.querySelector("#addTasks button")
const tasksList = document.querySelector("#todoTasks")
const doneList = document.querySelector("#doneList")

let tasksArr = []
let doneTasksArr = []

addTasksBtn.addEventListener("click", () => {
    if(taskInput.value){
        tasksArr.push({
            task:  taskInput.value,
            check: false
        })
        createTask(tasksArr, tasksList)
        taskInput.value = ""
        taskInput.focus()
    } else {
        alert("Insira um titulo para sua tarefa!")
        taskInput.focus()
    }
})

function createTask(arr, list) {
    list.innerHTML = ""
    arr.forEach((e, i, a) => {
        e.order = i
        const newTask = document.createElement("li")
        newTask.setAttribute("order", e.order)

        const taskLabel = document.createElement("label")
        taskLabel.setAttribute("for", `taskCheck${e.order}`)
        taskLabel.addEventListener("input", () => {
            if(a[i].check == true ){
                a[i].check = false
            } else {
                a[i].check = true
            }
            checkTasks(a)
        })

        const taskCheck = document.createElement("input")
        taskCheck.setAttribute("type", "checkbox")
        taskCheck.setAttribute("name", `taskCheck${e.order}`)
        taskCheck.setAttribute("id", `taskCheck${e.order}`)
        if (list.getAttribute("id") === "doneList"){
            taskCheck.setAttribute("checked", "true")
        }

        const taskTxt = document.createElement("span")
        taskTxt.innerText = e.task

        const editBtn = document.createElement("button")
        editBtn.classList.add("editBtn")
        editBtn.innerText = "Edit"

        const clrBtn = document.createElement("button")
        clrBtn.classList.add("clrBtn")
        clrBtn.innerText = "Clear"
        clrBtn.addEventListener("click", clearTask)

        taskLabel.appendChild(taskCheck)
        taskLabel.appendChild(taskTxt)
        taskLabel.appendChild(editBtn)
        taskLabel.appendChild(clrBtn)
        newTask.appendChild(taskLabel)
        list.appendChild(newTask)
    })
    if(tasksArr.length == 0){
        document.querySelector("#taskCount").innerText = `Você tem não tem tarefas.`
    } else if (tasksArr.length == 1){
        document.querySelector("#taskCount").innerText = `Você tem ${tasksArr.length} tarefa pendente!`
    } else {
        document.querySelector("#taskCount").innerText = `Você tem ${tasksArr.length} tarefas pendentes!`
    }
}

function clearTask() {
    tasksArr = tasksArr.filter((e, i) => {
        return i != this.parentElement.parentElement.getAttribute("order")
    })
    createTask(tasksArr, this.parentElement.parentElement.parentElement)
}

function checkTasks(a){
    a.map((e, i) => {
        if (e.check === true){
            doneTasksArr.push(e)
            a.splice(i, 1)
        } else {
            doneTasksArr.splice(i, 1)
        }
    })
    createTask(doneTasksArr, doneList)
    createTask(a, tasksList)
}