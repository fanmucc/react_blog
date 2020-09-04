import React from 'react';
import { Menu, Breadcrumb } from 'antd'
import { HomeOutlined, DatabaseOutlined, MessageOutlined } from '@ant-design/icons';
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
                    <Menu.Item icon={<HomeOutlined />} key="1">首页</Menu.Item>
                    <Menu.Item icon={<DatabaseOutlined />} key="2">文集</Menu.Item>
                    <Menu.Item icon={<MessageOutlined />} key="3">杂谈</Menu.Item>
                </Menu>
            </div>
        </div>
    )
}

export default HeaderDiv