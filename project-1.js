let tasksContainer = document.getElementById("Tasks-container");
let inputTask = document.getElementById("input-task");
let AddTask = document.getElementById("Add-Task");
let Tasks = [];

AddTask.addEventListener("click", function () {
    let taskText = inputTask.value.trim();
    if (taskText === "") return;

    // 🔁 Check for duplicates
    let isDuplicate = Tasks.some(task => task.Text.toLowerCase() === taskText.toLowerCase());
    if (isDuplicate) {
        alert("Task already exists!");
        return;
    }

    Tasks.push({
        id: Math.floor(Math.random() * 1000),
        Done: false,
        Text: taskText,
    });

    tasksContainer.innerHTML = "";

    for (let task of Tasks) {
        let newTask = document.createElement("div");
        newTask.classList.add("Task");
        newTask.id = task.id;

        newTask.innerHTML = `
          <p class="Task-Text">${task.Text}</p>
          <div class="buttons-container">
              <button class="Done-btn">Done</button>
              <button class="Delete-btn">Delete</button>
          </div>
        `;

        // ✅ Reapply done styles
        if (task.Done) {
            const taskTextElem = newTask.querySelector(".Task-Text");
            taskTextElem.style.textDecoration = "line-through";
            taskTextElem.style.color = "gray";
        }

        let doneBtn = newTask.querySelector(".Done-btn");
        let deleteBtn = newTask.querySelector(".Delete-btn");

        doneBtn.addEventListener("click", () => DoneHandler(task.id));
        deleteBtn.addEventListener("click", () => DeleteHandler(task.id));

        tasksContainer.append(newTask);
    }

    inputTask.value = "";
});


function DoneHandler(id) {
    const taskIndex = Tasks.findIndex((task) => task.id === id);
    if (taskIndex > -1) {
        Tasks[taskIndex].Done = !Tasks[taskIndex].Done;

        const taskElement = document.getElementById(id);
        const taskText = taskElement.querySelector(".Task-Text");

        if (Tasks[taskIndex].Done) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        } else {
            taskText.style.textDecoration = "none";
            taskText.style.color = "black";
        }
    }
}


function DeleteHandler(id) {
    Tasks = Tasks.filter((item) => item.id !== id);

    const taskElement = document.getElementById(id);
    if (taskElement) {
        taskElement.remove();
    }
}

