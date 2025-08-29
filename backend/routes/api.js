import express from "express";
import Material from "../models/Material.js";

const router = express.Router();

// Create material
router.post("/materials", async (req, res) => {
  try {
    const material = await Material.create({
      ...req.body,
      description: req.body.description?.toUpperCase(),
      group: req.body.group?.toUpperCase(),
      subgroup: req.body.subgroup?.toUpperCase(),
      size: req.body.size?.toUpperCase(),
      grade: req.body.grade?.toUpperCase(),
      finishSpec: req.body.finishSpec?.toUpperCase(),
      specification: req.body.specification?.toUpperCase(),
    });
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all
router.get("/materials", async (req, res) => {
  try {
    const materials = await Material.findAll();
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put("/materials/:id", async (req, res) => {
  try {
    const updated = await Material.update(req.body, {
      where: { material_code: req.params.id },
    });
    res.json({ success: true, updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete("/materials/:id", async (req, res) => {
  try {
    await Material.destroy({ where: { material_code: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
