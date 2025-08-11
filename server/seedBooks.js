require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Books');
const connectDB = require('./config/db');

const booksData = [
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Houghton_Typ_805.94.8320_-_Pride_and_Prejudice%2C_1894%2C_Hugh_Thomson_-_Protested.jpg'
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Moby-Dick_FE_title_page.jpg'
  },
  {
    title: 'Emma',
    author: 'Jane Austen',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Emma_%281854_illustration%29.jpg'
  },
  {
    title: 'Sense and Sensibility',
    author: 'Jane Austen',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Sense_and_Sensibility_title_page.jpg'
  },
  {
    title: 'Great Expectations',
    author: 'Charles Dickens',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Great_Expectations_title_page.jpg'
  },
  {
    title: 'A Tale of Two Cities',
    author: 'Charles Dickens',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Tale_of_Two_Cities_Title_Page.jpg'
  },
  {
    title: 'Oliver Twist',
    author: 'Charles Dickens',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/0/03/OliverTwistTitlePage.jpg'
  },
  {
    title: 'Frankenstein',
    author: 'Mary Shelley',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Frankenstein_1818_title_page.jpg'
  },
  {
    title: 'Dracula',
    author: 'Bram Stoker',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Dracula_First_Edition_Cover.jpg'
  },
  {
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Dorian_gray_first_edition.jpg'
  },
  {
    title: 'Adventures of Huckleberry Finn',
    author: 'Mark Twain',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Huckleberry_Finn_title_page.jpg'
  },
  {
    title: 'The Adventures of Tom Sawyer',
    author: 'Mark Twain',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Tom_Sawyer_title_page.jpg'
  },
  {
    title: 'Treasure Island',
    author: 'Robert Louis Stevenson',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Treasure_Island_title_page.jpg'
  },
  {
    title: 'The Count of Monte Cristo',
    author: 'Alexandre Dumas',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Monte_Cristo_title_page.jpg'
  },
  {
    title: 'Les Misérables',
    author: 'Victor Hugo',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Les_Miserables_title_page.jpg'
  },
  {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/War-and-peace-titlepage.jpg'
  },
  {
    title: 'Anna Karenina',
    author: 'Leo Tolstoy',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/4/42/AnnaKarenina-Titel.jpg'
  },
  {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Crime_and_Punishment_title_page.jpg'
  },
  {
    title: 'The Iliad',
    author: 'Homer',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Iliad_%281st_ed._London_1809%29_title_page.jpg'
  },
  {
    title: 'The Odyssey',
    author: 'Homer',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Odyssey_title_page.jpg'
  },
  {
    title: 'Don Quixote',
    author: 'Miguel de Cervantes',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Don_Quixote_title_page.jpg'
  },
  {
    title: 'Gulliver’s Travels',
    author: 'Jonathan Swift',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Gulliver%27s_Travels_Title.jpg'
  },
  {
    title: 'The Divine Comedy',
    author: 'Dante Alighieri',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/3/38/DivineComedy_title_page.jpg'
  },
  {
    title: 'Paradise Lost',
    author: 'John Milton',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Paradise_Lost_title_page.jpg'
  },
  {
    title: 'Beowulf',
    author: 'Anonymous',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Beowulf_title_page.jpg'
  },
  {
    title: 'The Canterbury Tales',
    author: 'Geoffrey Chaucer',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Canterbury_Tales_title_page.jpg'
  },
  {
    title: 'Alice’s Adventures in Wonderland',
    author: 'Lewis Carroll',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Alice_%28title_page%29.jpg'
  },
  {
    title: 'Through the Looking-Glass',
    author: 'Lewis Carroll',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Through_the_Looking-Glass_title_page.jpg'
  },
  {
    title: 'The Wonderful Wizard of Oz',
    author: 'L. Frank Baum',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Oz_title_page.jpg'
  },
  {
    title: 'Little Women',
    author: 'Louisa May Alcott',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Little_Women_title_page.jpg'
  },
  {
    title: 'Uncle Tom’s Cabin',
    author: 'Harriet Beecher Stowe',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Uncle_Tom%27s_Cabin_title_page.jpg'
  },
  {
    title: 'The Scarlet Letter',
    author: 'Nathaniel Hawthorne',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Scarlet_Letter_title_page.jpg'
  },
  {
    title: 'Walden',
    author: 'Henry David Thoreau',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Walden_title_page.jpg'
  },
  {
    title: 'Leaves of Grass',
    author: 'Walt Whitman',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Leaves_of_Grass_title_page.jpg'
  },
  {
    title: 'The Time Machine',
    author: 'H.G. Wells',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Time_Machine_title_page.jpg'
  },
  {
    title: 'The War of the Worlds',
    author: 'H.G. Wells',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/War_of_the_Worlds_title_page.jpg'
  },
  {
    title: 'The Call of the Wild',
    author: 'Jack London',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Call_of_the_Wild_title_page.jpg'
  },
  {
    title: 'White Fang',
    author: 'Jack London',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/8/83/White_Fang_title_page.jpg'
  },
  {
    title: 'Heart of Darkness',
    author: 'Joseph Conrad',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Heart_of_Darkness_title_page.jpg'
  },
  {
    title: 'The Metamorphosis',
    author: 'Franz Kafka',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Metamorphosis_title_page.jpg'
  },
  {
    title: 'The Hound of the Baskervilles',
    author: 'Arthur Conan Doyle',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Hound_of_the_Baskervilles_title_page.jpg'
  },
  {
    title: 'The Brothers Karamazov',
    author: 'Fyodor Dostoevsky',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Brothers_Karamazov_title_page.jpg'
  },
  {
    title: 'Ethan Frome',
    author: 'Edith Wharton',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Ethan_Frome_title_page.jpg'
  },
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Awakening_title_page.jpg'
  },
  {
    title: 'A Modest Proposal',
    author: 'Jonathan Swift',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Modest_Proposal_title_page.jpg'
  },
  {
    title: 'Siddhartha',
    author: 'Hermann Hesse',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Siddhartha_title_page.jpg'
  }
];

booksData.forEach(book => {
  book.availability = true;
});

connectDB().then(async () => {
  await Book.deleteMany({});
  await Book.insertMany(booksData);
  console.log(`Seeded ${booksData.length} public-domain books with real covers.`);
  mongoose.disconnect();
});
