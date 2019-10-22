import spare from "sparetime.js";
import IspireDb from "ispiredb.js/src/ispiredb";
import {
  ListItem,
  HandleForm,
  showModal,
  UpdateForm,
  masterDelete
} from "./components/TodoComponents";

spare();

export class Tuesday {
  constructor(title, description, priority, dueDate, notes, complete) {
    this._title = title;
    this._description = description;
    this._priority = priority;
    this._dueDate = dueDate;
    this._notes = notes;
    this._complete = complete;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get priority() {
    return this._priority;
  }

  set priority(value) {
    this._priority = value;
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(value) {
    this._dueDate = value;
  }

  get notes() {
    return this._notes;
  }

  set notes(value) {
    this._notes = value;
  }

  get complete() {
    return this._complete;
  }

  set complete(value) {
    this._complete = value;
  }
}

// test Todo
const list = new Tuesday(
  "Please Change",
  "A nice and awesome list",
  "High",
  new Date(),
  "Remember to finish Microverse",
  false
);

// Database setup ----------------------

const todoDb = new IspireDb();
todoDb.setup(
  "tododb",
  1,
  "++id",
  "title",
  "description",
  "priority",
  "dueDate",
  "notes",
  "complete"
);
// ------------------------------

// Db dummy test data -------------------------------

todoDb.create(list);

// ------------------------------------------------

const Gui = (() => {
  const displayAllToDos = () => {
    const parent = Spare.sel("#todo-list");
    parent.html("");
    todoDb.all(data => {
      data.map((todo, index) => {
        // update button --------------------------------
        const updateButton = Spare.create("button")
          .attr("class", "update")
          .attr("id", `update-${todo.id}`)
          .attr("data-index", todo.id)
          .html("update").element;
        updateButton.onclick = () => {
          UpdateForm(todo, todoDb);
          sessionStorage.setItem("todo-id", todo.id);
        };
        // ---------------------------------------------------

        // Delete button --------------------------------
        const button = Spare.create("button")
          .attr("class", "delete")
          .html("Delete").element;
        button.onclick = element => {
          deleteTodo(todo);
        };
        // ------------------------------------------------------

        parent.append(ListItem({ todo, index, todoDb }));
        Spare.sel(`#b-container-${index}`).append(button, updateButton);

        //event setup ---------------------
        showModal(`update-${todo.id}`);
        // ---------------------------------
      });
    });
  };

  const deleteTodo = props => {
    todoDb.destroy(props.id);
    Gui.displayAllToDos();
  };

  return {
    displayAllToDos
  };
})();

// Setup ----------------------------------------------------------

const tuesday = () => {

  Gui.displayAllToDos();

  HandleForm(
    data => {
      todoDb.create(data);
      Gui.displayAllToDos();
    },
    updateData => {
      todoDb.update(Number(sessionStorage.getItem("todo-id")), updateData);
      Gui.displayAllToDos();
    }
  );

  showModal("show-form");

  masterDelete(() => {
    todoDb.destroyAll(0);
    setTimeout(() => {
      Gui.displayAllToDos();
    }, 1);
  });

}

// -----------------------------------------------------------------

export default tuesday;
