class TodoApp {
    constructor() {
        this.todoInput = document.getElementById('todo-input');
        this.todoSubmitButton = document.getElementById('todo-submit');
        this.todoList = document.getElementById('todo-list');

        this.todoSubmitButton.addEventListener('click', () => {
            // console.log(this); // ??why this works here!
            if(this.todoInput.value){
                this.todoList.innerHTML +=`<li>${this.todoInput.value}
                                                <button class="complete">Completed</button>
                                                <button class="edit">Edit</button>
                                                <button class="remove">Remove</button>
                                            </li>`;
                this.todoInput.value = null;
                this.getEverything();
            }
        });

        this.getEverything();
    }
    getEverything(){
        let completeButton = document.querySelectorAll('#todo-list .complete');
        completeButton.forEach(item =>{
            item.addEventListener('click',()=>{
                const parent = item.parentElement;
                parent.style.backgroundColor = 'green';
                parent.removeChild(item);
            });
        });
        let editButton = document.querySelectorAll('#todo-list .edit');
        editButton.forEach(item =>{
            item.addEventListener('click',()=>{
                const name = item.parentElement.innerText.split(' ')[0];
                const newText = prompt('Enter new text:',name);
                let regex = new RegExp(name);
                item.parentElement.innerHTML = item.parentElement.innerHTML.replace(regex,newText);
                this.getEverything();
            });
        });
        let removeButton = document.querySelectorAll('#todo-list .remove');
        removeButton.forEach(item =>{
            item.addEventListener('click',()=>{
               item.parentElement.remove();
                this.getEverything(); 
            });
        });
    }
}
let todo = new TodoApp();
