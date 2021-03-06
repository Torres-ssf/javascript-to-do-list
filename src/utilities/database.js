import IspireDb from "ispiredb.js/src/ispiredb";
import tuesday from "../tuesday";
export class Project {
	constructor(name, tuesdays) {
		this._name = name;
	}

	get name() {
		return this._name;
	}

	set name(value) {
		this._name = value;
	}
}

export class Tuesday {
	constructor(title, description, priority, dueDate, notes, complete, project) {
		this._title = title;
		this._description = description;
		this._priority = priority;
		this._dueDate = dueDate;
		this._notes = notes;
		this._complete = complete;
		this._project_id = project
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
	get project_id() {
		return this._project_id;
	}

	set project_id(value) {
		this._project_id = value;
	}
}

// test Todo
const list = new Tuesday(
	"Please Change",
	"A nice and awesome list",
	"High",
	new Date(),
	"Remember to finish Microverse",
	false,
     'D',
);

const testProject = new Project(
	"Default-Project",
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
	"complete",
	"project_id"
);
// ------------------------------

// Db dummy test data -------------------------------

todoDb.create(list);

// ------------------------------------------------

const project = new IspireDb();
project.setup('project', 1, '_name');
project.create(testProject);
export { todoDb, project }