import React from 'react';
import './header.css'

function HeaderDiv () {
    return (
        <div className="header">
            <div className="header-content">
                <div className="logo">
                    <span className="header-logo">You</span>
                    <span className="header-text">个人博客</span>
                </div>
            </div>
        </div>
    )
}

export default HeaderDiv