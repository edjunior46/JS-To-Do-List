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
            if(a[i].check == true ){
                a[i].check = false
            } else {
                a[i].check = true
            }
            checkTasks(a[i])
            // console.log(a[i])
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
        clrBtn.addEventListener("click", clearTask)

        taskLabel.appendChild(taskCheck)
        taskLabel.appendChild(taskTxt)
        taskLabel.appendChild(editBtn)
        taskLabel.appendChild(clrBtn)
        newTask.appendChild(taskLabel)
        tasksList.appendChild(newTask)

    })
    console.log(tasksArr)
}

function clearTask() {
    let clrFn = tasksArr.filter((e, i) => {
        return i != this.parentElement.parentElement.getAttribute("order")
    })
    tasksArr = clrFn
    createTask(clrFn)
}

// function checkTasks(obj){
//     if (obj.check === true){
//         doneList.appen
//     } else {
//         // doneList.appendChild(tasksList.children[obj.order].cloneNode(false))
//         // tasksList.children[obj.order].style = "display: block;"
//     }
// }

//peagr o order, pegar os valores, pesquisar em tasksList o elemento que me foi passado e jogar para done