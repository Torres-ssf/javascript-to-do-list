import spare from "sparetime.js";
import { ListItem, HandleForm } from "./components/TodoComponets";

import IspireDb from "ispiredb.js/src/ispiredb";
spare();

export class Todo {
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

const list = new Todo(
  "New list",
  "A nice and awesome list",
  "High",
  new Date(),
  "Remember to finish Microverse",
  false
);
console.log(list.dueDate);

console.log();

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

todoDb.create(list);
todoDb.find(1, data => {
  // console.dir(data)
});

const Gui = (() => {
  const displayAllToDos = () => {
    let parent = Spare.sel("#todo-list");
    parent.html("");
    todoDb.all(data => {
      data.map((todo, index) => {
        let button = Spare.create("button")
          .attr("class", "delete")
          .html("Delete").element;
        button.onclick = element => {
          console.info("Yeah this works");
        };

        parent.append(ListItem({ todo: todo, index: index }));
        Spare.sel(`#todo-${index}`).append(button);
      });
    });
    console.log('display all todos')
  };

  return {
    displayAllToDos
  };
})();

// Gui.displayAllToDos();

HandleForm(Gui.displayAllToDos());