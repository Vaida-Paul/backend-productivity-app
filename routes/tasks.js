const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.findByUserId(req.user.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/:id", auth, async (req, res) => {
  const { quadrant } = req.body;

  try {
    const task = await Task.update(req.params.id, { quadrant });

    if (!task) {
      throw new Error("Task update failed");
    }

    res.json(task);
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  const { text, deadline, quadrant } = req.body;

  try {
    const task = await Task.create({
      text,
      deadline,
      quadrant,
      user_id: req.user.id,
    });

    if (!task) {
      throw new Error("Task creation failed");
    }

    res.json(task);
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.delete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
