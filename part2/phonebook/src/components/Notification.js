import React from 'react'

const Notification = (props) => {
    const notificationStyle = {
        color : 'green',
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        
    }
    const errorStyle = {
        color : 'red',
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
    }
    if(props.message === null)
    return(
        <div>

        </div>
    )
return(
    <div style = { props.error === true ? errorStyle : notificationStyle}>
      {props.message}
    </div>
        )
}

export default Notification