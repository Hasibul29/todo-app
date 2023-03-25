const todoInput = document.getElementById('todo-input');
const todoSubmitButton = document.getElementById('todo-submit');
const todoList = document.getElementById('todo-list');

todoSubmitButton.addEventListener('click', () => {
  if(todoInput.value){
    todoList.innerHTML +=  `<li>${todoInput.value}
                              <button>Complete</button>
                              <button>Remove</button>
                              <button>Update</button>
                            </li>`;
    todoInput.value = null;
  }
});