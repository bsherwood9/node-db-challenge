exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("contexts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("contexts").insert([
        {
          title: " On a table"
        },
        {
          title: "on a computer"
        },
        {
          title: "with an aunt"
        }
      ]);
    });
};
