import React, { useState, useRef, useEffect } from 'react';
import Header from './components/header'
import ReactMarkdown from 'react-markdown'
import { getArticleEgg } from '../../api/getList'
import './detail.css'

function Detail (props) {
    console.log(props)
    const [markdown, setMarkdown] = useState('')
    const { params } = props.match
    const getArticle = (id = params.id) => {
        getArticleEgg(id).then(res => {
            console.log(res)
            setMarkdown(res.data.data[0].markdown)
        })
    } 
    useEffect(() => {
        getArticle()
    },[])
    return (
        <div className="detail">
            <div className="detail-header">
                <div className="detail-header-transfrom">
                    <Header className="detail-header-user"/>
                    <div className="detail-header-title">
                        <div className="detail-header-title-content">
                            <div className="header-title">测试测试</div>
                            <div className="header-title-userLink">这里面会显示作者信息联系方式等</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail-content">
                <div className="detail-content-text">
                    <div className="content">
                        <h3>测试</h3>
                        <p className="article">
                            <span className="article-user">作者: fanmu</span>
                            <span className="article-time">发布时间: 2020.9.7</span>
                            <span className="article-count">233</span>
                        </p>
                        <div className="article-details markdown-body">
                            <ReactMarkdown
                                className={'markdown'}
                                source={markdown}
                                escapeHtml={false}
                                renderers={{
                                    code: CodeBlock
                                }}
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Detail