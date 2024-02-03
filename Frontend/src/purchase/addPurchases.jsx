import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import Select2 from "react-select2-wrapper";
import DatePicker from "react-datepicker";
import "../_components/antd.css";
import { Table } from "antd";
import FeatherIcon from "feather-icons-react";
import {
  onShowSizeChange,
  itemRender,
} from "../_components/paginationfunction";
import axios from "axios";

const AddPurchases = () => {
  const [menu, setMenu] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [formData, setFormData] = useState({
    purchasesId: '',
    customerName: '',
    purchasesDate: new Date(),
    dueDate: new Date(),
    referenceNo: '',
    products: '',
    table: {
      product: '',
      quantity: 0,
      unit: '',
      rate: 0,
      discount: 0,
      tax: 0,
      amount: 0,
      action: '',
    },
    bankDetails: {
      selectBank: {
        bankName: '',
        accountNumber: '',
        branchName: '',
        IFSCCode: '',
      },
      notes: '',
      termsAndConditions: '',
      discountType: '',
      discount: '',
      totalDiscount: '',
      signatureName: '',
      signatureImage: null,
    },
  });

  



  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  

  const [productOption, setProductOption] = useState([
    { id: 1, text: "Select Product" },
    { id: 2, text: "Product 1" },
    { id: 3, text: "Product 2" },
    { id: 4, text: "Product 3" },
  ]);

  const [currency, setCurrency] = useState([
    { id: 1, text: "Select Currency" },
    { id: 2, text: "US dollar" },
    { id: 3, text: "Euro" },
    { id: 4, text: "Pound sterling" },
    { id: 5, text: "Swiss franc" },
  ]);

  const [percentage, setPercentage] = useState([
    { id: 1, text: "Percentage(%)" },
    { id: 2, text: "0%" },
    { id: 3, text: "5%" },
    { id: 4, text: "10%" },
    { id: 5, text: "15%" },
  ]);

  const [tax, setTax] = useState([
    { id: 1, text: "N/A" },
    { id: 2, text: "5%" },
    { id: 3, text: "10%" },
    { id: 4, text: "15%" },
  ]);
  

  

  // useEffect(() => {
  //   let elements = Array.from(
  //     document.getElementsByClassName("react-datepicker-wrapper")
  //   );
  //   elements.map((element) => element.classList.add("w-100"));
  // }, []);


  useEffect(() => {
    console.log('Component updated:', formData);
  }, [formData]);
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index][field] = value;
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleTableChange = (field, value) => {
    setFormData({ ...formData, table: { ...formData.table, [field]: value } });
  };

  const handleBankDetailsChange = (field, value) => {
    setFormData({
      ...formData,
      bankDetails: { ...formData.bankDetails, [field]: value },
    });
  };
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setDiscountData({ ...discountData, [name]: value });
  // };

  const handleTaxChange = (selectedOption) => {
    setDiscountData({ ...discountData, tax: selectedOption });
  };

  const handleDateChange = (fieldName, date) => {
    console.log('handleDateChange called'); 
    setFormData({ ...formData, [fieldName]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Hello",formData)

    try {
      const response = await axios.post(
        'http://localhost:8000/api/addPurchases/purchases',
        {formData}
      );
  
      console.log('Data submitted successfully:', response.data);
  
      // Update the state with the new data
      setDatasource([...datasource, response.data]);
  
      // Close the modal
      setShow(false);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  // const handleInputChange = (fieldName, value) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [fieldName]: value,
  //   }));

  // if (fieldName === 'products') {
  //   const selectedProduct = product.find((prod) => prod._id === value);

  //   setFormData((preFormData) => ({
  //     ...(preFormData),
  //     name: selectedProduct ? slectedProducts: '',
  //   }))
  // }


  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64Image = reader.result;
  //       console.log(base64Image)
  //       setFormData({
  //         ...formData,
  //         bankDetails: {
  //           ...formData.bankDetails,
  //           signatureImage: base64Image,
  //         },
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          signatureImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const [selectedproduct, setSelectedProduct] = useState();
  const [selectedProductId, setSelectedProductId] = useState([]);


  useEffect(()=>{
    console.log("productby id",selectedProductId);
  },[selectedProductId])


  const fetchProductsbyId = async (selectedproduct) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/addProduct/products/${selectedproduct}`);
      console.log(response.data);
      setSelectedProductId(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  useEffect(() => {
    if(selectedproduct){
      fetchProductsbyId(selectedproduct);
    }
  }, [selectedproduct]);

  const [customer, setCustomer] = useState([]);
  console.log('customer',customer);

  const customeroptions = customer.map((cus) => ({
    id: cus._id,
    text: cus.name
  })); 

  const handleproductchange = (e) => {
    console.log(e.target.value)
    setSelectedProduct(e.target.value)
  }


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/addCustomer/customers");
        console.log(response.data);
        setCustomer([
          { id: 1, text: "Select Item Category" },
          ...response.data,
        ]);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
  
    fetchCustomers();
  }, []);

  const [product, setProduct] = useState([]);
  console.log('product',product);

  const productoptions = product.map((product) => ({
    id: product._id,
    text: product.name
  })); 


  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/addProduct/products");
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  



  return (
    <>
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar />
        {/* <!-- Page Wrapper --> */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="content-page-header">
                <h5>Create Purchases</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group-item border-0 mb-0">
                      <div className="row align-item-center">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Purchases Id</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter First Name"
                              value={formData.purchasesId}
                            onChange={(e) => handleInputChange('purchasesId', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Customer Name</label>
                            <ul className="form-group-plus css-equal-heights">
                              <li>
                                <Select2
                                  // className="w-100"
                                  data={customeroptions}
                                  options={{
                                    placeholder: "Choose Customer",
                                  }}
                                  value={formData.customerName}
                                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                                />
                              </li>
                              <li>
                                <Link
                                  className="btn btn-primary form-plus-btn"
                                  to="/add-customer"
                                >
                                  {/* <i className="fe fe-plus-circle" /> */}
                                  <FeatherIcon icon="plus-circle" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Purchases Date</label>
                            <div className="cal-icon cal-icon-info">
                              <DatePicker
                                className="datetimepicker form-control"
                              
                                selected={formData.purchasesDate}
                              onChange={(date) => handleDateChange('purchasesDate', date)}
                              ></DatePicker>
                              {/* <FeatherIcon icon="calendar"/> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Due Date</label>
                            <div className="cal-icon cal-icon-info">
                              <DatePicker
                                className="datetimepicker form-control"
                                selected={formData.dueDate}
                              onChange={(date) => handleDateChange('dueDate', date)}
                              ></DatePicker>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Reference No</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Phone Number"
                              value={formData.referenceNo}
                            onChange={(e) => handleInputChange('referenceNo', e.target.value)}
                            />
                          </div>
                        </div>
                       
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Products</label>
                            <ul className="form-group-plus css-equal-heights">
                              <li>
                                {/* <select className="select">
                                  <option>Select Product</option>
                                  <option>Product 1</option>
                                  <option>Product 2</option>
                                  <option>Product 3</option>
                                </select> */}
                                <Select2
                                  // className="w-100"
                                  data={productoptions}
                                  options={{
                                    placeholder: "Select Product",
                                  }}
                                  value={selectedproduct}
                                  // onChange={(e) => handleInputChange('products', e.target.value)}
                                  onChange={handleproductchange}
                                  // onSelect={handleselectedproduct}
                                />
                              </li>
                              <li>
                                <Link
                                  className="btn btn-primary form-plus-btn"
                                  to="/add-product"
                                >
                                  {/* <i className="fe fe-plus-circle" /> */}
                                  <FeatherIcon icon="plus-circle" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Currency</label>
                            <Select2
                              // className="w-100"
                              data={currency}
                              options={{
                                placeholder: "Select Currency",
                              }}
                              value={formData.currency}
                                  onChange={(e) => handleInputChange('currency', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Website</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Website Address"
                              value={formData.website}
                              onChange={(e) => setFormData({ ...formData, website: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Notes</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Your Notes"
                              value={formData.notes}
                              onChange={(e) => setFormData({ ...formData, notes: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group-item">
                      <div className="card-table">
                        <div className="card-body add-invoice">
                          <div className="table-responsive">
                            <table className="table table-center table-hover datatable">
                              <thead className="thead-light">
                                <tr>
                                  <th>Product / Service</th>
                                  <th>Quantity</th>
                                  <th>Unit</th>
                                  <th>Rate</th>
                                  <th>Discount</th>
                                  <th>Tax</th>
                                  <th>Amount</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
  <tr>
    <td>{selectedProductId.name}</td>
    <td>
    <input
                              type="text"
                              name="re_invoice"
                              checked={formData.table.quantity}
                              onChange={(e) => handleInputChange('quantity', e.target.checked)}
                            />
    </td>
    <td>
       <input
                              type="text"
                              name="re_invoice"
                              checked={formData.table.unit}
                              onChange={(e) => handleInputChange('unit', e.target.checked)}
                            />
    </td>
    <td>
    <input
                              type="text"
                              name="re_invoice"
                              checked={formData.table.rate}
                              onChange={(e) => handleInputChange('rate', e.target.checked)}
                            />
    </td>
    <td>
    <input
                              type="text"
                              name="re_invoice"
                              checked={formData.table.discount}
                              onChange={(e) => handleInputChange('discount', e.target.checked)}
                            />
    </td>
    <td>
    <input
                              type="text"
                              name="re_invoice"
                              checked={formData.table.tax}
                              onChange={(e) => handleInputChange('tax', e.target.checked)}
                            />
    </td>
    <td>
    <input
                              type="text"
                              name="re_invoice"
                              checked={formData.table.amount}
                              onChange={(e) => handleInputChange('amount', e.target.checked)}
                            />
    </td>
    <td className="d-flex align-items-center">
      <Link
        to="#"
        className="btn-action-icon me-2"
        data-bs-toggle="modal"
        data-bs-target="#add_discount"
      >
        <span>
          {/* <i className="fe fe-edit" /> */}
          <FeatherIcon icon="edit" />
        </span>
      </Link>
      <Link
        to="#"
        className="btn-action-icon"
        data-bs-toggle="modal"
        data-bs-target="#delete_discount"
      >
        <span>
          {/* <i className="fe fe-trash-2" /> */}
          <FeatherIcon icon="trash-2" />
        </span>
      </Link>
    </td>
  </tr>
</tbody>

                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group-item border-0 p-0">
                      <div className="row">
                        <div className="col-xl-6 col-lg-12">
                          <div className="form-group-bank">
                            <div className="form-group">
                              <label>Select Bank</label>
                              <div className="bank-3">
                                <Link
                                  className="text-danger-light"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#bank_details"
                                >
                                  <i className="fas fa-bank me-2" />
                                  Add Bank Details
                                </Link>
                              </div>
                            </div>
                            <div className="form-group notes-form-group-info">
                              <label>Notes</label>
                              <textarea
                                className="form-control"
                                placeholder="Enter Notes"
                                value={formData.bankDetails.notes}
                              onChange={(e) => setFormData({ ...formData, bankDetails: { ...formData.bankDetails, notes: e.target.value } })}
                              />
                            </div>
                            <div className="form-group notes-form-group-info mb-0">
                              <label>Terms and Conditions</label>
                              <textarea
                                className="form-control"
                                placeholder="Enter Terms and Conditions"
                                value={formData.bankDetails.termsAndConditions}
                              onChange={(e) => setFormData({ ...formData, bankDetails: { ...formData.bankDetails, termsAndConditions: e.target.value } })}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-12">
                          <div className="form-group-bank">
                            <div className="row">
                              <div className="col-lg-4 col-md-12">
                                <div className="form-group">
                                  <label>Discount Type</label>
                                  <Select2
                                    // className="w-100"
                                    data={percentage}
                                    options={{
                                      placeholder: "Percentage(%)",
                                    }}
                        
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-12">
                                <div className="form-group">
                                  <label>Discount (%)</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={10}
                                    value={formData.bankDetails.discount}
                                  onChange={(e) => setFormData({
                                    ...formData,
                                    bankDetails: {
                                      ...formData.bankDetails,
                                      discount: e.target.value,
                                    },
                                  })}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-12">
                                <div className="form-group">
                                  <label>Total discount</label>
                                  <input
                                    type="text"
                                    className="bg-white-smoke form-control"
                                    placeholder="13.2"
                                    value={formData.bankDetails.totalDiscount}
                                  onChange={(e) => setFormData({
                                    ...formData,
                                    bankDetails: {
                                      ...formData.bankDetails,
                                      totalDiscount: e.target.value,
                                    },
                                  })}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="invoice-total-box">
                              <div className="invoice-total-inner">
                                <p>
                                  Taxable Amount <span>$120.00</span>
                                </p>
                                <p>
                                  Discount <span>$13.20</span>
                                </p>
                                <p>
                                  Vat <span>$0.00</span>
                                </p>
                                <div className="status-toggle justify-content-between">
                                  <div className="d-flex align-center">
                                    <p>Round Off </p>
                                    <input
                                      id="rating_1"
                                      className="check"
                                      type="checkbox"
                                      defaultChecked="true"
                                    />
                                    <label
                                      htmlFor="rating_1"
                                      className="checktoggle checkbox-bg"
                                    >
                                      checkbox
                                    </label>
                                  </div>
                                  <span>$0.00</span>
                                </div>
                              </div>
                              <div className="invoice-total-footer">
                                <h4>
                                  Total Amount <span>$107.80</span>
                                </h4>
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Signature Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Signature Name"
                                value={formData.signatureName}
                              onChange={(e) => setFormData({ ...formData, signatureName: e.target.value})}
                              />
                            </div>
                            <div className="form-group mb-0">
  <label>Signature Image</label>
  <div className="form-group service-upload service-upload-info mb-0">
    <span>
      <FeatherIcon icon="upload-cloud" className="me-1" />
      Upload Signature
    </span>
    <input
      type="file"
      multiple=""
      id="image_sign"
      onChange={handleFileChange}
    />
    <div id="frames" />
  </div>
  {formData.signatureImage && (
    <img
      src={formData.signatureImage}
      alt="Signature"
      className="uploaded-signature"
    />
  )}

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="add-customer-btns text-end">
                      <button
                        type="reset"
                        className="btn btn-primary cancel me-2"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary"  onClick={handleSubmit}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Tax & Discount Modal */}
        <div
          className="modal custom-modal fade"
          id="add_discount"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <div className="form-header modal-header-title text-start mb-0 align-center">
                  <h4 className="mb-0">Add Tax &amp; Discount</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="align-center" aria-hidden="true">
                    ×
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Rate</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder={120}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Discount Amount</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group mb-0">
                      <label>Tax</label>
                      <Select2
                        // className="w-100"
                        data={tax}
                        options={{
                          placeholder: "Choose Customer",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer add-tax-btns">
                <button
                  type="reset"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-cancel-btn me-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-continue-btn"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* /Add Tax & Discount Modal */}

        {/* Delete Items Modal */}
        <div
          className="modal custom-modal fade"
          id="delete_discount"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 justify-content-center pb-0">
                <div className="form-header modal-header-title text-center mb-0">
                  <h4 className="mb-2">Delete Product / Services</h4>
                  <p>Are you sure want to delete?</p>
                </div>
              </div>
              <div className="modal-body">
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <Link
                        to="#"
                        data-bs-dismiss="modal"
                        className="btn btn-primary paid-continue-btn"
                      >
                        Delete
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        to="#"
                        data-bs-dismiss="modal"
                        className="btn btn-primary paid-cancel-btn"
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Items Modal */}

        {/* Add Bank Details Modal */}
        <div
          className="modal custom-modal fade"
          id="bank_details"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Add Bank Details</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="align-center" aria-hidden="true">
                    ×
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Bank Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Bank Name"
                        value={formData.bankDetails.selectBank.bankName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankDetails: {
                          ...formData.bankDetails,
                          selectBank: {
                            ...formData.bankDetails.selectBank,
                            bankName: e.target.value,
                          },
                        },
                      })
                    }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Account Number <span className="text-danger">*</span>
                      </label>
                      <input
                      type="text"
                        className="form-control"
                        placeholder="Enter Account Number"
                      value={formData.bankDetails.selectBank.accountNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankDetails: {
                          ...formData.bankDetails,
                          selectBank: {
                            ...formData.bankDetails.selectBank,
                            accountNumber: e.target.value,
                          },
                        },
                      })
                    }
                    />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Branch Name <span className="text-danger">*</span>
                      </label>
                      <input
                      type="text"
                        className="form-control"
                        placeholder="Enter Branch Name"
                      value={formData.bankDetails.selectBank.branchName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankDetails: {
                          ...formData.bankDetails,
                          selectBank: {
                            ...formData.bankDetails.selectBank,
                            branchName: e.target.value,
                          },
                        },
                      })
                    }
                    />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group mb-0">
                      <label>
                        IFSC Code <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter IFSC COde"
                         value={formData.bankDetails.selectBank.branchName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankDetails: {
                          ...formData.bankDetails,
                          selectBank: {
                            ...formData.bankDetails.selectBank,
                            branchName: e.target.value,
                          },
                        },
                      })
                    }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-cancel-btn me-2"
                >
                  Back
                </Link>
                {/* <Link
                  to="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary paid-continue-btn"
                  onClick={() => handleSave()}
                >
                  Save
                </Link> */}
              </div>
            </div>
          </div>
        </div>
        {/* /Add Bank Details Modal */}
      </div>
    </>
  );
};
export default AddPurchases;
