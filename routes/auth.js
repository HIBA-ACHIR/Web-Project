const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/signup", async (req, res) => {
  try {
    const { nom, email, password,role } = req.body;

    if (!(nom && email && password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    const existingUser = await prisma.Utilisateur.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await prisma.Utilisateur.create({
      data: {
        nom,
        email,
        password: await bcrypt.hash(password, 10),
        role :role ?? "AUTHOR"
      },
    });

    const token = jwt.sign(
      { user_id: newUser.id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );

    return res.status(201).json({
      status: true, user: {
        id: newUser.id,
        nom: newUser.nom,
        email: newUser.email,
        role: newUser.role,
      }, token: token
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    const user = await prisma.Utilisateur.findUnique({
      where: { email },
    });
    console.log(user)
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY
      );
      return res.status(200).json({
        status: true, user: {
          id: user.id,
          nom: user.nom,
          email: user.email,
          role: user.role,
        }, token: token
      });
    }

    return res.status(400).json({ message: "User not found" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  } finally{
    prisma.$disconnect();
  }
});



module.exports = router;