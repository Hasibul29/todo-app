class TodoApp {
    constructor() {
        this.todoInput = document.getElementById('todo-input');
        this.todoSubmitButton = document.getElementById('todo-submit');
        this.todoList = document.getElementById('todo-list');
        this.localTodo = JSON.parse(localStorage.getItem('localTodo')) || [];

        this.todoSubmitButton.addEventListener('click', () => {
            if (this.todoInput.value) {
                const singleTodo = {
                    id: Date.now(),
                    text: this.todoInput.value,
                    complete: false,
                }
                this.localTodo.push(singleTodo);
                localStorage.setItem('localTodo', JSON.stringify(this.localTodo));
                this.todoInput.value = null;
                this.getEverything();
            }
        });
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
            if (completeButton) {
                completeButton.addEventListener('click', () => {
                    todo.complete = true;
                    localStorage.setItem('localTodo', JSON.stringify(this.localTodo));
                    this.getEverything();
                });
            }
            const editButton = single.querySelector('.edit');
            if (editButton) {
                editButton.addEventListener('click', () => {
                    const newText = prompt('Enter new text:', todo.text);
                    if (newText) {
                        todo.text = newText;
                        localStorage.setItem('localTodo', JSON.stringify(this.localTodo));
                        this.getEverything();
                    }
                });
            }
            const removeButton = single.querySelector('.remove');
            removeButton.addEventListener('click', () => {
                this.localTodo = this.localTodo.filter(rem => rem.id != todo.id);
                localStorage.setItem('localTodo', JSON.stringify(this.localTodo));
                this.getEverything();
            });
            this.todoList.appendChild(single);
        });
    }
}
let todos = new TodoApp();