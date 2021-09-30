'use strict';

const {db, User, Friend, Communication} = require('../server/db');
const {green, red} = require('chalk');

const users = [
  {
    username: 'HowlATME',
    password: 'password',
    firstName: 'Howl',
    lastName: 'Pendragon',
    email: 'Howl_Pendragon@gmail.com',
    imageUrl:
      'https://i.pinimg.com/736x/40/c2/ec/40c2ec16e1c646fd6c5e568d3d3028ab--howl-and-sophie-howls-moving-castle.jpg',
  },
  {
    username: 'IH8SKOOL',
    password: 'password1',
    firstName: 'Chihiro',
    lastName: 'Ogino',
    email: 'Chihiro_Ogino@gmail.com',
    imageUrl:
      'https://discourse.disneyheroesgame.com/uploads/default/original/2X/7/73ae7c0a3c13f84f530762b55c3a56a2dfac81a8.jpg',
  },
  {
    username: 'Eboshi',
    password: 'password2',
    firstName: 'Lady',
    lastName: 'Eboshi',
    email: 'Lady_Eboshi@gmail.com',
    imageUrl:
      'https://static.wixstatic.com/media/799edc_93f2862c1a7640db9ad52547d1b08507~mv2.png/v1/fill/w_398,h_396,al_c,q_85,usm_0.66_1.00_0.01/lady%20eboshi.webp',
  },
  {
    username: 'Cats',
    password: 'password3',
    firstName: 'Cat',
    lastName: 'Bus',
    email: 'Cat_Bus@gmail.com',
    imageUrl:
      'https://cdn.vox-cdn.com/thumbor/gt_z0ExHHmCsLdHBSOxsMtuNSEo=/0x0:2048x1025/1200x800/filters:focal(770x330:1096x656)/cdn.vox-cdn.com/uploads/chorus_image/image/66875564/CatBus.0.jpg',
  },
  {
    firstName: 'Banana',
    lastName: 'Mango',
    email: 'banana@banana.com',
    password: 'password',
    username: 'banana',
  },
  {
    firstName: 'Apple',
    lastName: 'Cider',
    email: 'apple@banana.com',
    password: 'password',
    username: 'apple',
  },
];

const friends = [
  {
    nickname: 'my love',
    firstName: 'Sophie',
    lastName: 'Hatter',
    imageUrl:
      'https://cdn.costumewall.com/wp-content/uploads/2017/09/sophie-hatter.jpg',
  },
  {
    nickname: 'Princey',
    firstName: 'Prince',
    lastName: 'Ashitaka',
    imageUrl:
      'https://i.pinimg.com/originals/b7/d9/a0/b7d9a06ed4af82e9e6896ffd708dff55.jpg',
  },
  {
    nickname: 'Jiro',
    firstName: 'Jiro',
    lastName: 'Horikoshi',
    imageUrl:
      'https://comicvine.gamespot.com/a/uploads/original/11/111746/4346533-jiro-horikoshi-the-wind-rises-24395-1680x1050.jpg',
  },
  {
    nickname: 'Piggy',
    firstName: 'Porco',
    lastName: 'Rosso',
    imageUrl:
      'https://cdn.vox-cdn.com/thumbor/Ewo6PKQSzJshpFhv5U_kwrCkXb0=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/20009856/Porco_Rosso_963064296_large.jpg',
  },
  {
    nickname: 'robo',
    firstName: 'Laputian',
    lastName: 'Robot',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFVq9TVZH_hjDqNaG_Isrwim6xOSqyEyxZDVyRGP9TxeA1VfuT-fm5N5fKAYvCs2WE5zg&usqp=CAU',
  },
];

const communications = [
  {
    title: 'Hello my love!',
    date: '2021-10-08',
    content: 'looooooooooooooove',
    type: 'text',
  },
  {
    title: 'Banana',
    date: '2021-10-01',
    content: 'bananaaaaaaaaaaa',
    type: 'text',
  },
  {
    title: 'Apples',
    date: '2020-10-11',
    content: 'aaaaaappleeeeeeees',
    type: 'text',
  },
  {
    title: 'Woah',
    date: '2021-10-03',
  },
  {
    title: 'Cheese',
    content: 'cheeeeeeeeeeeeeeeeeese',
    date: '2021-10-24',
    type: 'text',
  },
  {
    title: 'Groceries',
    date: '2021-09-27',
    type: 'text',
  },
  {
    title: 'Word association',
    date: '2021-10-16',
    type: 'text',
  },
  {
    title: 'Mango juice',
    date: '2021-09-30',
    type: 'text',
  },
  {
    title: 'Jamba Juice',
    date: '2021-10-11',
    type: 'text',
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({force: true}); // clears db and matches models to tables

  // Creating Users
  const newUsers = await Promise.all(
    users.map(async user => {
      const newUser = await User.create(user);
      return newUser;
    }),
  );

  // Creating Friends
  const newFriends = await Promise.all(
    friends.map(friend => {
      return Friend.create(friend);
    }),
  );

  const newContacts = await Promise.all(
    communications.map(contact => {
      return Communication.create(contact);
    }),
  );

  await newFriends[0].setUser(newUsers[0]);
  await newContacts[0].setUser(newUsers[0]);
  await newContacts[0].setFriend(newFriends[0]);
  await newContacts[6].setUser(newUsers[0]);
  await newContacts[6].setFriend(newFriends[0]);
  await newContacts[7].setUser(newUsers[0]);
  await newContacts[7].setFriend(newFriends[0]);

  await newFriends[2].setUser(newUsers[0]);
  await newContacts[2].setUser(newUsers[0]);
  await newContacts[2].setFriend(newFriends[2]);

  await newFriends[1].setUser(newUsers[0]);
  await newContacts[1].setUser(newUsers[0]);
  await newContacts[1].setFriend(newFriends[1]);
  await newContacts[8].setUser(newUsers[0]);
  await newContacts[8].setFriend(newFriends[1]);

  await newFriends[2].setUser(newUsers[1]);
  await newContacts[3].setUser(newUsers[1]);
  await newContacts[3].setFriend(newFriends[2]);

  await newFriends[3].setUser(newUsers[2]);
  await newContacts[4].setUser(newUsers[2]);
  await newContacts[4].setFriend(newFriends[3]);
  await newContacts[5].setUser(newUsers[2]);
  await newContacts[5].setFriend(newFriends[3]);

  await newFriends[4].setUser(newUsers[2]);

  console.log(green(`seeded ${newUsers.length} users`));
  console.log(green(`seeded ${newFriends.length} friends`));
  console.log(green(`seeded ${newContacts.length} communications`));
  console.log(green('Seeding success!'));
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(red('Oh no! Something went wrong!'));
    console.error(err);
    console.log(red(err));
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;