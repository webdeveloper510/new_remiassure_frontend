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
                props.onLogout()
            }, 2 * 60 * 1000)
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
                // if(diff.days == (24 * 60 * 60 * 1000)){
                //     localStorage.clear()
                //     navigate("/login")
                // }
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
        setShowModal(false)
        props.onLogout();
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

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(2);

    useEffect(() => {
        if (showModal) {
            if (seconds == 0 && minutes > 0) {
                minutes > 0 && setMinutes(minutes - 1);
                setSeconds(59)
            } else {
                seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
            }
        } else {
            setMinutes(2)
            setSeconds(0)
        }
    }, [seconds, showModal]);

    return (
        <Modal show={showModal} onHide={handleContinue} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>You Have Been Idle!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="session_modal">
                <p>You will get automatically <b style={{ color: "#6414E9" }}>logged out</b> in:</p>
                <p className='image_idle_time  py-5' style={{ backgroundImage: `url(${timeOut})` }}>
                    <span className="display-3 fw-semibold text-danger">{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</span>
                </p>
                <p>Click on <b style={{ color: "#6414E9" }}>Continue Session</b> to stay.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className='session_logOut' onClick={() => handleLogout()}>
                    Logout
                </Button>
                <Button className='session_cont' onClick={() => handleContinue()}>
                    Continue Session
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default IdleTimeOutHandler;