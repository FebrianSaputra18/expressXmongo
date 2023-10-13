const Products = require("./model");
const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");

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

// const up = async (req, res) => {
//   const { id } = req.params;
//   const updateData = {
//     name: req.body.name,
//     price: req.body.price,
//     stock: req.body.stock,
//   };
//   // const image = req.file;

//   try {
//     const results = await Products.findByIdAndUpdate(
//       { _id: new ObjectId(id) },
//       {
//         $set: {
//           updateData,
//         },
//       },
//       { new: true }
//     );
//     if (results.nModified === 0) {
//       return results.status(404).send("Not Found");
//     }
//     res.send("Item updated successfully");
//     console.log(updateData, "updated");
//     console.log(results, "item updated");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }

//   // if (image) {
//   //   const target = path.join(
//   //     __dirname,
//   //     "../../uploads/mongoose",
//   //     image.originalname
//   //   );
//   //   fs.renameSync(image.path, target);
//   // }
// };

const update = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    if (!id) return res.json({ message: "id required" });
    const findEdit = await Products.findByIdAndUpdate(id, 
    {
      ...body,
    },
    {
      new: true
    }
    )
    res.json({
      data: findEdit
    })
  } catch (error) {}
};
module.exports = {
  index,
  store,
  view,
  update,
  destroy,
};
