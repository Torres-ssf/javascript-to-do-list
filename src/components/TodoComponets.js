

const ListItem = (obj) => {
  return Spare.create("li")
    .html(
      `<h4 id="todo-${obj.index}">Title: ${obj.todo._title}
              <span>Priority: ${obj.todo._priority}</span>
               <input type="checkbox">
              </h4>
          <div>
            <p>Description: ${obj.todo._description}</p>
            <p>Due <time datetime="2019-10-15">Date: ${obj.todo._date}</time></p>
            <article>Notes: ${obj.todo._notes}</article>
          </div>`
    ).attr("data-todo-index", obj.index).element;

};

const HandleForm = (callback) => {
  const form = Spare.sel('#form').element;
  console.log(form);
  form.onsubmit = event => {
    event.preventDefault();
    const title = Spare.sel('#title').element.value;
    const description = Spare.sel('#description').element.value;
    const priority = Spare.sel('#priority').element.value;
    const dueDate = Spare.sel('#dueDate').element.value;
    const notes = Spare.sel('#notes').element.value;
    const complete = Spare.sel('#complete').element.checked;

    let newTodo = new Todo(title, description, priority, dueDate, notes, complete);
    todoDb.create(newTodo);

    try {
      callback();
    } catch(error) {
      
    }
  }
};


export { ListItem, HandleForm }