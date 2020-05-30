import React from 'react'
import './Alert.css'
import { useSelector } from 'react-redux'

const Alert = () => {
    const alerts = useSelector(state => state.alert)

    return (
        alerts !== null && alerts.length > 0 &&
        alerts.map((alert, i) => (
            <div key={i} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>
        ))
    );
}

export default Alert;