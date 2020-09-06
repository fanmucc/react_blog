import React, { Component, Fragment } from 'react';
import store from  '../store'
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
            tags: [],
            tagsStatus: store.getState().tag,
            scroll: store.getState().scroll
        }
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
        const tags = [{id: null, type_name: '推荐'}, ...this.state.tags]
        return ( 
            <Fragment>
                <Layout className="layout" ref={this.ref}>
                    <Header className={this.state.top === true ? 'ant-layout-header-sroll': ''}>
                        <HeaderDiv></HeaderDiv>
                        <div className="tag">
                            <div className="tag-content">
                                {
                                    tags.map((item, index) => {
                                        return <li className="tag-list" 
                                                    style={{color: (this.state.tagsStatus === item.id) ? "#1e90ff" : ""}} 
                                                    key={index} 
                                                    onClick={this.handleClickTags.bind(this, item.id)}>{item.type_name}</li>
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
        let scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);     // 滚动高度
        // let scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;   // 文档高度
        // let clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;   // 窗口高度
        if (scrollTop > 200) {
            this.setState({
                top: true
            })
        } else {
            this.setState({
                top: false
            })
        }
    }
    handleClickTags(id) {
        if (this.state.tagsStatus === id) return
        let routerName = ''
        switch (id) {
            case 1:
                routerName = 'vue';
                break;
            case 2:
                routerName = 'react';
                break
            case 3:
                routerName = 'mysql';
                break
            case 4:
                routerName = 'qianduan';
                break
            case 5:
                routerName = 'http';
                break
            case 6:
                routerName = 'git';
                break
            case 7:
                routerName = 'css';
                break
            default:
                routerName = '/'                                     
        }

        const action = {
            type: "CLICK_TAG",
            value: id
        }
        this.setState({
            tagsStatus: id
        })
        store.dispatch(action)
        console.log(routerName)
        this.props.history.push(routerName)
    }
}

export default Blayout