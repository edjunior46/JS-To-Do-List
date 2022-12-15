const taskInput = document.querySelector("#inputTasks")
const addTasksBtn = document.querySelector("#addTasks button")
const tasksList = document.querySelector("#todoTasks")
const doneList = document.querySelector("#doneList")

let tasksArr = []

addTasksBtn.addEventListener("click", () => {
    if(taskInput.value){
        tasksArr.push({
            task:  taskInput.value,
            check: false
        })
        createTask(tasksArr)
        taskInput.value = ""
        taskInput.focus()
    } else {
        alert("Insira um titulo para sua tarefa!")
        taskInput.focus()
    }
})

function createTask(arr) {
    tasksList.innerHTML = ""
    arr.forEach((e, i, a) => {
        e.order = i
        const newTask = document.createElement("li")
        newTask.setAttribute("order", e.order)

        const taskLabel = document.createElement("label")
        taskLabel.setAttribute("for", `taskCheck${e.order}`)
        taskLabel.addEventListener("input", () => {
            a[i].check = true
            // checkTasks(a)
            console.log(a[i])
        })

        const taskCheck = document.createElement("input")
        taskCheck.setAttribute("type", "checkbox")
        taskCheck.setAttribute("name", `taskCheck${e.order}`)
        taskCheck.setAttribute("id", `taskCheck${e.order}`)

        const taskTxt = document.createElement("span")
        taskTxt.innerText = e.task

        const editBtn = document.createElement("button")
        editBtn.classList.add("editBtn")
        editBtn.innerText = "Edit"

        const clrBtn = document.createElement("button")
        clrBtn.classList.add("clrBtn")
        clrBtn.innerText = "Clear"
        clrBtn.addEventListener("click", (e, i, a) => {
            let clrArr = a.filter(() => {
                a.splice(e.order, 1)
            })
            createTask(clrArr)
        })

        taskLabel.appendChild(taskCheck)
        taskLabel.appendChild(taskTxt)
        taskLabel.appendChild(editBtn)
        taskLabel.appendChild(clrBtn)
        newTask.appendChild(taskLabel)
        tasksList.appendChild(newTask)

    })
}

// function checkTasks(arr){

// }