const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const AddPurchases = require('../models/addPurchases');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/purchases', async (req, res) => {
  try {
    const {formData} = req.body;

    let signatureImage = formData?.bankDetails?.signatureImage;

    if (signatureImage) {
      const result = await cloudinary.uploader.upload(signatureImage, {
        folder: 'billing',
      });
      signatureImage = {
        url: result?.url,
        public_id: result?.public_id,
      };
      formData.bankDetails.signatureImage = signatureImage;
    }

    const purchases = new AddPurchases(formData);

    const savedPurchases = await purchases.save();

    res.status(201).json(savedPurchases);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET route to retrieve all purchases
router.get('/purchases', async (req, res) => {
  try {
    const purchases = await AddPurchases.find();

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT route to update a specific purchase by ID
router.put('/purchases/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const existingPurchases = await AddPurchases.findById(id);

    if (!existingPurchases) {
      return res.status(404).json({ error: 'Purchases not found' });
    }

    let updatedSignatureImage = updatedData?.bankDetails?.signatureImage;

    if (updatedSignatureImage) {
      const result = await cloudinary.uploader.upload(updatedSignatureImage, {
        folder: 'billing',
      });
      updatedSignatureImage = {
        url: result?.url,
        public_id: result?.public_id,
      };
      updatedData.bankDetails.signatureImage = updatedSignatureImage;
    }

    const updatedPurchases = await AddPurchases.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json(updatedPurchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE route to delete a specific purchase by ID
router.delete('/purchases/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPurchase = await AddPurchases.findByIdAndDelete(id);

    if (!deletedPurchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
