// Step3.js
import { createVeriffFrame, MESSAGES } from '@veriff/incontext-sdk';
import { Veriff } from '@veriff/js-sdk';
import React, { useEffect } from 'react';
import { getVeriffStatus } from '../../utils/Api';
import { toast } from 'react-toastify';

const Step3 = ({ nextStep, values }) => {

  useEffect(() => {

    console.log(values, "=------------------------values from formik")
    const veriff = Veriff({
      apiKey: `${process.env.REACT_APP_VERIFF_KEY}`,
      parentId: 'veriff-root',
      onSession: function (err, response) {
        createVeriffFrame({
          url: response.verification.url,
          onEvent: function (msg) {
            switch (msg) {
              case MESSAGES.CANCELED:
                break;
              case MESSAGES.STARTED:
                break;
              case MESSAGES.FINISHED:
                const interval = setInterval(() => {
                  getVeriffStatus({ session_id: response.verification.id }).then(res => {
                    if (res.code === "200") {
                      if (res?.data?.verification?.status === "approved") {
                        let user = JSON.parse(sessionStorage.getItem("remi-user-dt"));
                        user.is_digital_Id_verified = "true"
                        sessionStorage.setItem("remi-user-dt", JSON.stringify(user))
                      } else if (res?.data?.verification?.status === "declined") {
                        toast.error(res?.message, { position: "bottom-right", hideProgressBar: true })
                      }
                      clearInterval(interval)
                      nextStep()
                    }
                  })
                }, 10000)
                break;
            }
          }
        });
      }
    });
    veriff.setParams({
      vendorData: `${values?.customer_id}`,
      person: {
        givenName: `${values?.First_name}`,
        lastName: `${values?.Last_name}`
      }
    });
    veriff.mount({
      formLabel: {
        givenName: 'First name',
        lastName: 'Last name',
        vendorData: 'Unique id/Document id'
      },

      submitBtnText: 'Start Verification',
      loadingText: 'Please wait...'
    })
  }, [])

  return (
    <div>
      <section className="kyc">
        <div className="">
          <div className="">
            <div className="row each-row">
              <div className='col-md-12'>
                <div id='veriff-root' style={{ margin: "auto", padding: "25px 0px" }}>
                </div>
              </div>
            </div>
            <div className="next-step dashbord">
              {/* <button className="login_button dashbord-go">Go To Dashboard  <img src="assets/img/home/Union.png" className="vission_image" alt="alt_image" /></button>
            <p>You will be redirected in <span><b>10</b> Seconds </span></p> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};

export default Step3;
