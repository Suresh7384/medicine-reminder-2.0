import React, { useEffect } from 'react'

const PopupAlert = ({ message }) => {

    useEffect(() => {
        if (message) {
            alert(message)
        }
    }, [message])

    return null
}

export default PopupAlert