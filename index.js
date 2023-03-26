class TodoApp {
    constructor() {
        this.todoInput = document.getElementById('todo-input');
        this.todoSubmitButton = document.getElementById('todo-submit');
        this.todoList = document.getElementById('todo-list');
        this.localTodo = JSON.parse(localStorage.getItem('localTodo'))||[];

        this.todoSubmitButton.addEventListener('click', () => {
            // console.log(this); // ??why this works here!
            if(this.todoInput.value){

                const singleTodo = {
                    id : Date.now(),
                    text : this.todoInput.value,
                    complete : false,
                }
                this.localTodo.push(singleTodo);
                localStorage.setItem('localTodo',JSON.stringify(this.localTodo));
                // this.todoList.innerHTML +=`<li>${this.todoInput.value}
                //                                 <button class="complete">Completed</button>
                //                                 <button class="edit">Edit</button>
                //                                 <button class="remove">Remove</button>
                //                             </li>`;
                this.todoInput.value = null;
                this.getEverything();
            }
        });
        this.getEverything();
    }
    getEverything(){
        this.todoList.innerHTML = null;
        // console.log(this.localTodo);
        this.localTodo.forEach(todo =>{
            const single =document.createElement('li');
            single.innerHTML = `${todo.text}
                                ${!todo.complete?'<button class="complete">Completed</button>':''}
                                <button class="edit">Edit</button>
                                <button class="remove">Remove</button>`;
            const completeButton = single.querySelector('.complete');
            if(completeButton){
                completeButton.addEventListener('click',()=>{
                    todo.complete = true;
                    localStorage.setItem('localTodo',JSON.stringify(this.localTodo));
                    this.getEverything();
                });
            }
            const editButton = single.querySelector('.edit');
            editButton.addEventListener('click',()=>{
                const newText = prompt('Enter new text:',todo.text);
                todo.text = newText;
                localStorage.setItem('localTodo',JSON.stringify(this.localTodo));
                this.getEverything();
            });
            const removeButton = single.querySelector('.remove');
            removeButton.addEventListener('click',()=>{
                this.localTodo = this.localTodo.filter(rem => rem.id!=todo.id);
                localStorage.setItem('localTodo',JSON.stringify(this.localTodo));
                this.getEverything(); 
            });
            this.todoList.appendChild(single);
        });
    }
}
let todos = new TodoApp();