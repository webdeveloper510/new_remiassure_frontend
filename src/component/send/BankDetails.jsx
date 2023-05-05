import React from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import clsx from 'clsx';
import { useState } from 'react';


const BankDetails = ({ handleBankDetail, handleStep, step }) => {

  const [data, setData] = useState({
    bank: "", acc_name: "", acc_no: "", f_name: "", l_name: "", m_name: "", email: "", mobile: "",
    flat: "", build_no: "", street: "", city: "", post_code: "", state: "", country: "", reason: ""
  })

  const initialValues = {
    bank: "", acc_name: "", acc_no: "", f_name: "", l_name: "", m_name: "", email: "", mobile: "",
    flat: "", build_no: "", street: "", city: "", post_code: "", state: "", country: "", reason: ""
  }

  const bankSchema = Yup.object().shape({
    bank: Yup.string()
      .min(2, 'Minimum 3 symbols')
      .max(6, 'Maximum 50 symbols')
      .required('Email is required'),
    acc_name: Yup.string().min(3).max(25).required(),
    acc_no: Yup.number().min(11).max(17).required(),
    f_name: Yup.string().min(2).max(20).required(),
    l_name: Yup.string().min(2).max(20).required(),
    email: Yup.string().email().max(50).required(),
    mobile: Yup.string().min(7).max(18).required(),
    flat: Yup.number().min(2).max(10).required(),
    build_no: Yup.number().min(2).max(10).required(),
    street: Yup.string().min(2).max(50).required(),
    city: Yup.string().min(2).max(30).required(),
    post_code: Yup.string().min(2).max(20).required(),
    state: Yup.string().min(2).max(30).required(),
    country: Yup.string().min(2).max(30).required(),
    reason: Yup.string().min(2).max(30).oneOf(["Family Support", "Utility Payment", "Travel Payment", "Loan Payment", "Tax Payment", "Education"]).required()
  })

  return (
    <div>
      <section>
        <form>

          <div className="form_body">
            <div className="header">
              <h1>Recipient Bank Details</h1>
            </div>
            <div className="col-md-12">
              <div className="input_field">
                <p className="get-text">Bank Name<span style={{ color: 'red' }} >*</span></p>
                <input
                  type="text"
                  ref={input_bankName}
                  className="rate_input form-control"
                  name="bankName"
                  // {}
                />
              </div>
            </div>
            <div className="row each-row">
              <div className="col-md-12">
                <div className="input_field">
                  <p className="get-text">Account Name<span style={{ color: 'red' }} >*</span></p>
                  <input
                    type="text"
                    ref={input_accountName}
                    defaultValue={formValue.accountName}
                    onChange={(e) => handleStep2InputChange(e, 'accountName')}
                    className='rate_input form-control'
                  />
                </div>
              </div>
            </div>
            <div className="row each-row">
              <div className="col-md-12">
                <div className="input_field">
                  <p className="get-text">Account number<span style={{ color: 'red' }} >*</span></p>
                  <input
                    type="text"
                    name="accountNumber"
                    className='rate_input form-control'
                    defaultValue={formValue.accountNumber}
                    onChange={(e) => handleStep2InputChange(e, 'accountNumber')}
                  />
                </div>
              </div>
            </div>
            <div className="row each-row">
              <h5>Recipient Details</h5>
              <div className="col-md-4">
                <div className="input_field">
                  <p className="get-text">First Name<span style={{ color: 'red' }} >*</span></p>
                  <input
                    type="text"
                    className='rate_input form-control'
                    name="firstName"
                    defaultValue={formValue.firstName}
                    onChange={(e) => handleStep2InputChange(e, 'firstName')}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="input_field">
                  <p className="get-text">Middle Name</p>
                  <input
                    type="text"
                    className='rate_input form-control'
                    name="middleName"
                    defaultValue={formValue.middleName}
                    onChange={(e) => handleStep2InputChange(e, 'middleName')}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="input_field">
                  <p className="get-text">Last Name<span style={{ color: 'red' }} >*</span></p>
                  <input
                    type="text"
                    className='rate_input form-control'
                    name="lastName"
                    defaultValue={formValue.lastName}
                    onChange={(e) => handleStep2InputChange(e, 'lastName')}
                  />
                </div>
              </div>
            </div>
            <div className="row each-row">
              <div className="col-md-6">
                <div className="input_field">
                  <p className="get-text">Email<span style={{ color: 'red' }} >*</span></p>
                  <input
                    type="email"
                    className='rate_input form-control'
                    name="email"
                    defaultValue={formValue.email}
                    onChange={(e) => handleStep2InputChange(e, 'email')}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_field">
                  <p className="get-text">Mobile<span style={{ color: 'red' }} >*</span></p>
                  <input
                    type="text"
                    className='rate_input form-control'
                    name="mobile"
                    defaultValue={formValue.mobile}
                    onChange={(e) => handleStep2InputChange(e, 'mobile')}
                  />
                </div>
              </div>
            </div>

            <div className="row each-row">
              <h5>Address</h5>
              <div className="col-md-4">
                <div className="input_field">
                  <p className="get-text">Flat/Unit No.</p>
                  <input
                    type="text"

                    className='rate_input form-control'
                    name="flat"
                    defaultValue={formValue.flat}
                    onChange={(e) => handleStep2InputChange(e, 'flat')}
                  />

                </div>
              </div>
              <div className="col-md-4">
                <div className="input_field">
                  <p className="get-text">Building/Unit No.</p>
                  <input
                    type="text"

                    className='rate_input form-control'
                    name="building"
                    defaultValue={formValue.building}
                    onChange={(e) => handleStep2InputChange(e, 'building')}
                  />

                </div>
              </div>

              <div className="col-md-4">
                <div className="input_field">
                  <p className="get-text">Street</p>
                  <input
                    type="text"

                    className='rate_input form-control'
                    name="street"
                    defaultValue={formValue.street}
                    onChange={(e) => handleStep2InputChange(e, 'street')}
                  />

                </div>
              </div>

            </div>


            <div className="row each-row">
              <div className="col-md-4">
                <div className="input_field">
                  <p className="get-text">Postcode</p>
                  <input
                    type="text"

                    className='rate_input form-control'
                    name="postcode"
                    defaultValue={formValue.postcode}
                    onChange={(e) => handleStep2InputChange(e, 'postcode')}
                  />

                </div>
              </div>
              <div className="col-md-4">
                <div className="input_field">
                  <p className="get-text">City/Town</p>
                  <input
                    type="text"

                    className='rate_input form-control'
                    name="city"
                    defaultValue={formValue.city}
                    onChange={(e) => handleStep2InputChange(e, 'city')}
                  />

                </div>
              </div>

              <div className="col-md-4">
                <div className="input_field">
                  <p className="get-text">State</p>
                  <input
                    type="text"

                    className='rate_input form-control'
                    name="state"
                    defaultValue={formValue.state}
                    onChange={(e) => handleStep2InputChange(e, 'state')}
                  />
                </div>
              </div>

            </div>


            <div className="row each-row">
              {/* <div className="col-md-4">
              <div className="input_field">
                <p className="get-text">Country Code <span style={{ color: 'red' }} >*</span></p>
                <input
                  type="text"

                  className='rate_input form-control'
                  name="country_code"
                  defaultValue={formValue.country_code}
                  onChange={(e) => handleStep2InputChange(e, 'country_code')}
                />
                <span style={myStyle}>{BankNameText.Entercountrycode ? BankNameText.Entercountrycode : ''}</span>

              </div>
            </div> */}
              <div className="col-md-4">
                <div className="input_field">
                  <p className="get-text">Country<span style={{ color: 'red' }} >*</span></p>
                  <Select
                    // ref={input_location}
                    options={countryoptions}
                    value={countryValue}
                    onChange={changeHandler}
                  />

                </div>
              </div>
              <div className="col-md-4">
                <div className="input_field">
                  <p className="get-text">Reason For Sending Money<span style={{ color: 'red' }} >*</span></p>
                  <select
                    className="form-select rate_input form-control"
                    aria-label="Select a reason"
                    name="reasonMoney"
                    defaultValue={formValue.reasonMoney}
                    onChange={(e) => handleStep2InputChange(e, 'reasonMoney')}
                  >
                    <option selected>Select a reason</option>
                    <option value="Family Support">Family Support</option>
                    <option value="Education">Education</option>
                    <option value="Tax Payment">Tax Payment</option>
                    <option value="Loan Payment">Loan Payment</option>
                    <option value="Travel Payment">Travel Payment</option>
                    <option value="Utility Payment">Utility Payment</option>
                  </select>

                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-md-4">
                <button type="submit" className="start-form-button" onClick={handlRecipientBankDetails}>Cancel</button>
              </div>
              <div className="col-md-8">
                {/* <button className="form-button" onClick={handleShow}>Continue</button> */}
                <button type="submit" className="form-button" onClick={handleCreateRecipientValidation}>Continue</button>
                {/* <button className="form-button" onClick={handleRecipientBankDetails}>Continue</button> */}
                {/* <button className="form-button" onClick={() => { setStep(step - 1) }}>Previous</button> */}
                {/* <button className="form-button" onClick={() => { setStep(step + 1) }}>Rohit</button> */}
              </div>
            </div>
          </div>
        </form>


        <Modal show={show} onHide={handleClose}
          centereds
        >
          <Modal.Header closeButton>
            <Modal.Title>Recipient details Summary</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Table>
              <thead>
                <tr>
                  <th colSpan={2} className="popup-heading">Bank Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Bank Name</th>
                  <td>{formValue.bankName}</td>
                </tr>
                <tr>
                  <th>Account Name</th>
                  <td>{formValue.accountName}</td>
                </tr>
                <tr>
                  <th>Account number</th>
                  <td>{formValue.accountNumber}</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th colSpan={2} className="popup-heading">Recipient Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>First Name</th>
                  <td>{formValue.firstName}</td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>{formValue.lastName}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{formValue.email}</td>
                </tr>
                <tr>
                  <th>Mobile</th>
                  <td>{formValue.mobile}</td>
                </tr>
                {/* <tr>
                <th>Country Code</th>
                <td>{formValue.country_code}</td>
              </tr> */}
                {/* <tr>
                    <th>Address</th>
                    <td>{addressData}</td>
                  </tr> */}
                <tr>
                  <>

                  </>

                  <th>Reason For Sending Money</th>
                  <td>{formValue.reasonMoney}</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>

            <button className="start-form-button" variant="secondary" onClick={handleClose}>
              Go back to Edit
            </button>
            {/* <button className="form-button" onClick={()=>{setStep(step+1)}}>Continue</button> */}
            <button className="form-button" variant="primary" onClick={handleRecipientBankDetails}>Continue</button>

            {/* onClick={() => setShow(!show)} */}
            {/* <Button variant="primary" onClick={handleDigitalValue}>Continue</Button>  */}


          </Modal.Footer>
        </Modal>

      </section>
      {/* ) : (
        <>
         <Page404 />
        </>

      )
    } */}
    </div>
  )
}

export default BankDetails