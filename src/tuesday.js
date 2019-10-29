import spare from "sparetime.js";
import Gui from  './components/Gui'
import {todoDb, project} from "./utilities/database";
import {
  HandleForm,
  showModal,
  masterDelete
} from "./components/TodoComponents";

spare();




// Setup ----------------------------------------------------------

const tuesday = () => {
  Gui.allProjects();
  Gui.displayAllToDos();

  HandleForm(
    data => {
      todoDb.create(data);
      project.update(1,{todos:data})
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

