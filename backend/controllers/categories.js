const { response } = require("express");
const Category = require("../models/category");
var path = require("path");
var fs = require("fs");

// localhost:3000/api/categories/image/default.png //
const image = async (req, res = response) => {
  let img = req.params["img"];
  fs.stat("./uploads/categories/" + img, (err) => {
    if (!err) {
      let path_img = "./uploads/categories/" + img;
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = "./uploads/default.png";
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};

const create_category = async (req, res = response) => {
  let data = req.body;
  try {
    var img_path = req.files["image"].path;
    var name = img_path.split("\\");
    var image_name = name[2];
    data.image = image_name;
    data.created_by = req.id;
    let reg = await Category.create(data);
    res.status(200).json({ data: reg });
  } catch (error) {
    res.status(200).json({ data: undefined });
  }
};

const read_category = async (req, res = response) => {
  let filter = req.params["filter"];
  let reg = await Category.find({ title: new RegExp(filter, "i") })
    .populate("created_by", "email")
    .sort({ created_at: -1 });
  try {
    res.status(200).json({ data: reg });
  } catch (error) {
    res.status(200).json({ data: undefined });
  }
};

const read_category_by_id = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Category.findById(id);
    res.status(200).json({ data: reg });
  } catch (error) {
    res.status(200).json({ data: undefined });
  }
};

const update_category = async (req, res = response) => {
  let id = req.params["id"];
  let { ...data } = req.body;

  if (req.files) {
    var img_path = req.files.image.path;
    var name = img_path.split("\\");
    var image = name[2];
    let reg = await Category.findByIdAndUpdate(id, { ...data, image });
    fs.stat("./uploads/categories/" + reg.image, (err) => {
      if (!err) {
        fs.unlink("./uploads/categories/" + reg.image, (err) => {
          if (err) throw err;
        });
      }
    });
    res.status(200).json({ data: reg });
  } else {
    let reg = await Category.findByIdAndUpdate(id, data);
    res.status(200).send({ data: reg });
  }
};

const delete_category = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Category.findById(id);
    await Category.findByIdAndDelete(id);
    fs.stat("./uploads/categories/" + reg.image, (err) => {
      if (!err) {
        fs.unlink("./uploads/categories/" + reg.image, (err) => {
          if (err) throw err;
        });
      }
    });
    res.status(200).json({ data: reg });
  } catch (error) {
    res.status(500).json({ msg: "Error inesperado..." });
  }
};

module.exports = {
  create_category,
  read_category,
  read_category_by_id,
  update_category,
  delete_category,
  image,
};
