const Products = require("./model");
const fs = require("fs");
const { ObjectId } = require("mongodb");
const path = require("path");

const index = (req, res) => {
  Products.find()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
  console.log(Products);
};
const store = async (req, res) => {
  const { name, stock, price, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(
      __dirname,
      "../../uploads/mongoose",
      image.originalname
    );
    fs.renameSync(image.path, target);
    const results = await Products.create({
      name,
      price,
      stock,
      status,
      image: `https://localhost:3000/public/${image.originalname}`,
    })
      .then((result) => res.send(result))
      .catch((err) => res.send(err));
    console.log(results, "create sucsexx");
  }
  console.log(req.body, "pots sucsecc");
};
const view = (req, res) => {
  const productId = req.params.id;
  Products.findById(productId)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const results = await Products.findOneAndDelete({ _id: id });
  console.log(results, "resul deletersssss");
  res.json({ success: id });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  const image = req.file;

  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    await Products.updateOne({ _id: id }, { $set: { name, price, stock, image_url: `http://localhost:3000/gambar/${image.originalname}` } })
      .then((result) => res.send(result))
      .catch((error) => console.log(error));
  }
};

// const update = async (req, res) => {
//   console.log(req);
//   const { productId } = req.params;

//   try {
//     const results = await Products.findOneAndUpdate(
//       { _id: productId },
//       {
//         name: req.body.name,
//         price: req.body.price,
//         stock: req.body.stock,
//         status: req.body.status,
//       },
//       {new: true}
//     );
//     res.send(results);
//     console.log(req.body, "new update body");
//   } catch (error) {
//     console.log(error, "eroorrrr");
//   }
// };

module.exports = {
  index,
  store,
  view,
  update,
  destroy,
};
