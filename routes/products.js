const express = require("express");
const router = express.Router();
const productModel = require("../models/product");
router.get("/", async (req, res) => {
    try {
      const products = await productModel.find({}); // []
      res.render("index", { products });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router.post("/addProduct", async (req, res) => {
    
    try {
        
      const { libelle, prix, description, quantite } = req.body;
      const checkIfLibelleExists = await productModel.findOne({ libelle });
      if (checkIfLibelleExists) {
        throw new Error("Libelle already exists");
      }
      const newProduct = new productModel ({ libelle, prix, description, quantite });
      newProduct.save();
      res.redirect("/products");
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });

  //remove product 
  router.get("/removeProduct/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await productModel.findByIdAndDelete(id);
      res.redirect("/products");
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });
// update product 
router.get("/editProduct/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const productInfo = await productModel.findOne({ _id: id });
      res.render("update", { productInfo });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });
  router.post("/update/:id", async (req, res) => {
    try {
        const { libelle, prix, description, quantite } = req.body;
        const { id } = req.params;
        await productModel.findByIdAndUpdate(id, { libelle, prix, description, quantite });
        res.redirect("/products");
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});
  module.exports = router;