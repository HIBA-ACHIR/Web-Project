var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/* GET  all categories */
router.get('/', async (req, res, next) => {
    const { take, skip } = req.query;
    try {
        const categories = await prisma.Categorie.findMany(
            {
                include: { articles: true}
            }
        );
        res.status(200).send(categories);
    } catch (error) {
        res.status(500).send({ error: error });
    }
});

/* GET a categorie by id */

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const categorie = await prisma.Categorie.findUnique({
            where: { id: parseInt(id) },
            include: { articles: true }
        });
        if (categorie) {
            res.status(200).send(categorie);
        } else {
            res.status(404).send({ error: "Categorie not found" });
        }
    } catch (error) {
        res.status(500).send({ error: error });
    }
});

/* POST a categorie */
router.post('/', async (req, res, next) => {
    const { nom, articleIds } = req.body;
    try {
        const newCategorie = await prisma.Categorie.create({
            data: {
                nom,
                articles: {
                    connect: articleIds.map((id) => ({ id }))
                },
            },
            
            include: { articles: true }
        });
        res.status(200).send(newCategorie);
    } catch (error) {
        res.status(500).send({ error: error });
    }
});

/* UPDATE a categorie */
router.patch('/', async (req, res, next) => {
    const { id, nom } = req.body;
    try {
        const updatedCategorie = await prisma.Categorie.update({
            where: { id: parseInt(id) },
            data: { nom },
            include: { articles: true }
        });
        res.status(200).send({ status: true, message: 'Categorie Updated Successfully', categorie: updatedCategorie });
    } catch (error) {
        res.status(500).send({ status: false, error: error });
    }
});

/* DELETE a categorie */
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const categorie = await prisma.Categorie.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!categorie) {
            res.status(404).send({ error: "Categorie not found" });
            return;
        }
        await prisma.Categorie.update({
            where: { id: parseInt(id) },
            data: {
                articles: {
                    set: [],
                  },
            }
        });
        await prisma.categorie.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).send({ status: true, message: 'Categorie Deleted Successfully', categorie: categorie });
    } catch (error) {
        res.status(500).send({ status: false, error: error });
    }
});
module.exports = router;
