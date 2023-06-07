import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { activEmail } from '../../utils/Api'
import { useParams } from 'react-router'


const EmailVerify = () => {

    const [verified, setVerified] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        activEmail(id).then(res => {
            setVerified(res)
        }).catch(error=>{
            console.log(error)
        })
    }, [])

    return (
        <Container fluid>
            <div className='d-flex justify-content-center align-items-center min-vh-100'>
                {verified === true ? (
                    <div className='d-grid text-center'>
                        <i className='bi bi-check-circle  display-5 text-success  mb-2'>
                        </i>
                        <p className='fw-semibold'>Your Email has been verified successfully.</p>
                        <a href={`/login`}>Go to login</a>
                    </div>
                ) : verified === "failed" ? (
                    <div className='d-grid text-center'>
                        <i className='bi bi-x-circle display-5 text-danger mb-2'></i>
                        <p className='fw-semibold'>Email verification failed .Please try later.</p>
                    </div>
                ) : (
                    <div className="loader-overly">
                        <div className="loader" >
                        </div>
                    </div>
                )}

            </div>
        </Container>
    )
}

export default EmailVerify