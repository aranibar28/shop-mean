const { response } = require("express");
const Product = require("../models/product");
const Category = require("../models/category");
const Inventory = require("../models/inventory");
var path = require("path");
var fs = require("fs");

// localhost:3000/api/categories/image/default.png //
const image = async (req, res = response) => {
  let img = req.params["img"];
  fs.stat("./uploads/products/" + img, (err) => {
    if (!err) {
      let path_img = "./uploads/products/" + img;
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = "./uploads/default.png";
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};

const create_product = async (req, res = response) => {
  let data = req.body;
  try {
    var img_path = req.files["image"].path;
    var name = img_path.split("\\");
    var image_name = name[2];

    data.image = image_name;
    data.created_by = req.id;
    data.slug = data.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    let reg = await Product.create(data);
    let inventory = await Inventory.create({ product: reg._id, quantity: data.stock, created_by: req.id, supplier: req.id });
    res.status(200).json({ data: reg, inventory });
  } catch (error) {
    res.status(200).json({ data: undefined });
  }
};

const read_products = async (req, res = response) => {
  let filter = req.params["filter"];
  let [reg, count, total] = await Promise.all([
    Product.find({ active: new RegExp(filter, "i") })
      .populate("created_by", "email")
      .populate("category", "title")
      .sort({ category: -1 }),
    Product.find({ title: new RegExp(filter, "i") }).count(),
    Product.count(),
  ]);
  try {
    res.status(200).json({ data: reg, count, total });
  } catch (error) {
    res.status(200).json({ data: undefined });
  }
};

const list_product_public = async (req, res = response) => {
  let filter = req.params["filter"];
  let [reg, count, total] = await Promise.all([
    Product.find({ active: new RegExp(filter, "i"), status: true })
      .populate("created_by", "email")
      .populate("category", "title")
      .sort({ category: -1 }),
    Product.find({ title: new RegExp(filter, "i") }).count(),
    Product.count(),
  ]);
  try {
    res.status(200).json({ data: reg, count, total });
  } catch (error) {
    res.status(200).json({ data: undefined });
  }
};

const read_product_by_id = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Product.findById(id);
    res.status(200).json({ data: reg });
  } catch (error) {
    res.status(200).json({ data: undefined });
  }
};

const update_product = async (req, res = response) => {
  let id = req.params["id"];
  let { ...data } = req.body;

  data.slug = data.title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  if (req.files) {
    var img_path = req.files.image.path;
    var name = img_path.split("\\");
    var image = name[2];
    let reg = await Product.findByIdAndUpdate(id, { ...data, image });
    fs.stat("./uploads/products/" + reg.image, (err) => {
      if (!err) {
        fs.unlink("./uploads/products/" + reg.image, (err) => {
          if (err) throw err;
        });
      }
    });
    res.status(200).json({ data: reg });
  } else {
    let reg = await Product.findByIdAndUpdate(id, data);
    res.status(200).send({ data: reg });
  }
};

const delete_product = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Product.findById(id);
    await Product.findByIdAndDelete(id);
    fs.stat("./uploads/products/" + reg.image, (err) => {
      if (!err) {
        fs.unlink("./uploads/products/" + reg.image, (err) => {
          if (err) throw err;
        });
      }
    });
    res.status(200).json({ data: reg });
  } catch (error) {
    res.status(500).json({ msg: "Error inesperado..." });
  }
};

const change_status = async (req, res = response) => {
  let id = req.params["id"];
  let product = await Product.findById(id);
  if (product.status == true) {
    reg = await Product.findByIdAndUpdate(id, { status: false });
  } else {
    reg = await Product.findByIdAndUpdate(id, { status: true });
  }
  res.status(200).json({ data: reg });
};

const change_variety = async (req, res = response) => {
  let id = req.params["id"];
  let data = req.body;
  let reg = await Product.findByIdAndUpdate(id, { title_variety: data.title_variety, items_variety: data.items_variety });
  res.status(200).json({ data: reg });
};

const add_items_galery = async (req, res = response) => {
  let id = req.params["id"];
  let data = req.body;

  var img_path = req.files.image.path;
  var name = img_path.split("\\");
  var image_name = name[2];

  let reg = await Product.findByIdAndUpdate(id, {
    $push: {
      galery: {
        _id: data._id,
        image: image_name,
      },
    },
  });

  res.status(200).json({ data: reg });
};

const del_items_galery = async (req, res = response) => {
  let id = req.params["id"];
  let data = req.body;

  let reg = await Product.findByIdAndUpdate(id, {
    $pull: {
      galery: {
        _id: data._id,
      },
    },
  });

  fs.stat("./uploads/products/" + data.image, (err) => {
    if (!err) {
      fs.unlink("./uploads/products/" + data.image, (err) => {
        if (err) throw err;
      });
    }
  });

  res.status(200).json({ data: reg });
};

const list_product_by_slug = async (req, res = response) => {
  let slug = req.params["slug"];
  try {
    let reg = await Product.findOne({ slug }).populate("category");
    if (reg.status == true) {
      res.status(200).send({ data: reg });
    } else {
      res.status(200).send({ data: undefined });
    }
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

const list_product_news = async (req, res = response) => {
  try {
    let reg = await Product.find().sort({ created_at: -1 }).limit(9);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

const list_product_sales = async (req, res = response) => {
  try {
    let reg = await Product.find().sort({ num_sales: -1 }).limit(9);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

const list_product_recomended = async (req, res = response) => {
  let category = req.params["category"];
  try {
    let reg = await Product.find({ category }).sort({ created_at: -1 }).limit(9);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(200).send({ data: "undefined" });
  }
};

module.exports = {
  create_product,
  read_products,
  read_product_by_id,
  update_product,
  delete_product,
  change_status,
  change_variety,
  add_items_galery,
  del_items_galery,
  list_product_public,
  list_product_by_slug,
  list_product_news,
  list_product_sales,
  list_product_recomended,
  image,
};
