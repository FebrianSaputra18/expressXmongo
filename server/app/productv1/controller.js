const db = require("../../config/mongodb");
const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");

//storage image

const index = async (req, res) => {
  db.collection("products")
    .find()
    .toArray()
    .then((results) => res.send(results))
    .catch((err) => res.send(err));
};

const view = (req, res) => {
  const { id } = req.params;
  db.collection("products")
    .findOne({ _id: new ObjectId(id) })
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const store = (req, res) => {
  const { name, stock, price, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(
      __dirname,
      "../../uploads/mongodb",
      image.originalname
    );
    fs.renameSync(image.path, target);
    db.collection("products")
      .insertOne({
        name,
        price,
        stock,
        status,
        image: `https://localhost:3000/public/${image.originalname}`,
      })
      .then((result) => res.send(result))
      .catch((err) => res.send(err));
  }
};

const destroy = (req, res) => {
  const { id } = req.params;
  db.collection("products").deleteOne({ _id: new ObjectId(id) });
  res.json({ success: id });
};

const update = async (req, res) => {
  const { id } = req.params;

  const updateData = {
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    status: req.body.status,
  }

  try {
    const result = await db.collection('products').updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.nModified === 0) {
      // If no documents were modified, it means the document with the given ID doesn't exist
      return res.status(404).send('Item not found');
    }

    res.send('Item updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  index,
  view,
  store,
  destroy,
  update,
};
