const db = require("../data/db-config.js");

function findTasksById(id) {
  return db("tasks as t")
    .join("projects as p", "p.id", "t.project_id")
    .select(
      "p.description",
      "p.name",
      "t.task_description",
      "t.notes",
      "t.completed"
    )
    .where({ project_id: id });
}

function findTasksByIdContext(task_id) {
  return db("tasks_contexts as tc")
    .join("tasks as t", "t.id", "tc.task_id")
    .join("contexts as c", "c.id", "tc.context_id")
    .select("t.task_description", "t.notes", "c.title")
    .where({ task_id });
}

function findAllTasks() {
  return db("tasks as t")
    .join("projects as p", "p.id", "t.project_id")
    .select(
      "p.description",
      "p.name",
      "t.task_description",
      "t.notes",
      "t.completed",
      "t.id"
    );
}

function addProject(proj) {
  return db("projects").insert(proj);
}
function addResource(rec) {
  return db("resources").insert(rec);
}

function addTask(task, proj_id) {
  task.project_id = proj_id;
  return db("tasks").insert(task);
}
module.exports = {
  findAllTasks,
  findTasksById,
  findTasksByIdContext,
  addTask,
  addProject,
  addResource
};

//practice that stretch goal
// db("projects as p")
// .join("tasks as t", "p.id", "t.project_id")
// .join("projects_resources as pr", "t.id", "pr.project_id")
// .join("resources as r", "pr.resource_id", "r.id")
// .select(
//   "p.name",
//   "p.description",
//   "p.completed",
//   "t.task_description",
//   "t.notes",
//   "r.name as resourcename",
//   "r.description as rdesc"
// )
