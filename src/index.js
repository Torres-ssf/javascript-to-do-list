import spare from "sparetime.js";

spare();

class ToDo {
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



// const list = new ToDo("New list", "A nice and awesome list", "High", new Date(), "Remember to finish Microverse", false);
// console.log(list.dueDate);

let item = Spare.create('li').html(`<h4>Title<span>Priority</span></h4>
          <div>
            <p>Description</p>
            <p>Due <time datetime="2019-10-15">Date</time></p>
            <article>Notes</article>
          </div>`).attr('class', 'list-details').element;

Spare.sel('#todo-list').append(item);

console.log();