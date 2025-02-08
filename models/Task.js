const db = require("../config/db");

const Task = {
  create: async (task) => {
    try {
      // Insert the task and return the inserted id
      const [result] = await db("tasks").insert(task).returning("id");

      // Extract the id from the result
      const id = result.id || result; // Handle both object and plain id cases

      // Fetch the newly created task
      const newTask = await Task.findById(id);
      return newTask;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  findByUserId: async (userId) => {
    return db("tasks").where({ user_id: userId });
  },

  findById: async (id) => {
    return db("tasks").where({ id }).first();
  },

  update: async (id, updates) => {
    try {
      await db("tasks").where({ id }).update(updates);
      return Task.findById(id);
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  delete: async (id) => {
    return db("tasks").where({ id }).del();
  },
};

module.exports = Task;
