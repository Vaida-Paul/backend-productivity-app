exports.up = function (knex) {
  return knex.schema.createTable("journals", (table) => {
    table.increments("id").primary(); 
    table.string("title").notNullable(); 
    table.text("content").notNullable(); 
    table.string("tag"); 
    table.integer("user_id").unsigned().notNullable(); 
    table.timestamp("created_at").defaultTo(knex.fn.now()); 
    table.timestamp("updated_at").defaultTo(knex.fn.now()); 

    
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("journals");
};
