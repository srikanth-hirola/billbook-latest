import React from 'react'
import './DashboardBackup.css'
import Visitorschart from './VisitorsChart';
const DashboardBackup = () => {
    return (
        <>
            <div className='todaysales-parent'>
                <div className="row">
                    <div className="col-md-12">
                        <div className='todaysales-sub2'>
                            <div className="col-md-12">
                                <div className='todaysales-sub2-parent'>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className='todaysales-sub'>
                                                <div className='todaysales-sub-text1'>
                                                    <h4>Today's Sales</h4>
                                                    <p>Sales Summery</p>
                                                </div>
                                                <button className='btn'>
                                               <div className='todaysales-sub-text2'>
                                                    <div className='todaysales-export-icon'>
                                                        <img src="/images/export.png" alt="" />
                                                    </div>
                                                    <p>Export</p>
                                                </div>
                                               </button>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className='todaysales-sub2-content'>
                                                        <div className='todaysales-sub2-content-icon'>
                                                            <img src="/images/billbookicon.png" alt="" />
                                                        </div>
                                                        <div className='totalorders-sub2-content-text'>
                                                            <h5>$1k</h5>
                                                            <p className='totalsales'>Total Sales</p>
                                                            {/* <p className='todaysales-sub2-content-day'>+8% from yesterday</p> */}
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className='totalorders-sub2-content'>
                                                        <div className='todaysales-sub2-content-icon'>
                                                            <img src="/images/billbookicon4.png" alt="" />
                                                        </div>
                                                        <div className='totalorders-sub2-content-text'>
                                                            <h5>300</h5>
                                                            <p className='totalsales'>Total Orders</p>
                                                            {/* <p className='todaysales-sub2-content-day'>+5% from yesterday</p> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className='ProductSold-sub2-content'>
                                                        <div className='todaysales-sub2-content-icon'>
                                                            <img src="/images/billbookicon3.png" alt="" />
                                                        </div>
                                                        <div className='totalorders-sub2-content-text'>
                                                            <h5>5</h5>
                                                            <p className='totalsales'>Product Sold</p>
                                                            {/* <p className='todaysales-sub2-content-day'>+1,2% from yesterday</p> */}
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className='NewCustomers-sub2-content'>
                                                        <div className='todaysales-sub2-content-icon'>
                                                            <img src="/images/billbookicon2.png" alt="" />
                                                        </div>
                                                        <div className='totalorders-sub2-content-text'>
                                                            <h5>8</h5>
                                                            <p className='totalsales'>New Customers</p>
                                                            {/* <p className='todaysales-sub2-content-day'>0,5% from yesterday</p> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <Visitorschart />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>

    )
}

export default DashboardBackup;
