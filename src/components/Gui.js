import {ListItem, showModal, UpdateForm} from "./TodoComponents";
import {todoDb, project} from  '../utilities/database'

const Gui = (() => {
    const displayAllToDos = (projectName) => {
        if (projectName !== undefined){
            sessionStorage.setItem('projectName',projectName);
        }
        const pName = sessionStorage.getItem('projectName');
        const parent = Spare.sel("#todo-list");
        parent.html("");
         todoDb.all( data => {
        data.map((todo, index) => {
            if (todo._project_id === pName) {
                const hold = todo;
                // update button --------------------------------
                const updateButton = Spare.create("button")
                    .attr("class", "update")
                    .attr("id", `update-${todo.id}`)
                    .attr("data-index", todo.id)
                    // .html("update")
                    .element;
                updateButton.onclick = (event) => {
                    sessionStorage.setItem("todo-id", todo.id);
                    UpdateForm(todo, todoDb);

                };
                // ---------------------------------------------------

                // Delete button --------------------------------
                const button = Spare.create("button")
                    .attr("class", "delete")
                    // .html("Delete")
                    .element;
                button.onclick = element => {
                    deleteTodo(todo);
                };
                // ------------------------------------------------------

                parent.append(ListItem({todo, index, todoDb}));
                Spare.sel(`#b-container-${index}`).append(button, updateButton);

                //event setup ---------------------
                showModal("modal", "modal-close", `update-${todo.id}`);
                // ---------------------------------
            }
        });
    })
    };

    const allProjects = () =>{
       const projectCon = Spare.sel('#todo-project');
       projectCon.html("");
        project.all((data) =>{
            data.map((pro, index) => {
                let createLi = Spare.create('li').
                    html(`
                    <h4>${pro._name}</h4>
                    `).
                    attr('id', `project-${index}`).
                    attr('data-project-id', pro._name).element;


                createLi.onclick = (e) => {
                        displayAllToDos(pro._name);
                };

                // Delete button --------------------------------
                const button = Spare.create("button")
                    .attr("class", "delete")
                    .element;
                button.onclick = element => {
                    deleteProject(pro)
                };
                // ------------------------------------------------------

                projectCon.element.ondragover = (event) =>{
                event.preventDefault();
                };

                projectCon.element.ondrop  = (event) => {
                    event.preventDefault();
                    let todoParent = Spare.sel('#todo-list')
                    let drop = event.dataTransfer.getData('text/plain');
                    let todoId =  document.getElementById(drop);
                    let index = todoId.getAttribute('data-todo-index');
                    let receiver = event.target.innerText
                    event.target.append(todoId);
                    try {
                        todoParent.removeChild(Spare.sel(`#${drop}`).element);
                    } catch (e) {
                        
                    }
                    todoDb.update(Number(index), {_project_id: receiver });
                    allProjects();
                 };


                createLi.append(button);
                projectCon.append(createLi)

            });



        })

    };

    const deleteTodo = props => {
        todoDb.destroy(props.id);
        Gui.displayAllToDos();
    };

    const deleteProject = props => {
        project.destroy(props._name);
        allProjects()
    };

    const deleteAllProjects = () => {
        project.destroyAll();
        allProjects();
    }

    return {
        displayAllToDos,
        allProjects,
        deleteAllProjects
    };
})();


export  default Gui