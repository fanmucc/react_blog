import React, { Component, Fragment } from 'react';
import HeaderDiv from './header'
import { debounce } from '../libs/tools'
import { getTags } from '../api/getList'
import './main.css'

import { Layout, Affix } from 'antd';
const { Header, Content } = Layout;
class Blayout extends Component {
    constructor(porps) {
        super(porps)
        this.state = {
            top: false,
            tags: []
        }
        this.ref = React.createRef
    }
    componentDidMount() {
        // 挂载滚动监听
        window.addEventListener('scroll', debounce(this.bindScroll.bind(this), 200))
        // 获取tags列表
        getTags().then(res => {
            const {data} = res
            console.log(data)
            this.setState({
                tags: data.data
            })
        }).catch(error => {
            return error
        })
    }
    componentWillUnmount() {
        // 移除滚动监听
        window.removeEventListener('scroll', debounce(this.bindScroll.bind(this), 200));
    }
    render () {
        const tags = this.state.tags
        return ( 
            <Fragment>
                <Layout className="layout" ref={this.ref}>
                    <Header className={this.state.top === true ? 'ant-layout-header-sroll': ''}>
                        <HeaderDiv></HeaderDiv>
                        <div className="tag">
                            <div className="tag-content">
                                {
                                    tags.map((item, index) => {
                                        return <li className="tag-list" key={index} >{item.type_name}</li>
                                    })
                                }
                            </div>
                        </div>
                    </Header>
                    <Content className="mian">
                        <div className="site-layout-content">
                            {this.props.children}  
                        </div>
                    </Content>
                </Layout>
            </Fragment>
        )
    }
    bindScroll(event) {
        let scrollTop = event.srcElement.documentElement.scrollTop;

        if (scrollTop > 200) {
            console.log(1)
            this.setState({
                top: true
            })
        } else {
            console.log(2)
            this.setState({
                top: false
            })
        }
        // 滚动的高度
        // const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        // // 视窗高度
        // const clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;
        // // 页面高度
        // const scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;
        // // 距离页面底部的高度
        // const height = scrollHeight - scrollTop - clientHeight;
        // // 判断距离页面底部的高度
        // if (height <= (this.props.num || 0)) {
        //     // 判断执行回调条件
        //     if (this.state.codeType) {
        //         // 执行回调
        //         this.props.scrollCallback();
        //         // 关闭判断执行开关
        //        console.log(1)
        //     }
        // } else {
        //     // 打开判断执行开关
        //     console.log(2)
        // }
    }
}

export default Blayout