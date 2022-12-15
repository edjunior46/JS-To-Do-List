const taskInput = document.querySelector("#inputTasks")
const addTasksBtn = document.querySelector("#addTasks button")
const tasksList = document.querySelector("#todoTasks")
let tasksArr = []

addTasksBtn.addEventListener("click", () => {
    if(taskInput.value){
        tasksArr.push({
            task: taskInput.value,
            createAt: Date.now(),
            checked: false,
            order: (tasksArr.length + 1)
        })
        tasksList.innerHTML += createTask(tasksArr[tasksArr.length - 1])
        console.log(tasksArr)
        taskInput.value = ""
        taskInput.focus()
    } else {
        alert("Insira um titulo para sua tarefa")
    }
})

function createTask(e) {
    const newTask = document.createElement("LI")
    newTask.innerHTML = `<input type="checkbox">
    <span id="taskTitle">${e.task}</span>
    <span id="taskDate"></span>
    <button class="taskEdit">Edit</button>
    <button class="taskClear" onclick="taskDelFn(this)" value="${e.order}">Clear</button>`
    return newTask.outerHTML
}

function taskDelFn(i) {
    console.log(i.value)
    tasksArr.splice((i.value - 1), 1)
    console.log(tasksArr)
    i.parentElement.remove()
}