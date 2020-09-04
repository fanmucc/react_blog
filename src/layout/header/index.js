import React from 'react';
import { Menu } from 'antd'
import './header.css'

function HeaderDiv () {
    return (
        <div className="header">
            <div className="header-content">
                <div className="logo">
                    <span className="header-logo">You</span>
                    <span className="header-text">个人博客</span>
                </div>
                <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </div>
        </div>
    )
}

export default HeaderDiv