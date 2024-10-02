const fs = require('fs');
const readline = require('readline');
const path = require('path');

const tasksFilePath = path.join(__dirname, 'todofile.json');

const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
  };

class Task{
    constructor(description){
        this.id = getNextId(readTasks());
        this.description = description;
        this.status = ["toDo"]
        this.createdAt = new Date();
    }

    addTask (description){
        const tasks = readTasks();
        const newTask = new Task(description);
        tasks.push(newTask)
        writeTasks(tasks);
        console.log(`${colors.green}Task added successfully! (ID: ${newTask.id})${colors.reset}`);
    }

    updateTask(id, newDescription){
        const tasks = readTasks();
        const task = tasks.find((task) => task.id === parseInt(id));

        if (task) {
            task.description = newDescription;
            writeTasks(tasks);
            console.log(`${colors.green}Task ID ${id} updated successfully!${colors.reset}`);
          } else {
            console.log(`${colors.red}Task with ID ${id} not found.${colors.reset}`);
          }
    }
}


function readTasks() {
    if (fs.existsSync(tasksFilePath)) {
      const data = fs.readFileSync(tasksFilePath, "utf8");
      return JSON.parse(data);
    }
    return [];
}

function writeTasks(tasks) {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf8");
}

function getNextId(tasks) {
    const ids = tasks.map((task) => task.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}

function addTask(description){
    const tasks = readTasks();
    const newTask = {
        id: getNextId(tasks),
        description: description,

    }
}