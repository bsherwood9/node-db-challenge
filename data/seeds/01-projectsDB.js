exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          name: "JEDAN",
          description: "this is a project",
          completed: false
        },
        {
          name: "The DVA Project",
          description: "the project description",
          completed: true
        }
      ]);
    });
};
