const db = require("../config/db");

const User = {
  create: async (user) => {
    try {
      // Insert the user and explicitly return the 'id' column
      const insertedIds = await db("users").insert(user).returning("id"); // Returns an array of objects like [{ id: 6 }]

      if (!insertedIds || insertedIds.length === 0) {
        throw new Error("User ID not returned after insertion");
      }

      // Extract the 'id' from the first object in the array
      const id = insertedIds[0].id; // Access the 'id' property of the first object

      // Now, use the ID to fetch the newly created user
      const newUser = await User.findById(id);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  findByEmail: async (email) => {
    return db("users").where({ email }).first();
  },

  findByUsername: async (username) => {
    return db("users").where({ username }).first();
  },

  findById: async (id) => {
    return db("users").where({ id }).first();
  },
};

module.exports = User;
