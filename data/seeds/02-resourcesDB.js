exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("resources")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("resources").insert([
        {
          name: "Lambda Student",
          description: "a soon to be hired developer"
        },
        {
          name: "MacBook Pro #1",
          description: "an overly expensive laptop computer"
        },
        {
          name: "Ducky Pro Keyboard",
          description: "only the best mechanical keyboard"
        }
      ]);
    });
};
