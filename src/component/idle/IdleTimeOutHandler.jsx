import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router';
import timeOut from "../../assets/img/home/session_timeout.png"


const IdleTimeOutHandler = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [isLogout, setLogout] = useState(false)
    let timer = undefined;
    const events = ['click', 'load', 'keydown']
    const eventHandler = (eventType) => {

        if (!isLogout) {
            localStorage.setItem('lastInteractionTime', moment())
            if (timer) {
                props.onActive();
                startTimer();
            }
        }

    };
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname != "/login" && location.pathname != "/signup") {
            addEvents();

            return (() => {

                removeEvents();
                clearTimeout(timer);
            })
        }
    }, [location.pathname])

    useEffect(() => {
        if (showModal) {
            setTimeout(() => {
                setShowModal(false)
                localStorage.clear()
                navigate("/login")
            }, 30 * 1000)
        }
    }, [showModal])

    const startTimer = () => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {

            let lastInteractionTime = localStorage.getItem('lastInteractionTime')
            const diff = moment.duration(moment().diff(moment(lastInteractionTime)));
            let timeOutInterval = props.timeOutInterval ? props.timeOutInterval : 6000;
            if (isLogout) {
                clearTimeout(timer)
            } else {
                if (diff._milliseconds < timeOutInterval) {
                    startTimer();
                    props.onActive();
                } else {
                    props.onIdle();
                    setShowModal(true)
                }
            }

        }, props.timeOutInterval ? props.timeOutInterval : 6000)





    }
    const addEvents = () => {

        events.forEach(eventName => {
            window.addEventListener(eventName, eventHandler)
        })

        startTimer();
    }

    const removeEvents = () => {
        events.forEach(eventName => {
            window.removeEventListener(eventName, eventHandler)
        })
    };

    const handleContinueSession = () => {
        setShowModal(false)
        setLogout(false)
    }
    const handleLogout = () => {
        removeEvents();
        clearTimeout(timer);
        setLogout(true)
        props.onLogout();
        setShowModal(false)

    }

    return (
        <div>

            <IdleTimeOutModal
                showModal={showModal}
                handleContinue={handleContinueSession}
                handleLogout={handleLogout}
            />

        </div>
    )

}

const IdleTimeOutModal = ({ showModal, handleContinue, handleLogout, remainingTime }) => {

    return (
        <Modal show={showModal} onHide={handleContinue} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>You Have Been Idle!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="session_modal">
                <p>Your session is Timed Out. You want to stay?</p>
                <p>
                    <img src={timeOut} />
                </p>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
                <Button variant="primary" onClick={handleContinue}>
                    Continue Session
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default IdleTimeOutHandler;