class TodoApp {
    constructor() {
        this.todoInput = document.getElementById('todo-input');
        this.todoSubmitButton = document.getElementById('todo-submit');
        this.todoList = document.getElementById('todo-list');

        this.todoSubmitButton.addEventListener('click', () => {
            // console.log(this); // ??why this works here!
            if(this.todoInput.value){
                this.todoList.innerHTML +=  `<li>${this.todoInput.value}
                                        <button>Complete</button>
                                        <button>Edit</button>
                                        <button>Remove</button>
                                        </li>`;
                this.todoInput.value = null;
            }
        });
    }
}
let todo = new TodoApp();