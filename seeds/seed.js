const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function seed() {
    try {
        await prisma.Utilisateur.deleteMany();
        await prisma.Categorie.deleteMany();
        await prisma.Article.deleteMany();
        await prisma.Commentaire.deleteMany();
        //create 10  author users
        for (let i = 0; i < 10; i++) {
            await prisma.Utilisateur.create({
                data: {
                    nom: faker.person.fullName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    role: 'AUTHOR',
                },
            });
        }
        //create 1  admin users
        await prisma.Utilisateur.create({
            data: {
                nom: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: 'ADMIN',
            },
        });
        //create 10  categories users
        const categories = []
        for (let i = 0; i < 10; i++) {
            categories.push(
                await prisma.Categorie.create({
                    data: {
                        nom: faker.lorem.word(),
                    },
                })
            )
        }
        // block to create 100  categories articles 
        const utilisateurs = await prisma.Utilisateur.findMany({
            where: { role: 'AUTHOR' },
        });

        for (let i = 0; i < 100; i++) {
            const utilisateur = faker.helpers.arrayElement(utilisateurs);

            const categoriesOnArticle = faker.helpers.arrayElements(categories, faker.number.int({ min: 1, max: 4 }));

            const article = await prisma.Article.create({
                data: {
                    titre: faker.lorem.sentence(),
                    contenu: faker.lorem.sentence(),
                    image: faker.image.url(),
                    published: true,
                    utilisateur: {
                        connect: { id: utilisateur.id },
                    },
                    categories: {
                        connect: categoriesOnArticle.map((categorie) => ({ id: categorie.id })),

                    },
                },
            });


            const nbrCommentaires = faker.number.int({ min: 0, max: 20 });
            for (let j = 0; j < nbrCommentaires; j++) {
                await prisma.Commentaire.create({
                    data: {
                        email: faker.internet.email(),
                        contenu: faker.lorem.sentence(),
                        article: {
                            connect: { id: article.id },
                        },
                    },
                });
            }
        }

        console.log(true);
    } catch (error) {
        console.error( error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
