import React from 'react'

export default function Alerts(props) {
    const capitalize = (message) => {
        let alertType = message
        alertType = alertType.substr(0, 1).toUpperCase() + alertType.substr(1);
        return alertType;
    }
    return (
        <div className='container' style={{height: '10px'}}>
{
    props.alert && <div>
        <div className={`alert alert-${props.alert.type} `} role="alert">
            <strong>{capitalize(props.alert.type) + "! "}</strong> {props.alert.msg}
        </div>
    </div>
}
        </div >
    )
}
