const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { History } = require("../models/History");
const multer = require("multer");
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (process.env.NODE_ENV === "production") {
      cb(null, "uploads/");
    } else {
      cb(null, "uploads-client/");
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== "jpg" || ext !== "png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage }).single("file");

router.post("/upload_file", auth, (req, res) => {
  try {
    upload(req, res, (err) => {
      if (err) return res.json({ success: false, err });
      return res.json({
        success: true,
        image: res.req.file.path,
        fileName: res.req.file.filename,
      });
    });
  } catch (err) {
    return res.json({ success: false, err });
  }
});

router.post("/upload_product", auth, (req, res) => {
  try {
    const { writer, description, product, images, title, price } = req.body;
    const newProduct = new Product({
      writer,
      description,
      product,
      cartUsers: [],
      images,
      title,
      price,
    });
    newProduct
      .save()
      .then((doc) => {
        return res.status(200).json({ success: true, doc });
      })
      .catch((err) => {
        return res.status(400).json({ success: false, err });
      });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

router.post("/get_products", (req, res) => {
  try {
    const { find } = req.body;
    let findarg;
    if (find) {
      if (typeof find === "string") {
        findarg = {
          $text: { $search: find },
        };
      }
      if (find.product && find.product.length > 0) {
        findarg = { product: find.product };
      }
      if (find.price && find.price.length > 0) {
        findarg = {
          price: {
            $gte: find.price[0],
            $lte: find.price[1],
          },
        };
      }
    }
    Product.find(findarg)
      .exec()
      .then((products) => {
        return res.status(200).json({
          success: true,
          products,
        });
      })
      .catch((err) => {
        return res.status(400).json({ success: false, err });
      });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

router.get("/product_by_id", (req, res) => {
  try {
    let productId = req.query.productId;

    Product.updateOne(
      { _id: productId },
      {
        $inc: {
          views: 1,
        },
      },
      (err) => {
        if (err) return res.json({ success: false, err });
      }
    );

    Product.find({ _id: productId })
      .exec()
      .then((product) => res.status(200).json({ success: true, product }))
      .catch((err) => res.status(400).json({ success: false, err }));
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

router.post("/add_to_cart", auth, (req, res) => {
  try {
    const productId = req.query.productId;

    const { userFirstName, userLastName, userEmail, userId } = req.body;

    Product.findById(productId, (err, product) => {
      if (err) return res.status(400).json({ success: false, message: err });

      let userExisted = false;

      product.cartUsers.forEach((user) => {
        if (user.userId.toString() === userId.toString()) {
          userExisted = true;
        }
      });

      if (userExisted) {
        Product.updateOne(
          {
            _id: productId,
            cartUsers: { $elemMatch: { userId } },
          },
          {
            $inc: {
              "cartUsers.$[elem].quantity": 1,
            },
          },
          {
            arrayFilters: [{ "elem.userId": userId }],
            new: true,
          },
          (err, product) => {
            if (err) return res.status(400).json({ success: false, err });
            Product.find()
              .populate("writer")
              .then((products) =>
                res.status(200).json({ success: true, products })
              );
          }
        );
      } else {
        const userData = {
          userFirstName,
          userLastName,
          userEmail,
          userId,
          quantity: 1,
          timestamp: new Date().getTime(),
        };
        Product.findByIdAndUpdate(
          productId,
          {
            $push: {
              cartUsers: userData,
            },
          },
          { new: true },
          (err, product) => {
            if (err) res.status(400).json({ success: false, message: err });
            return Product.find()
              .then((products) =>
                res.status(200).json({ success: true, products })
              )
              .catch((err) =>
                res.status(400).json({ success: false, message: err })
              );
          }
        );
      }
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

router.post("/change_item_quantity", auth, (req, res) => {
  try {
    productId = req.query.productId;
    const { userId } = req.body;

    if (req.body.change === "increase") {
      Product.updateOne(
        {
          _id: productId,
          cartUsers: { $elemMatch: { userId } },
        },
        {
          $inc: {
            "cartUsers.$[elem].quantity": 1,
          },
        },
        {
          arrayFilters: [{ "elem.userId": userId }],
          new: true,
        },
        (err, product) => {
          if (err) return res.status(400).json({ success: false, err });
          return Product.find()
            .then((products) => res.status(200).json({ success: true, products }))
            .catch((err) =>
              res.status(400).json({ success: false, message: err })
            );
        }
      );
    } else if (req.body.change === "decrease") {
      Product.findOneAndUpdate(
        {
          _id: productId,
          cartUsers: { $elemMatch: { userId, quantity: 1 } },
        },
        {
          $pull: {
            cartUsers: {
              userId,
            },
          },
        },
        { arrayFilters: [{ "elem.userId": userId }], new: true },
        (err, product) => {
          if (err) return res.status(400).json({ success: false, err });
          Product.findOneAndUpdate(
            {
              _id: productId,
              cartUsers: { $elemMatch: { userId, quantity: { $gte: 2 } } },
            },
            {
              $inc: {
                "cartUsers.$[elem].quantity": -1,
              },
            },
            { arrayFilters: [{ "elem.userId": userId }], new: true },
            (err, product) => {
              if (err) return res.status(400).json({ success: false, err });
              return Product.find()
                .then((products) =>
                  res.status(200).json({ success: true, products })
                )
                .catch((err) =>
                  res.status(400).json({ success: false, message: err })
                );
            }
          );
        }
      );
    }
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

router.post("/remove_cart_item", auth, (req, res) => {
  try {
    const productId = req.query.productId;
    const { userId } = req.body;
    Product.findOneAndUpdate(
      {
        _id: productId,
        cartUsers: { $elemMatch: { userId } },
      },
      {
        $pull: {
          cartUsers: {
            userId,
          },
        },
      },
      { new: true },
      (err, userDetail) => {
        if (err) return res.status(400).json({ success: false, message: err });
        Product.find()
          .then((products) => res.status(200).json({ success: true, products }))
          .catch((err) => res.status(400).json({ success: false, message: err }));
      }
    );
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

router.delete("/delete_product", auth, (req, res) => {
  try {
    Product.findByIdAndRemove(req.query.productId)
      .exec()
      .then((product) => {
        Product.find()
          .populate("writer")
          .then((products) => res.status(200).json({ success: true, products }));
      })
      .catch((err) => res.status(400).json({ success: false, err }));
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

router.post("/success_buy", auth, (req, res) => {
  try {
    //Converting javascript date to human understandable
    const d = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const weeks = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    const date = `${weeks[d.getDay()]}, ${months[d.getMonth()]
      } ${d.getDate()} ${d.getFullYear()}`;

    let productData = [];

    const { totalPrice, boughtProducts, userData, paymentData } = req.body;

    boughtProducts.forEach((product) => {
      product.cartUsers.forEach((user) => {
        if (user.userId === userData._id) {
          productData.push({
            quantity: user.quantity,
            name: product.title,
            id: product._id,
            price: product.price,
            product: product.product,
          });
        }
      });
    });

    const user = {
      id: userData._id,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
    };

    let transactionData = {
      dateOfPurchase: date,
      totalPrice,
      paymentId: paymentData.paymentID,
      user,
      paymentData,
      productData,
    };

    const history = new History(transactionData);

    history.save((err, doc) => {
      if (err) return res.status(400).json({ success: false, message: err });

      history.productData.forEach((product) => {
        Product.findOneAndUpdate(
          { _id: product.id },
          {
            $inc: { sold: product.quantity },
          },

          { new: true },
          (err, product) => {
            if (err) console.log(err);
            Product.findOneAndUpdate(
              {
                _id: product.id,
                cartUsers: { $elemMatch: { userId: history.user.id } },
              },
              {
                $pull: {
                  cartUsers: {
                    userId: doc.user.id,
                  },
                },
              },
              { new: true },
              (err, userDetail) => {
                if (err) console.log(err);
              }
            );
          }
        );
      });
      Product.find()
        .then((products) => res.status(200).json({ success: true, products }))
        .catch((err) => res.status(400).json({ success: false, message: err }));
    });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});

module.exports = router;
