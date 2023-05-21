var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/* GET  all commentaires */
router.get('/', async (req, res, next) => {
    const { take, skip } = req.query;
    try {
        const commentaires = await prisma.Commentaire.findMany();
        res.status(200).send(commentaires);
    } catch (error) {
        res.status(500).send({ error: error });
    }
});

/* GET a commentaire by id */

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const commentaire = await prisma.Commentaire.findUnique({
            where: { id: parseInt(id) },
            include: { article: true }
        });
        res.status(200).send(commentaire);
    } catch (error) {
        res.status(500).send({ error: error });
    }
});

/* POST a commentaire */
router.post('/', async (req, res, next) => {
    const { email, contenu, articleId } = req.body;
    try {
        const newCommentaire = await prisma.Commentaire.create({
            data: {
                email,
                contenu,
                article: {
                    connect: { id: articleId },
                },
            },
        });
        res.status(200).send(newCommentaire);
    } catch (error) {
        res.status(500).send({ error: error });
    }
});

/* UPDATE a commentaire */
router.patch('/', async (req, res, next) => {
    const { id, email, contenu } = req.body;
    try {
        const updatedCommentaire = await prisma.commentaire.update({
            where: { id: parseInt(id) },
            data: { email, contenu },
        });
        res.status(200).send({ status: true, message: 'Commentaire Updated Successfully', commentaire: updatedCommentaire });
    } catch (error) {
        res.status(500).send({ status: false, error: error });
    }
});

/* DELETE a commentaire */
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const deletedCommentaire = await prisma.commentaire.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).send({ status: true, message: 'Commentaire Deleted Successfully', commentaire: deletedCommentaire });
    } catch (error) {
        res.status(500).send({ status: false, error: error });
    }
});
module.exports = router;
