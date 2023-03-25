class TodoApp {
    constructor() {
        this.todoInput = document.getElementById('todo-input');
        this.todoSubmitButton = document.getElementById('todo-submit');
        this.todoList = document.getElementById('todo-list');

        this.todoSubmitButton.addEventListener('click', () => {
            // console.log(this); // ??why this works here!
            if(this.todoInput.value){
                this.todoList.innerHTML +=  `<li>${this.todoInput.value}
                                            <button class="complete">Completed</button>
                                            <button>Edit</button>
                                            <button>Remove</button>
                                        </li>`;
                this.todoInput.value = null;
                this.getEverything();
            }
        });
        this.getEverything = () =>{
            let button = document.querySelectorAll('#todo-list .complete')
            button.forEach(item =>{
                item.addEventListener('click',()=>{
                    const parent = item.closest('li');
                    parent.style.backgroundColor = 'green';
                    parent.removeChild(item);
                })
            });
        }
        this.getEverything();
    }
}
let todo = new TodoApp();