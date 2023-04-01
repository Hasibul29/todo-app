type Todo = {
    id: number,
    text: string,
    complete: boolean
}

const todoInput: HTMLInputElement = document.getElementById('todo-input') as HTMLInputElement;
const todoSubmitButton: HTMLButtonElement = document.getElementById('todo-submit') as HTMLButtonElement;
const todoList: HTMLUListElement = document.getElementById('todo-list') as HTMLUListElement;

const addTodo = () => {
    if (todoInput.value) {
        const singleTodo: Todo = {
            id: Date.now(),
            text: todoInput.value,
            complete: false,
        }
        const localTodo: Todo[] = JSON.parse(localStorage.getItem('localTodo') as string) || [];
        const newLocalStorage: Todo[] = [...localTodo, singleTodo];
        localStorage.setItem('localTodo', JSON.stringify(newLocalStorage));
        todoInput.value = '';
        getEverything();
    }
}

const removeTodo = (localTodo: Todo[], todo: Todo) => {
    const newLocalStorage: Todo[] = localTodo.filter(rem => rem.id != todo.id);
    localStorage.setItem('localTodo', JSON.stringify(newLocalStorage));
    getEverything();
}

const editTodo = (localTodo: Todo[], todo: Todo) => {
    const newText = prompt('Enter new text:', todo.text);
    if (newText) {
        const newLocalStorage = [...localTodo.filter(el => el != todo), { ...todo, text: newText }];
        localStorage.setItem('localTodo', JSON.stringify(newLocalStorage));
        getEverything();
    }
}

const completeTodo = (localTodo: Todo[], todo: Todo) => {
    const newLocalStorage = [...localTodo.filter(el => el != todo), { ...todo, complete: true }];
    localStorage.setItem('localTodo', JSON.stringify(newLocalStorage));
    getEverything();
}
todoSubmitButton.addEventListener('click', () => {
    addTodo();
});

const getEverything = () => {
    
    todoList.innerHTML = '';
    const localTodo: Todo[] = JSON.parse(localStorage.getItem('localTodo') as string) || [];
    localTodo.sort((a: Todo, b: Todo) => Number(a.complete) - Number(b.complete));
    localTodo.forEach((todo: Todo) => {
        const single = document.createElement('li');
        if (todo.complete) single.style.backgroundColor = 'lightgreen';
        single.innerHTML = `${todo.text}
                            ${!todo.complete ? '<button class="complete">Completed</button>' : ''}
                            ${!todo.complete ? '<button class="edit">Edit</button>' : ''}
                            <button class="remove">Remove</button>`;
        
        const completeButton = single.querySelector('.complete') as HTMLButtonElement;
        if (completeButton) {
            completeButton.addEventListener('click', () => {
                completeTodo(localTodo, todo);
            });
        }
        
        const editButton = single.querySelector('.edit') as HTMLButtonElement;
        if (editButton) {
            editButton.addEventListener('click', () => {
                editTodo(localTodo, todo);
            });
        }
        
        const removeButton = single.querySelector('.remove') as HTMLButtonElement;
        removeButton.addEventListener('click', () => {
            removeTodo(localTodo, todo);
        });
        
        todoList.appendChild(single);
    });
}
getEverything();