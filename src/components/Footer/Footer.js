import React from 'react'
import './Footer.css'

export default () => {
    let date = new Date().getFullYear();

    return (
        <div className="footer">
            <p> Made By Edi Afremov &copy; { date }</p>
        </div>
    )
}
