import spare from "sparetime.js";
import Gui from  './components/Gui'
import {todoDb, project} from "./utilities/database";
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

  HandleForm(
    data => {
      todoDb.create(data);
    },
    updateData => {
      todoDb.update(Number(sessionStorage.getItem('todo-id')), updateData);
    }
  );

  ProjectHandleForm(
    data => {
      project.create(data);
      Gui.allProjects();
    }
  );

  showModal("modal", "modal-close", "show-form");
  showModal("project-modal", "project-modal-close", "create-project")

  masterDelete(() => {
    todoDb.destroyAll(0);
    setTimeout(() => {
    }, 1);
  });

  Spare.sel('#project-delete-all').element.onclick = () => {
    Gui.deleteAllProjects();
  }

}

// -----------------------------------------------------------------

export default tuesday;

