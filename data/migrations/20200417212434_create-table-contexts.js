exports.up = function(knex) {
  return knex.schema
    .createTable("contexts", tbl => {
      tbl.increments();
      tbl.string("title", 255).notNullable();
    })
    .createTable("tasks_contexts", tbl => {
      tbl
        .integer("task_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tasks")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("context_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("contexts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.primary(["task_id", "context_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("tasks_contexts")
    .dropTableIfExists("contexts");
};
