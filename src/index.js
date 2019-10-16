import spare from "sparetime.js";
import {ListItem, HandleForm, showModal, UpdateForm} from "./components/TodoComponets";

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

// test Todo
const list = new Todo(
  "New list",
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
// todoDb.find(1, data => {
//   console.dir(data)
// });

// ------------------------------------------------


const Gui = (() => {
  const displayAllToDos = () => {
    let parent = Spare.sel("#todo-list");
    parent.html("");
    todoDb.all(data => {
      data.map((todo, index) => {

        // update button --------------------------------
        let updateButton = Spare.create('button')
            .attr('class','update').attr('id', `update-${todo.id}`)
            .html('update').element;
            updateButton.onclick = () => {
              showModal(`update-${todo.id}`);
              UpdateForm(todo,todoDb);
              // todoDb.find(1, data => {
              //        console.dir(data)
              //         });
            };
        // ---------------------------------------------------


        // Delete button --------------------------------
        let button = Spare.create("button")
          .attr("class", "delete")
          .html("Delete").element;
        button.onclick = element => {
           deleteTodo(todo);

        };
        // ------------------------------------------------------


        parent.append(ListItem({ todo: todo, index: index}));
        Spare.sel(`#todo-${index}`).append(button,updateButton)
      });
    });
  };

  const deleteTodo = (props) =>{
    todoDb.destroy(props.id);
    Gui.displayAllToDos();
  };




  return {
    displayAllToDos,
  };
})();


Gui.displayAllToDos();


HandleForm(data => {
  todoDb.create(data);
  Gui.displayAllToDos()
});

let dBtn = Spare.sel("#master-delete").element;


dBtn.onclick = () => {

 if( confirm("Do you really really really want to do this? It can be the end or you!!!")){
   todoDb.destroyAll(0);
   setTimeout(()=>{
     Gui.displayAllToDos()

   },1);

 };

};

showModal('show-form');



