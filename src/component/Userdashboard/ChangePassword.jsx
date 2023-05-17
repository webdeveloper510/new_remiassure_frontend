import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup"
import clsx from "clsx";
import { changePassword } from "../../utils/Api";
import authDashHelper from "../../utils/AuthDashHelper";

const Profile = () => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authDashHelper('dashCheck') === false) {
      navigate("/send-money")
    }
  }, [])

  const updateSchema = Yup.object().shape({
    old_password: Yup.string().required("Current password is required"),
    new_password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,30}$/, 'Password must contain uppercase, lowercase, symbols, digits, minimum 6 characters').required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("new_password")], "Passwords did not match").required("Password confirmation is required")
  })

  const initialValues = {
    old_password: '',
    new_password: '',
    confirmPassword: ""
  }

  const formik = useFormik({
    initialValues,
    validationSchema: updateSchema,
    onSubmit: async (values) => {
      setLoading(true)
      changePassword(values).then((response) => {
        if (response.code == "200") {
          toast.success('Password Succesfully Updated', { position: "bottom-right", autoClose: 2000, hideProgressBar: true });

        }
        setLoading(false)
      }).catch((error) => {
        console.log(error.response)
        if (error.response.code == "400") {
          toast.error(error.response.message, { position: "bottom-right", autoClose: 2000, hideProgressBar: true });
        }
        setLoading(false)
      })
    }
  })

  const handleCancel = () => {
    formik.setValues({old_password:"", new_password:"", confirmPassword:""})
  }

  const navigate = useNavigate();

  return (
    <>
      <div className="margin-set">
        <div className="tabs-page">
          <Sidebar />
          <div className="content-body">
            <div className="col-md-12">
              <section className="change-password">

                <div class="form-head mb-4">
                  <h2 class="text-black font-w600 mb-0"><b>Change Password</b>
                  </h2>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="update-profile">

                      <form onSubmit={formik.handleSubmit} noValidate >
                        <div className="row each-row">
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Current Password<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                type="password"
                                placeholder="Current password"
                                autoComplete='off'
                                {...formik.getFieldProps('old_password')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.old_password && formik.errors.old_password },
                                  {
                                    'is-valid': formik.touched.old_password && !formik.errors.old_password,
                                  }
                                )}
                              />
                               {formik.touched.old_password && formik.errors.old_password && (
                                <div className='fv-plugins-message-container mt-1'>
                                  <div className='fv-help-block'>
                                    <span role='alert' className="text-danger">{formik.errors.old_password}</span>
                                  </div>
                                </div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">New Password<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                type="password"
                                placeholder="New password"
                                autoComplete='off'
                                {...formik.getFieldProps('new_password')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.new_password && formik.errors.new_password },
                                  {
                                    'is-valid': formik.touched.new_password && !formik.errors.new_password,
                                  }
                                )}
                              />
                              {formik.touched.new_password && formik.errors.new_password && (
                                <div className='fv-plugins-message-container mt-1'>
                                  <div className='fv-help-block'>
                                    <span role='alert' className="text-danger">{formik.errors.new_password}</span>
                                  </div>
                                </div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-md-4">
                            <Form.Group className="form_label" controlId="Firstname">
                              <p className="get-text">Confirm Password<span style={{ color: 'red' }} >*</span></p>
                              <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                autoComplete='off'
                                {...formik.getFieldProps('confirmPassword')}
                                className={clsx(
                                  'form-control bg-transparent',
                                  { 'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword },
                                  {
                                    'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword,
                                  }
                                )}
                              />
                              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <div className='fv-plugins-message-container mt-1'>
                                  <div className='fv-help-block'>
                                    <span role='alert' className="text-danger">{formik.errors.confirmPassword}</span>
                                  </div>
                                </div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <div class="row each-row">
                          <div className="col-md-4">
                            <button
                              type="button"
                              className="start-form-button"
                              onClick={()=>handleCancel()}
                            >Cancel</button>
                          </div>
                          <div className="col-md-8">
                            <button
                              type="submit"
                              className="profile-form-button"
                            >
                              Change Password
                              {loading ? <>
                                <div class="loader-overly">
                                  <div class="loader" >
                                  </div>
                                </div>
                              </> : <></>}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



export default Profile;