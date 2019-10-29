import {ListItem, showModal, UpdateForm} from "./TodoComponents";
import {todoDb, project} from  '../utilities/database'

const Gui = (() => {
    const displayAllToDos = (projectData) => {
        const parent = Spare.sel("#todo-list");
        parent.html("");
         try {
             projectData._tuesdays.map((todo, index) => {
                 // update button --------------------------------
                 const updateButton = Spare.create("button")
                     .attr("class", "update")
                     .attr("id", `update-${todo.id}`)
                     .attr("data-index", todo.id)
                     // .html("update")
                     .element;
                 updateButton.onclick = () => {
                     UpdateForm(todo, todoDb);
                     sessionStorage.setItem("todo-id", todo.id);
                 };
                 // ---------------------------------------------------

                 // Delete button --------------------------------
                 const button = Spare.create("button")
                     .attr("class", "delete")
                     // .html("Delete")
                     .element;
                 button.onclick = element => {
                     deleteTodo(todo);

                     project.find(projectData._name, data => {
                         const current = data._tuesdays;
                         current.splice(index,1);
                         project.update(projectData._name, {_tuesdays: current})
                     })
                 };
                 // ------------------------------------------------------

                 parent.append(ListItem({todo, index, todoDb}));
                 Spare.sel(`#b-container-${index}`).append(button, updateButton);

                 //event setup ---------------------
                 showModal("modal", "modal-close", `update-${todo.id}`);
                 // ---------------------------------
             });
         }catch (e) {
             
         }
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
                    project.find(pro._name, (data) => {
                        console.log(data._tuesdays);
                        displayAllToDos(data);
                    });
                }

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
                    let projectName = todoId.getAttribute('data-todo-project');
                    let receiver = event.target.innerText
                    event.target.append(todoId);
                    try {
                        todoParent.removeChild(Spare.sel(`#${drop}`).element);
                    } catch (e) {
                        
                    }

                    //GEt data
                    project.find(projectName, dataGet => {
                        const currentGet = dataGet._tuesdays;
                        const foundData = currentGet[index];
                        foundData._project_id = receiver;


                    // Saving Data
                        project.find(receiver, data => {
                            const current = data._tuesdays;
                            current.push(foundData);
                            project.update(receiver, {_tuesdays: current})
                        });

                        currentGet.splice(index,1);
                        project.update(projectName, {_tuesdays: currentGet})
                    });



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
        console.log(props._name);
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