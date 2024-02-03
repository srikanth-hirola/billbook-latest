const mongoose = require('mongoose');

const addPurchasesSchema = new mongoose.Schema({
  purchasesId: {
    type: String,
    unique: true,
    required: true,
  },
  customerName: {
    type: String,
    required: true, 
  },
  purchasesDate: {
    type: Date,
    //required: true,
  },
  dueDate: {
    type: Date,
    //required: true, 
  },
  referenceNo: {
    type: String,
  },
  products: {
    type: String,
  },
   
  table: {
    product: {
      type: String,
    },
    quantity: {
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
      bankName: String,
      accountNumber:String,
      branchName:String,
      IFSCCode:String,
    notes:String,
    termsAndConditions:String,
    discountType:String,
    discount: {
      type: Number,
      default: 0,
    },
    totalDiscount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
        type: Number,
    },
    signatureName:String,
    signatureImage:{
      url:String,
    public_id:String
    }
  }
},
});

module.exports = mongoose.model('AddPurchases', addPurchasesSchema);
