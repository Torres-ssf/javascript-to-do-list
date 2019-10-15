

const  ListItem = (obj) =>{
    return Spare.create("li")
        .html(
            `<h4 id="todo-${obj.index}">Title: ${obj.todo._title}
              <span>Priority: ${obj.todo._priority}</span>
               <input type="checkbox">
              </h4>
          <div>
            <p>Description: ${obj.todo._description}</p>
            <p>Due <time datetime="2019-10-15">Date: ${obj.todo._date}</time></p>
            <article>Notes: ${obj.todo._notes}</article>
          </div>`
        ).attr("data-todo-index", obj.index).element;

};



export {ListItem}