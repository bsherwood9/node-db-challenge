exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("tasks").insert([
        {
          project_id: 1,
          task_description: "task description",
          notes: "the task notes",
          completed: false
        },
        {
          project_id: 2,
          task_description: "DVA needs some work",
          notes: "the task notes to 2",
          completed: true
        }
      ]);
    });
};
