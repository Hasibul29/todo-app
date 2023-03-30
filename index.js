const todoInput = document.getElementById('todo-input');
const todoSubmitButton = document.getElementById('todo-submit');
const todoList = document.getElementById('todo-list');

const addTodo = () => {
    if (todoInput.value) {
        const singleTodo = {
            id: Date.now(),
            text: todoInput.value,
            complete: false,
        }
        const localTodo = JSON.parse(localStorage.getItem('localTodo')) || [];
        const newLocalStorage = [...localTodo, singleTodo];
        localStorage.setItem('localTodo', JSON.stringify(newLocalStorage));
        todoInput.value = null;
        getEverything();
    }
}

const removeTodo = (localTodo, todo) => {
    const newLocalStorage = localTodo.filter(rem => rem.id != todo.id);
    localStorage.setItem('localTodo', JSON.stringify(newLocalStorage));
    getEverything();
}

const editTodo = (localTodo, todo) => {
    const newText = prompt('Enter new text:', todo.text);
    if (newText) {
        const newLocalStorage = [...localTodo.filter(el => el != todo), { ...todo, text: newText }];
        localStorage.setItem('localTodo', JSON.stringify(newLocalStorage));
        getEverything();
    }
}

const completeTodo = (localTodo, todo) => {
    const newLocalStorage = [...localTodo.filter(el => el != todo), { ...todo, complete: true }];
    localStorage.setItem('localTodo', JSON.stringify(newLocalStorage));
    getEverything();
}
todoSubmitButton.addEventListener('click', () => {
    addTodo();
});

const getEverything = () => {
    todoList.innerHTML = null;
    // const newList = document.createElement('ul');
    // console.log(newList);
    const localTodo = JSON.parse(localStorage.getItem('localTodo')) || [];
    localTodo.sort((a, b) => a.complete - b.complete);
    localTodo.forEach(todo => {
        const single = document.createElement('li');
        if (todo.complete) single.style.backgroundColor = 'lightgreen';
        single.innerHTML = `${todo.text}
                            ${!todo.complete ? '<button class="complete">Completed</button>' : ''}
                            ${!todo.complete ? '<button class="edit">Edit</button>' : ''}
                            <button class="remove">Remove</button>`;
        const completeButton = single.querySelector('.complete');
        if (completeButton) {
            completeButton.addEventListener('click', () => {
                completeTodo(localTodo, todo);
            });
        }
        const editButton = single.querySelector('.edit');
        if (editButton) {
            editButton.addEventListener('click', () => {
                editTodo(localTodo, todo);
            });
        }
        const removeButton = single.querySelector('.remove');
        removeButton.addEventListener('click', () => {
            removeTodo(localTodo, todo);
        });
        todoList.appendChild(single);
    });
}
getEverything();