import {ListItem, showModal, UpdateForm} from "./TodoComponents";
import {todoDb, project} from  '../utilities/database'

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

    const allProjects = () =>{
       const projectCon = Spare.sel('#todo-project');
       projectCon.html("");
        project.all((data) =>{
            data.map((pro, index) => {
                let createLi = Spare.create('li').
                    html(`
                    <h4>${pro.name}</h4>
                    `).
                    attr('id', `project-${index}`).
                    attr('data-project-id', pro.name).element;

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
                    let index = event.target.getAttribute('data-project-id');
                    let todoId =  document.getElementById(drop);

                    event.target.append(todoId);
                    let test = todoDb.query().where('_project_id').equals('Default-Project').toArray()
                    test.then(d => console.log(d))
                    todoParent.removeChild(Spare.sel(`#${drop}`).element);
                    allProjects();
                    displayAllToDos();
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
        project.destroy(props.id);
        allProjects()
    };

    return {
        displayAllToDos,
        allProjects
    };
})();


export  default Gui