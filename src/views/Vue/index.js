import React, { useState, useEffect, Fragment, useRef } from 'react'
import store from '../../store'
import { getList } from '../../api/getList'
import { arrayLength } from '../../libs/tools'
import { debounce } from '../../libs/tools'
import List from '../../components/list'

function VuePage () {
    // const [state, setState] = useState({
    //     list: [],
    //     type: 1,
    //     resStatus: false,
    //     pullData: true,        // 加载数据状态，完成后才能继续滚动增加page
    //     listDataLength: true, // 获取文章列表数组长度是否等于limit 大于返回true小于返回false，同时为false时滚动到底则不进行数据加载
    //     page: 1,
    //     limit: 20
    // })
    // useEffect(() => {
    //     getListData({
    //         type: state.type,
    //         page: state.page,
    //         limit: state.limit
    //     })
    // },[state])
    // const getListData = (data) => {
    //     getList(data).then(res => {
    //         let newState = JSON.parse(JSON.stringify(state))
    //         newState.list = [...state.list, ...res.data.data]
    //         newState.listDataLength = arrayLength(res.data.data, state.limit)
    //         setState(newState)
    //     })
    // }
    const [list, setList] = useState([])  // 列表数据
    const get = useRef({
        type: 1,
        page: 1,
        limit: 20
    })
    const [pullData, setPullData] = useState(true)
    const [listDataLength, setliStDataLength] = useState(true)

    async function getListData( data = {}) {
        console.log(data, listDataLength,  '===data====')
        const result = await getList(data)
        console.log(result)

        console.log(result.data.data)
        setliStDataLength(arrayLength(result.data.data, get.current.limit))
        setPullData(false)
        let b = JSON.parse(JSON.stringify(list))
        setList(preState => {
            return [...preState, ...result.data.data]
        })
    }

    const scroll = (event) => {
        let scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);     // 滚动高度
        let scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;   // 文档高度
        let clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;   // 窗口高度
        let scrollBottom = scrollHeight - (scrollTop + clientHeight)
        if (scrollBottom <= 300) {
            if (!listDataLength) return   // 当返回的数组长度小于limit时则不再进行请求， 此时想要再次获取请进行页面刷新
            if (pullData) {
                // 修改get里面值，触发页面渲染
                setPullData(false)
                get.current.page = get.current.page + 1
                // 再次调用数据请求函数
                getListData({...get.current})
            }
        }
    }

    useEffect(() => {
        getListData({...get.current})
        window.addEventListener('scroll', debounce(scroll, 200))
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
            {/* <p className="home-content-prompt"><span>{state.listDataLength === true? '正在加载中...' : '别划啦, 数据已经全部加载完成了!'}</span></p> */}
            </div>
        </div>
    )
}

export default VuePage