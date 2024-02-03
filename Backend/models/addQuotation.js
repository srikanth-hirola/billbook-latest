const mongoose = require('mongoose');

const addQuotationSchema = new mongoose.Schema({
  quotationId: {
    type: String,
    unique: true,
    required: true,
  },
  selectCustomer: {
    type: String,
    required: true,
  },
  quotationDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  referenceNo: {
    type: String,
    required: true,
  },
  createQuotationWithGST: {
    type: Boolean,
    required: true,
  },
  quotation: {
    type: String,
    required: true,
  },
  estimate: {
    type: Number,
    required: true,
  },
table: {
    product: {
      type: String,
    },
    quality: {
      type: Number,
    },
    unit: {
      type: String,
    },
    rate: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    amount: { 
      type: Number,
    },
    action: {
      type:String,
    }
  },
  bankDetails: {
    selectBank: {
      bankName: {
        type: String,
      },
      accountNumber:{
        type: String,
      },
      branchName: {
        type: String,
      },
      IFSCCode: {
        type: String,
    },
    notes: {
      type: String,
    },
    termsAndConditions:{
      type: String,
    },
    discountType: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalDiscount: {
      type: Number,
      default: 0,
    },
    signatureName:{
      type: String,
    },
    signatureImage:{
      url:String,
    public_id:String
    }
  },
},
});

module.exports = mongoose.model('AddQuotation', addQuotationSchema);
