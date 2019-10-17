import { Tuesday } from "../tuesday";

const ListItem = obj => {
  let listLi = Spare.create("li")
    .html(
      `<h4 id="todo-${obj.index}">Title: ${obj.todo._title}
              <span>Priority: ${obj.todo._priority}</span>
              </h4>
          <div>
            <p>Description: ${obj.todo._description}</p>
            <p>Due <time datetime="2019-10-15">Date: ${obj.todo._dueDate}</time></p>
            <article>Notes: ${obj.todo._notes}</article>
          </div>`
    )
    .attr("data-todo-index", obj.index).element;

  // checkbox input ------------------------------------
  setTimeout(() => {
    let inputCheckBox = Spare.create("input").attr("type", "checkbox").element;
    inputCheckBox.onclick = event => {
      let isChecked = event.target.checked;
      event.target.parentNode.classList.toggle("complete");
      obj.todoDb.update(obj.todo.id, { _complete: isChecked });
    };

    const h4 = Spare.sel(`#todo-${obj.index}`).element;
    h4.append(inputCheckBox);
  }, 1);
  //-----------------------------------------------------
  return listLi;
};

const HandleForm = (callback, updateCallback) => {
  const formValues = () => {
    const title = Spare.sel("#title").element.value;
    const description = Spare.sel("#description").element.value;
    const priority = Spare.sel("#priority").element.value;
    const dueDate = Spare.sel("#dueDate").element.value;
    const notes = Spare.sel("#notes").element.value;
    const complete = Spare.sel("#complete").element.checked;
    let newTodo = new Tuesday(
      title,
      description,
      priority,
      dueDate,
      notes,
      complete
    );
    return newTodo;
  };

  const updateForm = Spare.sel('#form-update').element;
  updateForm.onclick = () => {
    updateCallback(formValues());
  }
  const form = Spare.sel("#form").element;
  form.onsubmit = event => {
    event.preventDefault();
    try {
      callback(formValues());
    } catch (error) { }
  };
};

const UpdateForm = (props, database, callback) => {
  database.find(props.id, data => {
    console.log(data);
  });
  database.find(props.id, data => {
    Spare.sel("#title").element.value = data._title;
    Spare.sel("#description").element.value = data._description;
    Spare.sel("#priority").element.value = data._priority;
    Spare.sel("#dueDate").element.value = data._dueDate;
    Spare.sel("#notes").element.value = data._notes;
    Spare.sel("#complete").element.checked = data._complete;

    try {
      callback();
    } catch (error) { }
  });
};
// Events

const showModal = elementID => {
  let modal = Spare.sel("#modal").element;
  let modalClose = Spare.sel("#modal-close").element;
  let showForm = Spare.sel(`#${elementID}`).element;

  showForm.addEventListener('click', () => {
    modal.style.display = "block";
  });

  modalClose.onclick = () => {
    modal.style.display = "none";
  };
};

const masterDelete = (callback) => {

  const dBtn = Spare.sel("#master-delete").element;

  dBtn.onclick = () => {
    if (
      confirm(
        "Do you really really really want to do this? It can be the end or you!!!"
      )
    ) {
      callback();
    }
  };

}

export { ListItem, HandleForm, UpdateForm, showModal, masterDelete };
