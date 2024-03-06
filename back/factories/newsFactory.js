const { faker } = require('@faker-js/faker');
const { realyzeSumary } = require('../controllers/news/newsController');

/**
 * @author: badr
 */


const newsFactory = async (num_gen) => {

    let i = 0;
    let arrNews = []
    while (i < num_gen) {
        let newFake = {
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraphs(),
            id_user: 1,
            main_image: 2,
            visit_counter: faker.number.int({max:50}),
            share_counter: faker.number.int({max:50}),
            likes_counter: faker.number.int({max:50}),
            dislikes_counter: faker.number.int({max:50}),
            category: faker.commerce.department(),
            duration: faker.number.int({max:50}),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        newFake.summary = realyzeSumary(newFake.body)

        arrNews.push(newFake);
        
        i++;
    }

    return Promise.all(arrNews);
}

module.exports = { 
    newsFactory
}