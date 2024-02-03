import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { Scrollbars } from "react-custom-scrollbars";
import { LogoImg, LogoSmallImg, logo, logo1, logoblack } from "../_components/imagepath";

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");

  const toggleSidebar = (value) => {
    console.log(value);
    setSideMenu(value);
  };

  useEffect(() => {
    function handleMouseOver(e) {
      e.stopPropagation();
      if (
        document.body.classList.contains("mini-sidebar") &&
        document.querySelector("#toggle_btn").offsetParent !== null
      ) {
        var targ = e.target.closest(".sidebar");
        if (targ) {
          document.body.classList.add("expand-menu");
          document
            .querySelectorAll(".subdrop + ul")
            .forEach((ul) => (ul.style.display = "block"));
        } else {
          document.body.classList.remove("expand-menu");
          document
            .querySelectorAll(".subdrop + ul")
            .forEach((ul) => (ul.style.display = "none"));
        }
        return false;
      }
    }

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  useEffect(() => {
    $(document).on("change", ".sidebar-type-four input", function () { 
      if ($(this).is(":checked")) {
        $(".sidebar").addClass("sidebar-eight");
        $(".sidebar-menu").addClass("sidebar-menu-eight");
        $(".menu-title").addClass("menu-title-eight");
        $(".header").addClass("header-eight");
        $(".header-left-two").addClass("header-left-eight");
        $(".user-menu").addClass("user-menu-eight");
        $(".dropdown-toggle").addClass("dropdown-toggle-eight");
        $(".white-logo").addClass("show-logo");
        $(
          ".header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)"
        ).addClass("hide-logo");
        $(".header-two .header-left-two .logo:not(.logo-small)").removeClass(
          "hide-logo"
        );
        $(".header-two .header-left-two .dark-logo").removeClass("show-logo");
      } else {
        $(".sidebar").removeClass("sidebar-eight");
        $(".sidebar-menu").removeClass("sidebar-menu-eight");
        $(".menu-title").removeClass("menu-title-eight");
        $(".header").removeClass("header-eight");
        $(".header-left-two").removeClass("header-left-eight");
        $(".user-menu").removeClass("user-menu-eight");
        $(".dropdown-toggle").removeClass("dropdown-toggle-eight");
        $(".white-logo").removeClass("show-logo");
        $(
          ".header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)"
        ).removeClass("hide-logo");
      }
    });
  }, []);

  let pathName = props.location.pathname;

  console.log("Working", pathName);

  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Link to="/index">
              <img src={logoblack} className="img-fluid logo" alt="" />
            </Link>
            <Link to="index.html">
              <img src={logo} className="img-fluid logo-small" alt="" />
            </Link>
          </div>
        </div>
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="95vh"
          thumbMinSize={30}
          universal={false}
          hideTracksWhenNotNeeded={true}
        >
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              {/* Main */}
              <ul>
                <li className="menu-title">
                  <span>Main</span>
                </li>
                <li
                  className={`${
                    "/index" === pathName ? "active submenu" : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "index" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu == "index" ? "" : "index")
                    }
                  >
                    <FeatherIcon icon="home" /> <span>Dashboard</span>{" "}
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "index" ? (
                    <ul
                      style={{
                        display: isSideMenu == "index" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/index"
                          className={`${"/index" === pathName ? "active" : ""}`}
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/chat" === pathName ||
                    "/calendar" === pathName ||
                    "/inbox" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "application" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "application" ? "" : "application"
                      )
                    }
                  >
                    <FeatherIcon icon="grid" /> <span> Application</span>{" "}
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "application" ? (
                    <ul
                      style={{
                        display: isSideMenu == "application" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/chat"
                          className={`${"/chat" === pathName ? "active" : ""}`}
                        >
                          Chat
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/calendar"
                          className={`${
                            "/calendar" === pathName ? "active" : ""
                          }`}
                        >
                          Calendar
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/inbox"
                          className={`${"/inbox" === pathName ? "active" : ""}`}
                        >
                          Email
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
              {/* /Main */}
              {/* Customers */}
              <ul>
                <li className="menu-title">
                  <span>Customers</span>
                </li>
                <li
                  className={`${
                    "/customers" === pathName ||
                    "/active-customers" === pathName ||
                    "/deactive-customers" === pathName ||
                    "/edit-customer" === pathName ||
                    "/add-customer" === pathName
                      ? "active"
                      : ""
                  }`}
                >
                  <Link to="/customers">
                    <FeatherIcon icon="users" />
                    <span>Customers</span>
                  </Link>
                </li>
              
                <li
                  className={`${
                    "/vendors" === pathName || "/add-ledger" === pathName
                      ? "active"
                      : ""
                  }`}
                >
                  <Link to="/vendors">
                    <FeatherIcon icon="user" /> <span>Vendors</span>
                  </Link>
                </li>
              </ul>
              {/* /Customers */}
              {/* Inventory */}
              <ul>
                <li className="menu-title">
                  <span>Inventory</span>
                </li>
                <li
                  className={`${
                    "/product-list" === pathName ||
                    "/add-product" === pathName ||
                    "/edit-product" === pathName ||
                    "/category" === pathName ||
                    "/add-category" === pathName ||
                    "/units" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "product-service" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "product-service" ? "" : "product-service"
                      )
                    }
                  >
                    <FeatherIcon icon="package" />{" "}
                    <span> Product / Services</span>{" "}
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "product-service" ? (
                    <ul
                      style={{
                        display:
                          isSideMenu == "product-service" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/product-list"
                          className={`${
                            "/product-list" === pathName ? "active" : ""
                          }`}
                        >
                          Product List
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/category"
                          className={`${
                            "/category" === pathName ? "active" : ""
                          }`}
                        >
                          Category
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/units"
                          className={`${"/units" === pathName ? "active" : ""}`}
                        >
                          Units
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                {/* <li
                  className={`${
                    "/inventory" === pathName || "/inventory" === pathName
                      ? "active"
                      : ""
                  }`}
                >
                  <Link to="/inventory">
                    <FeatherIcon icon="user" /> <span>Inventory</span>
                  </Link>
                </li> */}
              </ul>
              {/* /Inventory */}

               {/* Inventory */}
               <ul>
                <li className="menu-title">
                  <span>Inventory</span>
                </li>
                <li
                  className={`${
                    "/inventory" === pathName || "/inventory" === pathName
                      ? "active"
                      : ""
                  }`}
                >
                  <Link to="/inventory">
                    <FeatherIcon icon="user" /> <span>Inventory</span>
                  </Link>
                </li>
                {/* <li
                  className={`${ 
                    "/stock-list" === pathName ||
                    "/available-stock" === pathName ||
                    "/out-of-stock" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "stocks" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "stocks" ? "" : "stocks"
                      )
                    }
                  >
                    <FeatherIcon icon="package" />{" "}
                    <span> Stocks </span>{" "}
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "stocks" ? (
                    <ul
                      style={{
                        display:
                          isSideMenu == "stocks" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/stock-list"
                          className={`${
                            "/stock-list" === pathName ? "active" : ""
                          }`}
                        >
                          Stock List
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/available-stock"
                          className={`${
                            "/available-stock" === pathName ? "active" : ""
                          }`}
                        >
                          Available Stocks
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/out-of-stock"
                          className={`${"/out-of-stock" === pathName ? "active" : ""}`}
                        >
                          Out of stocks
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}

                <li
                  className={`${
                    "/godown-list" === pathName
                    // "/create-godown" === pathName ||
                    // "/edit-godown" === pathName
                      ? "active submenu"
                      : "submenu" 
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "godown" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "godown" ? "" : "godown"
                      )
                    }
                  >
                    <FeatherIcon icon="package" />{" "}
                    <span> Godown</span>{" "}
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "godown" ? (
                    <ul
                      style={{
                        display:
                          isSideMenu == "godown" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/godown-list"
                          className={`${
                            "/godown-list" === pathName ? "active" : ""
                          }`}
                        >
                          Godown List
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/create-godown"
                          className={`${
                            "/create-godown" === pathName ? "active" : ""
                          }`}
                        >
                          Create Godown
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link
                          to="/edit-godown"
                          className={`${"/edit-godown" === pathName ? "active" : ""}`}
                        >
                          Edit Godown
                        </Link>
                      </li> */}
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
              {/* /Inventory */}
              <ul>
                <li className="menu-title">
                  <span>Sales</span>
                </li>
                <li
                  className={`${
                    ("/invoice-list" === pathName ||
                      "/invoice-details" === pathName ||
                      "/invoice-paid" === pathName ||
                      "/invoice-overdue" === pathName ||
                      "/invoice-template" === pathName ||
                      "/invoice-draft" === pathName ||
                      "/invoice-recurring" === pathName ||
                      "/invoice-cancelled" === pathName ||
                      "/invoice-grid" === pathName ||
                      "/add-invoice" === pathName ||
                      "/edit-invoice" === pathName) &&
                    isSideMenu !== "payment" // Ensure "Payment" is not active
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu === "invoice-list" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu === "invoice-list" ? "" : "invoice-list"
                      )
                    }
                  >
                    <FeatherIcon icon="file" /> <span> Invoice</span>
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu === "invoice-list" ? (
                    <ul
                      style={{
                        display:
                          isSideMenu === "invoice-list" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/invoice-list"
                          className={`${
                            "/invoice-list" === pathName ? "active" : ""
                          }`}
                        >
                          Invoice List
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/invoice-template"
                          className={`${
                            "/invoice-template" === pathName ? "active" : ""
                          }`}
                        >
                          Invoices Template
                        </Link>
                      </li>
                      {/* Add Payment Component Link */}
                      <li>
                        <Link
                          to="/Payment" // Path for your Payment component
                          className={`${
                            "/Payment" === pathName ? "active" : ""
                          }`}
                        >
                          Payment
                        </Link>
                      </li>
                      {/* End of Payment Component Link */}
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/recurring-invoices" === pathName ||
                    "/recurring-paid" === pathName ||
                    "/recurring-pending" === pathName ||
                    "/recurring-overdue" === pathName ||
                    "/recurring-draft" === pathName ||
                    "/recurring" === pathName ||
                    "/recurring-cancelled" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link to="/recurring-invoices">
                    <FeatherIcon icon="clipboard" />{" "}
                    <span>Recurring Invoice</span>
                  </Link>
                </li>
                <li
                  className={`${
                    "/credit-notes" === pathName ||
                    "/add-credit-notes" === pathName ||
                    "/credit-notes-pending" === pathName ||
                    "/credit-notes-overdue" === pathName ||
                    "/credit-notes-draft" === pathName ||
                    "/credit-notes-recurring" === pathName ||
                    "/credit-notes-cancelled" === pathName
                      ? "active"
                      : ""
                  }`}
                >
                  <Link to="/credit-notes">
                    <FeatherIcon icon="edit" /> <span>Credit Notes</span>
                  </Link>
                </li>
              </ul>
              {/* /Purchases */}
              {/* Finance & Accounts */}
              <ul>
                <li className="menu-title">
                  <span>Finance &amp; Accounts</span>
                </li>
                <li className={`${"/expenses" === pathName ? "active" : ""}`}>
                  <Link to="/expenses">
                    <FeatherIcon icon="file-plus" /> <span>Expenses</span>
                  </Link>
                </li>
                <li className={`${"/payments" === pathName ? "active" : ""}`}>
                  <Link to="/payments">
                    <FeatherIcon icon="credit-card" /> <span>Payment</span>
                  </Link>
                </li>
                <li className={`${"/gst-list" === pathName ? "active" : ""}`}>
                  <Link to="/gst-list">
                    <FeatherIcon icon="credit-card" /> <span>GST</span>
                  </Link>
                </li>
                <li className={`${"/currency-list" === pathName ? "active" : ""}`}>
                  <Link to="currency-list">
                    <FeatherIcon icon="credit-card" /> <span>Currency</span>
                  </Link>
                </li>
                <li className={`${"/cash-bank" === pathName ? "active" : ""}`}>
                  <Link to="cash-bank">
                    <FeatherIcon icon="credit-card" /> <span>Cash & Bank </span>
                  </Link>
                </li>
              </ul>
              {/* /Finance & Accounts */}
              {/* Quotations */}
              <ul>
                <li className="menu-title">
                  <span>Quotations</span>
                </li>
                <li
                  className={`${
                    "/quotations" === pathName ||
                    "/add-quotations" === pathName ||
                    "/edit-quotations" === pathName
                      ? "active"
                      : ""
                  }`}
                >
                  <Link to="/quotations">
                    <FeatherIcon icon="clipboard" /> <span>Quotations</span>
                  </Link>
                </li>
                <li
                  className={`${
                    "/delivery-challans" === pathName ||
                    "/add-delivery-challans" === pathName ||
                    "/edit-delivery-challans" === pathName
                      ? "active"
                      : ""
                  }`}
                >
                  <Link to="/delivery-challans">
                    <FeatherIcon icon="file-text" />{" "}
                    <span>Delivery Challans</span>
                  </Link>
                </li>
              </ul>
              {/* /Quotations */}
              {/* Reports */}
              <ul>
                <li className="menu-title">
                  <span>Reports</span>
                </li>
                <li>
                  <Link to="/quotations">
                    <FeatherIcon icon="clipboard" /> <span>Quotations</span>
                  </Link>
                </li>
                <li
                  className={`${
                    "/payment-summary" === pathName ? "active" : ""
                  }`}
                >
                  <Link to="/payment-summary">
                    <FeatherIcon icon="credit-card" />{" "}
                    <span>Payment Summary</span>
                  </Link>
                </li>
              </ul>
              {/* /Reports */}
              {/* User Management */}
              <ul>
                <li className="menu-title">
                  <span>User Management</span>
                </li>
                <li
                  className={`${
                    "/manage-user" === pathName ||
                    "/add-user" === pathName ||
                    "/users" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "manage-user" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "manage-user" ? "" : "manage-user"
                      )
                    }
                  >
                    <FeatherIcon icon="user" /> <span>Manage Users </span>
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "manage-user" ? (
                    <ul
                      style={{
                        display: isSideMenu == "manage-user" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/add-user"
                          className={`${
                            "/add-user" === pathName ? "active" : ""
                          }`}
                        >
                          Add User
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/users"
                          className={`${"/users" === pathName ? "active" : ""}`}
                        >
                          Users
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/roles-permission" === pathName ||
                    "/permission" === pathName
                      ? "active"
                      : ""
                  }`}
                >
                  <Link to="/roles-permission">
                    <FeatherIcon icon="clipboard" />{" "}
                    <span>Roles &amp; Permission</span>
                  </Link>
                </li>
                <li
                  className={`${
                    "/delete-account-request" === pathName ? "active" : ""
                  }`}
                >
                  <Link to="/delete-account-request">
                    <FeatherIcon icon="trash-2" />{" "}
                    <span>Delete Account Request</span>
                  </Link>
                </li>
              </ul>
              {/* /User Management */}
              {/* Membership) */}
              <ul>
                <li className="menu-title">
                  <span>Membership</span>
                </li>
                <li
                  className={`${
                    "/membership-plans" === pathName ||
                    "/membership-addons" === pathName ||
                    "/add-membership" === pathName ||
                    "/transactions" === pathName ||
                    "/subscribers" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={
                      isSideMenu == "membership-plans" ? "subdrop" : ""
                    }
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "membership-plans"
                          ? ""
                          : "membership-plans"
                      )
                    }
                  >
                    <FeatherIcon icon="book" /> <span>Membership </span>
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "membership-plans" ? (
                    <ul
                      style={{
                        display:
                          isSideMenu == "membership-plans" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/membership-plans"
                          className={`${
                            "/membership-plans" === pathName ? "active" : ""
                          }`}
                        >
                          Membership Plan
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/membership-addons"
                          className={`${
                            "/membership-addons" === pathName ? "active" : ""
                          }`}
                        >
                          Membership Addons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/subscribers"
                          className={`${
                            "/subscribers" === pathName ? "active" : ""
                          }`}
                        >
                          Subscribers
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/transactions"
                          className={`${
                            "/transactions" === pathName ? "active" : ""
                          }`}
                        >
                          Transactions
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
              {/* /Membership) */}
              {/* Content (CMS) */}
              <ul>
                <li className="menu-title">
                  <span>Content (CMS)</span>
                </li>
                <li
                  className={`${
                    "/add-page" === pathName || "/pages" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "add-page" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu == "add-page" ? "" : "add-page")
                    }
                  >
                    <FeatherIcon icon="folder" /> <span>Pages </span>
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "add-page" ? (
                    <ul
                      style={{
                        display: isSideMenu == "add-page" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/add-page"
                          className={`${
                            "/add-page" === pathName ? "active" : ""
                          }`}
                        >
                          Add Page
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/pages"
                          className={`${"/pages" === pathName ? "active" : ""}`}
                        >
                          Page
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/all-blogs" === pathName ||
                    "/inactive-blog" === pathName ||
                    "/add-blog" === pathName ||
                    "/categories" === pathName ||
                    "/add-categories" === pathName ||
                    "/blog-comments" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "all-blogs" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "all-blogs" ? "" : "all-blogs"
                      )
                    }
                  >
                    <FeatherIcon icon="book" /> <span>Blog </span>
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "all-blogs" ? (
                    <ul
                      style={{
                        display: isSideMenu == "all-blogs" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/all-blogs"
                          className={`${
                            "/all-blogs" === pathName ? "active" : ""
                          }`}
                        >
                          All Blogs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/add-blog"
                          className={`${
                            "/add-blog" === pathName ? "active" : ""
                          }`}
                        >
                          Add Blog
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/categories"
                          className={`${
                            "/categories" === pathName ? "active" : ""
                          }`}
                        >
                          Categories
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/blog-comments"
                          className={`${
                            "/blog-comments" === pathName ? "active" : ""
                          }`}
                        >
                          Blog Comments
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/countries" === pathName ||
                    "/states" === pathName ||
                    "/cities" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "countries" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "countries" ? "" : "countries"
                      )
                    }
                  >
                    <FeatherIcon icon="map-pin" /> <span>Location</span>
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "countries" ? (
                    <ul
                      style={{
                        display: isSideMenu == "countries" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/countries"
                          className={`${
                            "/countries" === pathName ? "active" : ""
                          }`}
                        >
                          Countries
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/states"
                          className={`${
                            "/states" === pathName ? "active" : ""
                          }`}
                        >
                          States
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/cities"
                          className={`${
                            "/cities" === pathName ? "active" : ""
                          }`}
                        >
                          Cities
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/testimonials" === pathName ||
                    "/add-testimonials" === pathName ||
                    "/edit-testimonials" === pathName
                      ? "active"
                      : ""
                  }`}
                >
                  <Link to="/testimonials">
                    <FeatherIcon icon="message-square" />{" "}
                    <span>Testimonials</span>
                  </Link>
                </li>
                <li className={`${"/faq" === pathName ? "active" : ""}`}>
                  <Link to="/faq">
                    <FeatherIcon icon="alert-circle" /> <span>FAQ</span>
                  </Link>
                </li>
              </ul>
              {/* /Content (CMS) */}
              {/* Support */}
              <ul>
                <li className="menu-title">
                  <span>Support</span>
                </li>
                <li
                  className={`${
                    "/contact-messages" === pathName ? "active" : ""
                  }`}
                >
                  <Link to="/contact-messages">
                    <FeatherIcon icon="printer" /> <span>Contact Messages</span>
                  </Link>
                </li>
                <li
                  className={`${
                    "/tickets" === pathName ||
                    "/tickets-list-paid" === pathName ||
                    "/tickets-list" === pathName ||
                    "/tickets-pending" === pathName ||
                    "/tickets-overdue" === pathName ||
                    "/tickets-recurring" === pathName ||
                    "/tickets-draft" === pathName ||
                    "/tickets-cancelled" === pathName ||
                    "/tickets-list-overdue" === pathName ||
                    "/tickets-list-recurring" === pathName ||
                    "/tickets-list-cancelled" === pathName ||
                    "/tickets-kanban" === pathName ||
                    "/tickets-overview" === pathName ||
                    "/tickets-list-draft" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "tickets" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu == "tickets" ? "" : "tickets")
                    }
                  >
                    <FeatherIcon icon="save" /> <span>Tickets</span>
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "tickets" ? (
                    <ul
                      style={{
                        display: isSideMenu == "tickets" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/tickets"
                          className={`${
                            "/tickets" === pathName ? "active" : ""
                          }`}
                        >
                          Tickets
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/tickets-list"
                          className={`${
                            "/tickets-list" === pathName ? "active" : ""
                          }`}
                        >
                          Tickets List
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/tickets-kanban"
                          className={`${
                            "/tickets-kanban" === pathName ? "active" : ""
                          }`}
                        >
                          Tickets Kanban
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/tickets-overview"
                          className={`${
                            "/tickets-overview" === pathName ? "active" : ""
                          }`}
                        >
                          Tickets Overview
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
              {/* /Support */}
              {/* Authentication */}
              <ul>
                <li
                  className={`${
                    "/login" === pathName ? "active submenu" : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "login" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu == "login" ? "" : "login")
                    }
                  >
                    <FeatherIcon icon="lock" /> <span>Authentication</span>
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "login" ? (
                    <ul
                      style={{
                        display: isSideMenu == "login" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/login"
                          className={`${"/login" === pathName ? "active" : ""}`}
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/register"
                          className={`${
                            "/register" === pathName ? "active" : ""
                          }`}
                        >
                          Register
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/forgot-password"
                          className={`${
                            "/forgot-password" === pathName ? "active" : ""
                          }`}
                        >
                          Forget Password
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/lock-screen"
                          className={`${
                            "/lock-screen" === pathName ? "active" : ""
                          }`}
                        >
                          Lock Screen
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
              {/* /Authentication */}
            
              {/* Settings */}
              <ul>
                <li className="menu-title">
                  <span>Settings</span>
                </li>
                <li className={`${"/settings" === pathName ? "active" : ""}`}>
                  <Link to="/settings">
                    <FeatherIcon icon="settings" /> <span>Settings</span>
                  </Link>
                </li>
                <li className={`${"/login" === pathName ? "active" : ""}`}>
                  <Link to="/login">
                    <FeatherIcon icon="power" /> <span>Logout</span>
                  </Link>
                </li>
              </ul>
              {/* /Settings */}
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};
export default withRouter(Sidebar);
