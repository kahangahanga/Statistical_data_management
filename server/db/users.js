let users=[]

const { faker }=require('@faker-js/faker')

for (let k = 0; k < 5; k++) {
    users=[...users,{
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    }]
}

module.exports={users}