import React, { useState, useEffect, Fragment, useRef } from 'react'
import store from '../../store'
import { getList } from '../../api/getList'
import { arrayLength } from '../../libs/tools'
import { debounce } from '../../libs/tools'
import List from '../../components/list'

function VuePage () {
    const [list, setList] = useState([])  // 列表数据
    const get = useRef({
        type: 1,
        page: 1,
        limit: 20
    })
    const pullData = useRef(true)      // 判断是否获取到请求数据,触发时为false, 获取到数据后修改为true
    const listDataLength = useRef(true)     // 判断返回的数据是否为相应长度 符合为true 不符合为false

    const  getListData = ( data = {}) => {
        getList(data).then(res => {
            listDataLength.current = arrayLength(res.data.data, get.current.limit)
            pullData.current = true
            setList(preState => {
                return [...preState, ...res.data.data]
            })
        })
    }

    const scroll = (event) => {
        let scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);     // 滚动高度
        let scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;   // 文档高度
        let clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;   // 窗口高度
        let scrollBottom = scrollHeight - (scrollTop + clientHeight)
        if (scrollBottom <= 300) {
            if (!listDataLength.current) return   // 当返回的数组长度小于limit时则不再进行请求， 此时想要再次获取请进行页面刷新
            if (pullData.current) {
                // 修改get里面值，触发页面渲染
                pullData.current = false
                get.current.page = get.current.page + 1
                // 再次调用数据请求函数
                getListData({...get.current})
            }
        }
    }

    useEffect(() => {
        getListData({...get.current})   // componentDidMount 页面加载完成时运行
        window.addEventListener('scroll', debounce(scroll, 200))    // 修改page触发useEffect监听进行页面刷新
        return () => {
            window.removeEventListener('scroll', debounce(scroll, 200))
        }
    }, [get])

    return (
        <div>
             <div className="home-content">
                <div className="home-section">
                <section className="home-list">
                    {
                        list.map((item, index) => {
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
            <p className="home-content-prompt"><span>{listDataLength.current === true? '正在加载中...' : '别划啦, 数据已经全部加载完成了!'}</span></p>
            </div>
        </div>
    )
}

export default VuePage