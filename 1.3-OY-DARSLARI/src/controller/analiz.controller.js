import Book from "../models/books.models.js";
import Author from "../models/authors.models.js";

export class AnalyticsController {
  // 1. Har bir yozuvchining nechta kitobi borligini chiqaring
  getBooks = async (req, res) => {
    try {
      const result = await Author.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "author",
            as: "books"
          }
        },
        {
          $project: {
            _id: 0,
            author: "$name",
            booksCount: { $size: "$books" }
          }
        }
      ]);
      res.status(200).json({
         statusCode: 200, 
         data: result 
        });
    } catch (error) {
      res.status(500).json({ statusCode: 500,
         error: error.message 
        });
    }
  };

  // 2. Eng ko‘p sotilgan janrlar
  getJanr = async (req, res) => {
    try {
      const result = await Book.aggregate([
        {
          $group: {
            _id: "$genre",
            totalSold: { $sum: "$sold" }
          }
        },
        { $sort: { totalSold: -1 } },
        { $limit: 5 }
      ]);
      res.status(200).json({ 
        statusCode: 200,
         data: result 
        });
    } catch (error) {
      res.status(500).json({ statusCode: 500,
         error: error.message 
        });
    }
  };

  // 3. Eng ko‘p pul ishlagan yozuvchilar
  getPul = async (req, res) => {
    try {
      const result = await Book.aggregate([
        {
          $project: {
            author: 1,
            earnings: { $multiply: ["$sold", "$price"] }
          }
        },
        {
          $group: {
            _id: "$author",
            totalEarnings: { $sum: "$earnings" }
          }
        },
        {
          $lookup: {
            from: "authors",
            localField: "_id",
            foreignField: "_id",
            as: "authorData"
          }
        },
        { $unwind: "$authorData" },
        {
          $project: {
            _id: 0,
            author: "$authorData.name",
            totalEarnings: 1
          }
        },
        { $sort: { totalEarnings: -1 } }
      ]);
      res.status(200).json({ 
        statusCode: 200,
         data: result 
        });
    } catch (error) {
      res.status(500).json({ statusCode: 500,
         error: error.message 
        });
    }
  };

  // 4. O‘rtacha kitob narxi janr bo‘yicha
  getKitob = async (req, res) => {
    try {
      const result = await Book.aggregate([
        {
          $group: {
            _id: "$genre",
            averagePrice: { $avg: "$price" }
          }
        },
        { $sort: { averagePrice: -1 } }
      ]);
      res.status(200).json({ statusCode: 200,
         data: result 
        });
    } catch (error) {
      res.status(500).json({
         statusCode: 500, 
         error: error.message 
        });
    }
  };
}
