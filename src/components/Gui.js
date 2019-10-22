import {ListItem, showModal, UpdateForm} from "./TodoComponents";
import {todoDb} from  '../utilities/database'

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

    const deleteTodo = props => {
        todoDb.destroy(props.id);
        Gui.displayAllToDos();
    };

    return {
        displayAllToDos
    };
})();


export  default Gui