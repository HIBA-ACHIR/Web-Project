var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "uploads")); // Replace 'uploads' with the desired folder path
  },
  filename: function (req, file, cb) {
    const fileName =Date.now() + "-" + file.originalname;
    cb(null, fileName);
    req.imagePath = "http://localhost:3000/uploads/" + fileName;
  },
});

const upload = multer({ storage });

/* GET  all articles */
router.get('/', async function (req, res, next) {
  const { take, skip } = req.query;
  try {
    const articles = await prisma.Article.findMany({
      where:{published:true},
      include: { categories: true, commentaires: true },
    });
   let sortedArticles = articles.sort((a, b) => b.id - a.id);
   if(skip&&take){

     res.send(sortedArticles.splice(skip,take));
    }else{
     res.send(sortedArticles);

   }
   
  } catch (error) {
    res.status(500).send({ error: error });
  } finally {
    // Cleanup and close connection
    await prisma.$disconnect();

  }
});

/* GET an article by id */

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const article = await prisma.Article.findUnique({
      where: {
        id: parseInt(id),
      },
      include: { categories: true, commentaires: true }
    });
    if (article) {
      res.status(200).send(article);
    } else {
      res.status(404).send({ error: "Article not found" });
    }

  } catch (error) {
    res.status(500).send({ error: error });
  } finally {
    // Cleanup and close connection
    await prisma.$disconnect();
  }
});

/* POST an article */
router.post('/',upload.single("image"), async (req, res, next) => {
  const {  titre, contenu, published, utilisateurId, categorieIds } = req.body;

  try {
    const newArticle = await prisma.article.create({
      data: {
        titre,
        contenu,
        image: req.imagePath,
        published:"true" === published ,
        utilisateur: { connect: { id: parseInt(utilisateurId) } },
        categories: {
          connect: categorieIds.map((id) => ({ id: parseInt(id) })),
        },
      },
      include: { utilisateur: true, categories: true, commentaires: true },
    });

    res.status(200).send({ status: true, message: 'Article Added Successfully', article: newArticle });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    await prisma.$disconnect();
  }
});


/* UPDATE an article */
router.patch('/', async (req, res, next) => {
  const { id, titre, contenu, image } = req.body;
  try {
    const updatedArticle = await prisma.Article.update({
      where: {
        id: parseInt(id)
      },
      data: {
        titre,
        contenu,
        image
      },
      include: { categories: true, commentaires: true }
    });
    res.status(200).send({ status: true, message: 'Article Updated Successfully', user: updatedArticle });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    // Cleanup and close connection
    await prisma.$disconnect();
  }
});


/* DELETE an article */
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const article = await prisma.Article.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!article) {
      res.status(404).send({ error: "Article not found" });
      return;
    }
    await prisma.Article.update({
      where: { id: parseInt(id) },
      data: {
        categories: {
          set: [],
        }
      },
    });
    await prisma.Commentaire.deleteMany({
      where: {
        articleId: parseInt(id),
      },
    })

    await prisma.Article.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).send({ status: true, message: 'Article Deleted Successfully', article: article });
  } catch (error) {
    res.status(500).send({ error: error });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
