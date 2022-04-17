import React from 'react'
import './Alert.css'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const Alert = () => {
    const alerts = useSelector(({ alert }) => alert)

    return (
        alerts !== null && alerts.length > 0 &&
        alerts.map(({ msg, alertType }, i) => (
            <div key={i} className={`alert font-2 center alert-${alertType}`}>
                {alertType === 'success' ?
                    <FontAwesomeIcon icon={faCheckCircle} /> :
                    <FontAwesomeIcon icon={faExclamationCircle} />
                }
                <div className='alert_msg'>{msg}</div>
            </div>
        ))
    )
}

export default Alert