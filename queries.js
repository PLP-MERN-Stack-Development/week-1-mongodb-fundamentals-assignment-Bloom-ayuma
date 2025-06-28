// queries.js

// 🔍 Basic Queries
// Find all books in the genre "Fiction"
db.books.find({ genre: "Fiction" });

// Find books published after 2015
db.books.find({ published_year: { $gt: 2015 } });

// Find books by author "George Orwell"
db.books.find({ author: "George Orwell" });

// Update price of "1984" to 11.99
db.books.updateOne({ title: "1984" }, { $set: { price: 11.99 } });

// Delete book titled "Educated"
db.books.deleteOne({ title: "Educated" });


// 🧠 Advanced Queries
// Find books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// Projection: Return only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// Sort books by price ascending
db.books.find().sort({ price: 1 });

// Sort books by price descending
db.books.find().sort({ price: -1 });

// Pagination: 5 books per page, page 1 (skip 0)
db.books.find().limit(5).skip(0);

// Pagination: page 2
db.books.find().limit(5).skip(5);


// 📊 Aggregation Pipeline
// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// Group books by decade and count
db.books.aggregate([
  {
    $group: {
      _id: {
        decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] }
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { "_id.decade": 1 } }
]);


// ⚡ Indexing
// Create index on title
db.books.createIndex({ title: 1 });

// Compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// Use explain() to check performance
db.books.find({ title: "1984" }).explain("executionStats");
