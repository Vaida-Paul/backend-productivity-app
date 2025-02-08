const express = require("express");
const Journal = require("../models/Journal");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const journals = await Journal.findByUserId(req.user.id);
    res.json(journals);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  const { title, content, tag } = req.body;

  try {
    const journal = await Journal.create({
      title,
      content,
      tag: tag || "",
      user_id: req.user.id,
    });

    if (!journal) {
      throw new Error("Journal creation failed");
    }

    res.json(journal);
  } catch (error) {
    console.error("Create journal error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  const { title, content, tag } = req.body;

  try {
    const journal = await Journal.update(req.params.id, {
      title,
      content,
      tag: tag || "",
    });

    if (!journal) {
      throw new Error("Journal update failed");
    }

    res.json(journal);
  } catch (error) {
    console.error("Update journal error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Journal.delete(req.params.id);
    res.json({ message: "Journal deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
