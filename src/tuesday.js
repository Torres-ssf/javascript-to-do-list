import spare from "sparetime.js";
import Gui from  './components/Gui'
import {todoDb, project, Project} from "./utilities/database";
import {
  HandleForm,
  showModal,
  masterDelete,
  ProjectHandleForm
} from "./components/TodoComponents";

spare();




// Setup ----------------------------------------------------------

const tuesday = () => {
  Gui.allProjects();
  // Gui.displayAllToDos();

  HandleForm(
    data => {
      todoDb.create(data);
      project.update(1,{todos:data})
      // Gui.displayAllToDos();
    },
    updateData => {
      todoDb.update(Number(sessionStorage.getItem("todo-id")), updateData);
      // Gui.displayAllToDos();
    }
  );

  ProjectHandleForm(
    data => {
      project.create(data);
      Gui.allProjects();
    }
  )

  showModal("modal", "modal-close", "show-form");
  showModal("project-modal", "project-modal-close", "create-project")

  masterDelete(() => {
    todoDb.destroyAll(0);
    setTimeout(() => {
      // Gui.displayAllToDos();
    }, 1);
  });

  Spare.sel('#project-delete-all').element.onclick = () => {
    Gui.deleteAllProjects();
  }

}

// -----------------------------------------------------------------

export default tuesday;

