import React from 'react'
import './Alert.css'
import { useSelector } from 'react-redux'

const Alert = () => {
    const alerts = useSelector(({ alert }) => alert)

    return (
        alerts !== null && alerts.length > 0 &&
        alerts.map(({ msg, alertType }, i) => (
            <div key={i} className={`alert font-2 center alert-${alertType}`}>
                {msg}
            </div>
        ))
    )
}

export default Alert