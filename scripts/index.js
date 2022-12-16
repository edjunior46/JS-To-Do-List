const taskInput = document.querySelector("#inputTasks")
const addTasksBtn = document.querySelector("#addTasks button")
const tasksList = document.querySelector("#todoTasks")
const doneList = document.querySelector("#doneList")
const editDiv = document.querySelector("#editTasks")

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
        taskLabel.setAttribute("for", `taskCheck${e.order}${e.check}`)
        taskLabel.addEventListener("input", () => {
            if(e.check === true){
                e.check = false
                tasksArr.push(e)
                doneTasksArr.splice(i, 1)
            } else {
                e.check = true
                doneTasksArr.push(e)
                tasksArr.splice(i, 1)
            }
            createTask(tasksArr, tasksList)
            createTask(doneTasksArr, doneList)
            }
        )

        const taskCheck = document.createElement("input")
        taskCheck.setAttribute("type", "checkbox")
        taskCheck.setAttribute("name", `taskCheck${e.order}${e.check}`)
        taskCheck.setAttribute("id", `taskCheck${e.order}${e.check}`)
        if (list.getAttribute("id") === "doneList"){
            taskCheck.setAttribute("checked", "true")
        }

        const taskTxt = document.createElement("span")
        taskTxt.innerText = e.task

        const editBtn = document.createElement("button")
        editBtn.classList.add("editBtn")
        editBtn.innerText = "Edit"
        editBtn.addEventListener("click", () => {
            editBtn.previousElementSibling.innerText = prompt("Edite sua tarefa")
            if (list.getAttribute("id") == "todoTasks"){
                tasksArr[editBtn.parentElement.parentElement.getAttribute("order")].task = editBtn.previousElementSibling.innerText
                console.log(tasksArr)
            } else {
                doneTasksArr[editBtn.parentElement.parentElement.getAttribute("order")].task = editBtn.previousElementSibling.innerText
                console.log(doneTasksArr)
            }
        })

        const clrBtn = document.createElement("button")
        clrBtn.classList.add("clrBtn")
        clrBtn.innerText = "Clear"
        clrBtn.addEventListener("click", () => {
            if (list.getAttribute("id") == "todoTasks"){
                tasksArr = tasksArr.filter((e, i) => {
                    return i != clrBtn.parentElement.parentElement.getAttribute("order")
                })
                createTask(tasksArr, tasksList)
                console.log(tasksArr)
            } else {
                doneTasksArr = doneTasksArr.filter((e, i) => {
                    return i != clrBtn.parentElement.parentElement.getAttribute("order")
                })
                createTask(doneTasksArr, doneList)
                console.log(doneTasksArr)
            }
        })

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