const taskInput = document.querySelector("#inputTasks")
const addTaskBtn = document.querySelector("#addTasks button")
const todoTasks = document.querySelector("#todoTasks")

let taskArr = []

addTaskBtn.addEventListener('click', () => {
    taskArr.push(createLi(taskInput.value))
    addClear(taskArr[taskArr.length - 1])
    todoTasks.innerHTML += taskArr[taskArr.length - 1].innerHTML
})

function createLi(txt) {
    let newLi = document.createElement('li')
    newLi.innerHTML = `<input type=" checkbox " name='taskCheck' id="taskCheck"/><span>${txt}</span><button class="taskEdit"/><button class="taskClear"/>`
    return newLi
}

function addClear(e) {
    console.log(e)
}