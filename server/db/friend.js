const Sequelize = require("sequelize");
const db = require("./database");

const Friend = db.define("friend", {
  nickname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://dejpknyizje2n.cloudfront.net/marketplace/products/realistic-drawing-of-an-otter-sticker-1590543174.2700732.png",
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
});

// sets default value if image is empty string
Friend.beforeValidate((friend, options) => {
  if (options.fields.includes("imageUrl")) {
    if (friend.imageUrl === "") {
      friend.imageUrl =
        "https://dejpknyizje2n.cloudfront.net/marketplace/products/realistic-drawing-of-an-otter-sticker-1590543174.2700732.png";
    }
  }
});

module.exports = Friend;
