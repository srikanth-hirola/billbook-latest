import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import "../_components/antd.css";
import { Input, Pagination, Space, Table } from "antd";
//import Data from "../assets/jsons/quotations";
import FeatherIcon from "feather-icons-react";
import {
  onShowSizeChange,
  itemRender,
} from "../_components/paginationfunction";
import AddVendor from "../vendors/addVendor";
import axios from 'axios';

const Quotations = () => {
  const [menu, setMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [datasource, setDatasource] = useState([]);
  const [searchText, setSearchText] = useState("");

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  // const datasource = Data?.Data;
  // console.log(datasource);

  useEffect(() => {
    axios.get("http://localhost:8000/api/addQuotation/quotations")
      .then(response => {
        const dataWithIds = response.data.map((item, index) => ({
          ...item,
          id: index + 1, 
        }));

        setDatasource(dataWithIds);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleReset = () => {
    setSearchText("");
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      sorter: (a, b) => a.id.length - b.id.length,
    },
    {
      title: "Quotation ID",
      dataIndex: "quotationId",
      sorter: (a, b) => a.quotationId.length - b.quotationId.length,
    },
    {
      title: "Customer",
      dataIndex: "selectCustomer",
      render: (text, record) => (
        <>
          <h2 className="table-avatar">
            <Link to="/profile" className="avatar avatar-sm me-2">
              <img
                className="avatar-img rounded-circle"
                src={record.Img}
                alt="User Image"
              />
            </Link>
            <Link to="/profile">
              {record.selectCustomer} <span>{record.phone}</span>
            </Link>
          </h2>
        </>
      ),
      sorter: (a, b) => a.selectCustomer.length - b.selectCustomer.length,
    },
    {
        title: "Created On",
        dataIndex: "quotationDate",
        sorter: (a, b) => a.quotationDate.length - b.quotationDate.length,
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text, record) => (
        <div>
          {text === "Paid" && (
            <span className="badge bg-success-light text-success-light">
              {text}
            </span>
          )}
          {text === "Pending" && (
            <span className="badge bg-warning-light text-warning-light">
              {text}
            </span>
          )}
          {text === "Cancelled" && (
            <span className="badge bg-danger-light">{text}</span>
          )}
        </div>
      ),
      sorter: (a, b) => a.Status.length - b.Status.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <>
          <div className="d-flex align-items-center">
            <div className="dropdown dropdown-action">
              <Link
                to="#"
                className=" btn-action-icon "
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <ul>
                  <li>
                    <Link className="dropdown-item" to="/edit-quotations">
                      <i className="far fa-eye me-2" />
                      Edit
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="far fa-trash-alt me-2" />
                      Delete
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ),
      sorter: (a, b) => a.action.length - b.action.length,
    },
  ];

  return (
    <>
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar />

        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="content-page-header">
                <h5>Quotations</h5>
                <Input className="searh-input"
        placeholder="Search by name or phone number"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: 300, marginBottom:0,padding:6,border: "none",boxShadow: "0px 2px 8px 0px rgba(99, 99, 99, 0.2)" }}
      />
      <Space>
        <button onClick={handleReset} size="small" style={{ width: 90, padding: 7, background: "#ed2020", border: "none", boxShadow: "0px 2px 8px 0px rgba(99, 99, 99, 0.2)", borderRadius: 7, color: "#fff", 
                      position: "relative",
                      left: "-30px"}}>
          Reset
        </button>
      </Space>
                <div className="list-btn">
                  <ul className="filter-list">
                    <li>
                      <Link className="btn btn-filters w-auto popup-toggle"
                        onClick={() => setShow(!show)}
                      >
                        <span className="me-2">
                          {/* <i className="fe fe-filter" /> */}
                          <FeatherIcon icon="filter" />
                        </span>
                        Filter{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className="btn-filters" to="#">
                        <span>
                          {/* <i className="fe fe-settings" /> */}
                          <FeatherIcon icon="settings" />
                        </span>{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className="btn-filters" to="#">
                        <span>
                          {/* <i className="fe fe-grid" /> */}
                          <FeatherIcon icon="grid" />
                        </span>{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className="active btn-filters" to="#">
                        <span>
                          {/* <i className="fe fe-list" /> */}
                          <FeatherIcon icon="list" />
                        </span>{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className="btn btn-primary" to="/add-quotations">
                        <i
                          className="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        />
                        Create Quotations
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            {/* Search Filter */}
            <div id="filter_inputs" className="card filter-card">
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-sm-6 col-md-3">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Search Filter */}
            {/* Table */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card-table">
                  <div className="card-body purchase">
                    <div className="table-responsive table-hover">
                    <Table
                        pagination={{
                          total: datasource ? datasource.length : 0,

                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        columns={columns}
                        dataSource={datasource.filter((record) =>
                          record?.Amount?.includes(searchText) ||
                          record?.Reference
                          ?.includes(searchText) ||
                          record?.selectCustomer?.toLowerCase().includes(searchText.toLowerCase()) ||
                          record?.quotationId?.toLowerCase().includes(searchText.toLowerCase())
                        )}
                        rowKey={(record) => record.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Table */}
          </div>
        </div>

        <AddVendor 
          setShow={setShow}
          show={show}
        />

        <div className="modal custom-modal fade" id="delete_modal" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Purchases</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <button
                        type="reset"
                        data-bs-dismiss="modal"
                        className="w-100 btn btn-primary paid-continue-btn"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        className="w-100 btn btn-primary paid-cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quotations;
