import IspireDb from "ispiredb.js/src/ispiredb";
export class Tuesday {
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
const list = new Tuesday(
    "Please Change",
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

//todoDb.create(list);

// ------------------------------------------------

export {todoDb}