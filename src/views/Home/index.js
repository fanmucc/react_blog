import React, { Component, Fragment } from 'react';
import { getList } from '../../api/getList'
import { arrayLength } from '../../libs/tools'
import { debounce } from '../../libs/tools'
import './home.css'
import List from '../../components/list'
import { Card, Avatar } from 'antd';
import store from '../../store'
const { Meta } = Card;

function Count () {
    return <h2>他是个好人</h2>
}
class Home extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.doSomething, '123')
        this.state = {
            list: [],
            type: store.getState().tag,
            pullData: true,        // 加载数据状态，完成后才能继续滚动增加page
            listDataLength: true, // 获取文章列表数组长度是否等于limit 大于返回true小于返回false，同时为false时滚动到底则不进行数据加载
            page: 1,
            limit: 20
        }
        this.homeScroll = this.homeScroll.bind(this)
        this.getListData = this.getListData.bind(this)
        // store里面值发生改变进行出发
        store.subscribe(() => {
            console.log('我被触发了')
            this.setState({
                type: store.getState().tag
            }, ()=> {
                let data = {
                    page: this.state.page,
                    limit: this.state.limit,
                    type: this.state.type
                }
                this.getListData(data)
            })
            
        })
    }
    componentDidMount () {
        let data = {
            page: this.state.page,
            limit: this.state.limit,
            type: this.state.type
        }
        this.getListData(data)
        window.addEventListener('scroll', debounce(this.homeScroll, 200))
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', debounce(this.homeScroll, 200))
    }

    render() {
        const itemList = this.state.list
        return (
            <div className="home-content">
                <div className="home-section">
                <section className="home-list">
                    {
                        itemList.map((item, index) => {
                            return <Fragment key={index}>{List(item)}</Fragment>
                        })
                    }
                </section>
                {/* <section className="home-nav">
                    <Card
                        style={{ width: '100%' }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={[
                            <Count key="1"/>
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title="fanmu"
                            description={
                                <Count/>
                            }
                        />
                    </Card>
                </section> */}
                </div>
            <p className="home-content-prompt"><span>{this.state.listDataLength === true? '正在加载中...' : '别划啦, 数据已经全部加载完成了!'}</span></p>
            </div>
        ) 
    }
    getListData (data) {
        getList(data).then(res => {
            console.log(res.data.data.length)
            console.log(arrayLength(res.data.data, this.state.limit))
            this.setState({
                pullData: true,     // 获取数据成功后状态改成true 可以继续获取新的一页数据
                list: [...this.state.list, ...res.data.data],
                listDataLength: arrayLength(res.data.data, this.state.limit)
            })
        })
    }
    homeScroll(event) {
        let scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);     // 滚动高度
        let scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;   // 文档高度
        let clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;   // 窗口高度
        let scrollBottom = scrollHeight - (scrollTop + clientHeight)
        if (scrollBottom <= 300) {
            console.log(123)
            if (!this.state.listDataLength) return   // 当返回的数组长度小于limit时则不再进行请求， 此时想要再次获取请进行页面刷新
            console.log(123)
            if (this.state.pullData) {
                this.setState({
                    pullData: false,
                    page: this.state.page + 1
                }, () => {
                    let data = {
                        page: this.state.page,
                        limit: this.state.limit,
                        type: this.state.type
                    }
                    this.getListData(data)
                })
            }
        }
        
    }
}

export default Home