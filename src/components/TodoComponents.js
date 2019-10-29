import { Tuesday, Project } from '../utilities/database';

const ListItem = (obj) => {
  const listLi = Spare.create('li')
    .html(
      `<div class="head-con" id="todo-${obj.index}" data-priority='${obj.todo._priority}'>
              <div>
                <h4>Title: ${obj.todo._title}</h4>
                <span id='todo-priority-${obj.index}'>Priority: ${obj.todo._priority}</span>
              </div>
              <div id="b-container-${obj.index}"></div>
              </div>
          <div id="details-${obj.index}">
            <p>Description: ${obj.todo._description}</p>
            <p>Due <time datetime="2019-10-15">Date: ${obj.todo._dueDate}</time></p>
            <article>Notes: ${obj.todo._notes}</article>
          </div>`,
    )
    .attr('data-todo-index', obj.index)
    .attr('id', `list-item-${obj.index}`).
     attr('draggable', 'true').element

     listLi.ondragstart = (event) => {
       console.log(event.target.id);
       event.dataTransfer.setData('text/plain', event.target.id)

     };

  // checkbox input ------------------------------------
  setTimeout(() => {
    const inputCheckBox = Spare.create('input').attr('type', 'checkbox').element;
    inputCheckBox.classList.add('checkbox');
    inputCheckBox.onclick = (event) => {
      const isChecked = event.target.checked;
      event.target.parentNode.classList.toggle('complete');
      obj.todoDb.update(obj.todo.id, { _complete: isChecked });
    };

    const div = Spare.sel(`#b-container-${obj.index}`).element;
    div.append(inputCheckBox);

    // / function call
    const priority = Spare.sel(`#todo-${obj.index}`).element;

    prioritySwitcher(priority.getAttribute('data-priority'),
      (data) => {
        priority.children[0].children[1].classList.add(data);
      });
    expander(`list-item-${obj.index}`, `details-${obj.index}`);
  }, 1);
  //-----------------------------------------------------
  return listLi;
};

const HandleForm = (callback, updateCallback) => {
  const formValues = () => {
    const title = Spare.sel('#title').element.value;
    const description = Spare.sel('#description').element.value;
    const project = Spare.sel('#project').element.value;
    let priority = Spare.sel('#priority').element.value;
    const dueDate = Spare.sel('#dueDate').element.value;
    const notes = Spare.sel('#notes').element.value;
    const complete = Spare.sel('#complete').element.checked;
    if(priority === ''){
        priority = 'Low'
    }
    const newTodo = new Tuesday(
      title,
      description,
      priority,
      dueDate,
      notes,
      complete,
      project,
    );
    return newTodo;
  };

  const updateForm = Spare.sel('#form-update').element;
  updateForm.onclick = () => {
    updateCallback(formValues());
  };
  const form = Spare.sel('#form').element;
  form.onsubmit = (event) => {
    event.preventDefault();
    try {
      callback(formValues());
    } catch (error) { }
  };
};

const ProjectHandleForm = (callback) => {
  const projectForm = Spare.sel('#project-form').element;
  const projectName = Spare.sel('#project-name').element;

  projectForm.onsubmit = (event) => {
    event.preventDefault();

    const newProject = new Project(
      projectName.value,
      []
    );

    try {
      callback(newProject)
    } catch (error) { }
  };
};

const UpdateForm = (props, database, callback) => {
  database.find(props.id, (data) => {
    console.log(data);
  });
  database.find(props.id, (data) => {
    Spare.sel('#title').element.value = data._title;
    Spare.sel('#description').element.value = data._description;
    Spare.sel('#project').element.checked = data._project_id;
    Spare.sel('#priority').element.value = data._priority;
    Spare.sel('#dueDate').element.value = data._dueDate;
    Spare.sel('#notes').element.value = data._notes;
    Spare.sel('#complete').element.checked = data._complete;

    try {
      callback();
    } catch (error) { }
  });
};
// Events

const showModal = (modalID, mClose, elementID) => {
  const modal = Spare.sel(`#${modalID}`).element;
  const modalClose = Spare.sel(`#${mClose}`).element;
  const showForm = Spare.sel(`#${elementID}`).element;

  showForm.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  modalClose.onclick = () => {
    modal.style.display = 'none';
  };
};

const masterDelete = (callback) => {
  const dBtn = Spare.sel('#master-delete').element;

  dBtn.onclick = () => {
    if (
      confirm(
        'Do you really really really want to do this? It can be the end or you!!!',
      )
    ) {
      callback();
    }
  };
};

// Sweetness components

const prioritySwitcher = (value, callback) => {
  const lowValue = value.toLowerCase();
  function TypeError() {
    this.value = 'type error message';
    console.log(this.value);
  }
  const type = {
    high: 'high',
    medium: 'medium',
    low: 'low',
  };

  if (lowValue === type.high) {
    // / logic
    callback(lowValue);
  } else if (lowValue === type.medium) {
    // / logic
    callback(lowValue);
  } else if (lowValue === type.low) {
    // / logic
    callback(lowValue);
  } else {
    throw new TypeError();
  }
};

const expander = (parentID, childID) => {
  const parent = document.getElementById(parentID);
  const child = document.getElementById(childID);

  child.classList.add('hidden');

  parent.addEventListener('click', () => {
    child.classList.toggle('hidden')
  })
}



export {
  ListItem, HandleForm, ProjectHandleForm, UpdateForm, showModal, masterDelete,
};
