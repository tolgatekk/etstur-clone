import express from 'express';
const router = express.Router();

// Geçici olarak basit bir response döndürelim
router.get('/', (req, res) => {
  res.json({ message: 'Tours endpoint' });
});

export default router;
