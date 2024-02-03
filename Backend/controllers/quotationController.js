const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const AddQuotations = require('../models/addQuotation');
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


router.post('/quotations', async (req, res) => {
  try {
    const formData = req.body;

    let signatureName = formData?.additionalDetails?.signatureName;

    if (signatureName) {
      const result = await cloudinary.uploader.upload(signatureName, {
        folder: 'billing',
      });
      signatureName = {
        url: result?.url,
        public_id: result?.public_id,
      };
      formData.additionalDetails.signatureName = signatureName;
    }

    const quotation = new AddQuotations(formData);

    const savedQuotation = await quotation.save();

    res.status(201).json(savedQuotation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/quotations', async (req, res) => {
  try {
    const quotations = await AddQuotations.find();

    res.status(200).json(quotations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});router.put('/quotations/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const existingQuotation = await AddQuotations.findById(id);
  
      if (!existingQuotation) {
        return res.status(404).json({ error: 'Quotation not found' });
      }
  
      let updatedSignatureName = updatedData?.additionalDetails?.signatureName;
  
      if (updatedSignatureName) {
        const result = await cloudinary.uploader.upload(updatedSignatureName, {
          folder: 'billing',
        });
        updatedSignatureName = {
          url: result?.url,
          public_id: result?.public_id,
        };
        updatedData.additionalDetails.signatureName = updatedSignatureName;
      }
  
      const updatedQuotation = await AddQuotations.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
  
      res.status(200).json(updatedQuotation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.delete('/quotations/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedQuotation = await AddQuotations.findByIdAndDelete(id);
  
      if (!deletedQuotation) {
        return res.status(404).json({ error: 'Quotation not found' });
      }
  
      res.status(204).send(); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
    




module.exports = router;
