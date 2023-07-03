import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import nodata from '../../assets/img/userdashboard/nodata.avif';
import { NavLink } from 'react-router-dom';
import global from "../../utils/global"



const AllTranfer = ({ status, data }) => {

  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    if (data?.length != 0) {
      if (status == "pending") {
        let pending = data.filter((item) => {
          return item.payment_status === "pending"
        })
        setTransactionData(pending)

      } else if (status == "completed") {
        let completed = data.filter((item) => {
          return item.payment_status === "completed"
        })
        setTransactionData(completed)
      } else {
        setTransactionData(data)
      }
    }
  }, [data])



  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="tabs-recipent-new">
            <span>
              {transactionData?.length > 0 ? (
                <Table className="table table-responsive-md card-table previous-transaction">
                  <thead>
                    <tr>
                      <th>Recipient</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      transactionData?.map((res, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <h6 className="fs-16 font-w600 mb-0">{res.recipient_name}</h6>
                            </td>
                            <td className="transaction-icon"><span className="text-uppercase">{res.send_currency} </span> {res.amount} </td>
                            <td>{res.date}</td>
                            <td>{res.reason}</td>
                            <td><span className="btn btn-outline-success btn-rounded" >{res.payment_status}</span></td>
                            <td>
                              <a href={`${global.serverUrl}/payment/receipt/${res.id}`} target="_blank">
                                <span className="btn btn-outline-success btn-rounded" >Download</span>
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </Table>
              ) : (
                <>
                  <div className="no-data">
                    <img src={nodata} alt="no-data no-data-transaction" height="400px" />
                    <div className="col-md-12">
                    </div>
                    <div className="col-md-12">
                      {
                        status === "completed" || "all" ? (
                          <NavLink to="/dashboard/new-transfer" className="send_money">Send Money</NavLink>
                        ) : (
                          <></>
                        )
                      }
                    </div>
                  </div>
                </>
              )
              }
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
export default AllTranfer;


