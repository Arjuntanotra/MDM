import express from "express";
import Material from "../models/Material.js";  // ✅ works now
import cors from "cors";


const router = express.Router();
router.use(cors());  

router.post("/materials", async (req, res) => {
  try {
    console.log("Received material data:", req.body); 
    const material = await Material.create(req.body);
    res.status(201).json(material);
  } catch (error) {
    console.error("🔥 Error creating material:", error); // 👈 log actual cause
    res.status(500).json({ error: error.message });     // 👈 return real reason
  }
});

export default router;
