const db = require("../config/db");

const Journal = {
  create: async (journal) => {
    try {
      console.log("Creating journal:", journal);

      const tag = journal.tag || "";

      // Insert the journal and return the inserted id
      const [result] = await db("journals")
        .insert({
          ...journal,
          tag: tag,
        })
        .returning("id"); // Use .returning("id") for PostgreSQL

      // Debugging: Log the result of the insert operation
      console.log("Insert result:", result);

      // Extract the inserted ID
      const id = result.id;

      // Debugging: Log the extracted ID
      console.log("Extracted id:", id);

      // Fetch the newly created journal
      const newJournal = await Journal.findById(id);
      console.log("Created journal:", newJournal);

      return newJournal;
    } catch (error) {
      console.error("Error creating journal:", error);
      throw error;
    }
  },

  findByUserId: async (userId) => {
    const journals = await db("journals").where({ user_id: userId });
    return journals;
  },

  findById: async (id) => {
    const journal = await db("journals").where({ id }).first();
    return journal;
  },

  update: async (id, updates) => {
    try {
      const tag = updates.tag || "";

      await db("journals")
        .where({ id })
        .update({
          ...updates,
          tag: tag,
        });

      const updatedJournal = await Journal.findById(id);
      return updatedJournal;
    } catch (error) {
      console.error("Error updating journal:", error);
      throw error;
    }
  },

  delete: async (id) => {
    return db("journals").where({ id }).del();
  },
};

module.exports = Journal;
