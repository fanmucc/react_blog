import React, { Component, Fragment } from 'react';
import HeaderDiv from './header'

import './main.css'

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
class Blayout extends Component {
    render () {
        return ( 
            <Fragment>
                <Layout className="layout">
                    <Header className="header">
                        <HeaderDiv></HeaderDiv>
                    </Header>
                    <Content style={{ width: '100%' }}>
                        <div className="site-layout-content">
                            {this.props.children}  
                        </div>
                    </Content>
                    <Footer className="footer">You blog ©2020 Created by Fanmu</Footer>
                </Layout>
            </Fragment>
        )
    }
}

export default Blayout