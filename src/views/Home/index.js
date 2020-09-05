import React, { Component, Fragment } from 'react';
import { getList } from '../../api/getList'
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
        this.state = {
            list: [],
            type: store.getState().tag
        }
        store.subscribe(() => {
            this.setState({
                type: store.getState().tag
            }, ()=> {
                let data = {
                    page: 1,
                    limit: 20,
                    type: this.state.type
                }
                getList(data).then(res => {
                    this.setState({
                        list: [...res.data.data]
                    })
                })
            })
            
        })
    }
    componentDidMount () {
        let data = {
            page: 1,
            limit: 20,
            type: this.state.type
        }
        getList(data).then(res => {
            this.setState({
                list: [...this.state.list, ...res.data.data]
            })
        })
    }
    mapStateToProps () {
        console.log('store')
    }
    render() {
        const itemList = this.state.list
        return (
            <div className="home-content">
                <section className="home-list">
                    {
                        itemList.map((item, index) => {
                            return <Fragment key={index}>{List(item)}</Fragment>
                        })
                    }
                </section>
                <section className="home-nav">
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
                </section>
            </div>
        ) 
    }
}

export default Home