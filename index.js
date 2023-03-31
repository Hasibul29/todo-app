class Todo {
    constructor(text) {
        this.id = Date.now();
        this.text = text;
        this.complete = false;
    }
}

class TodoApp {
    constructor() {
        this.todoInput = document.getElementById('todo-input');
        this.todoSubmitButton = document.getElementById('todo-submit');
        this.todoList = document.getElementById('todo-list');
        this.localTodo = JSON.parse(localStorage.getItem('localTodo')) || [];

        this.todoSubmitButton.addEventListener('click', () => {
            if (this.todoInput.value) {
                this.addTodo();
            }
        });
        this.getEverything();
    }
    addTodo() {
        const singleTodo = new Todo(this.todoInput.value);
        this.localTodo.push(singleTodo);
        localStorage.setItem('localTodo', JSON.stringify(this.localTodo));
        this.todoInput.value = null;
        this.getEverything();
    }
    completeTodo(todo) {
        todo.complete = true;
        localStorage.setItem('localTodo', JSON.stringify(this.localTodo));
        this.getEverything();
    }
    editTodo(todo) {
        const newText = prompt('Enter new text:', todo.text);
        if (newText) {
            todo.text = newText;
            localStorage.setItem('localTodo', JSON.stringify(this.localTodo));
            this.getEverything();
        }
    }
    removeTodo(todo) {
        this.localTodo = this.localTodo.filter(rem => rem.id != todo.id);
        localStorage.setItem('localTodo', JSON.stringify(this.localTodo));
        this.getEverything();
    }
    getEverything() {
        this.todoList.innerHTML = null;
        this.localTodo.sort((a, b) => a.complete - b.complete);
        this.localTodo.forEach(todo => {
            const single = document.createElement('li');
            if (todo.complete) single.style.backgroundColor = 'lightgreen';
            single.innerHTML = `${todo.text}
                                ${!todo.complete ? '<button class="complete">Completed</button>' : ''}
                                ${!todo.complete ? '<button class="edit">Edit</button>' : ''}
                                <button class="remove">Remove</button>`;

            const completeButton = single.querySelector('.complete');
            const editButton = single.querySelector('.edit');
            const removeButton = single.querySelector('.remove');

            if (completeButton) {
                completeButton.addEventListener('click', () => this.completeTodo(todo));
            }

            if (editButton) {
                editButton.addEventListener('click', () => this.editTodo(todo));
            }
            removeButton.addEventListener('click', () => this.removeTodo(todo));
            this.todoList.appendChild(single);
        });
    }
}
let todos = new TodoApp();