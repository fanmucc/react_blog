import React, { useState, useRef, useEffect } from 'react';
import Header from './components/header'
import ReactMarkdown from 'react-markdown'
import { getArticleEgg } from '../../api/getList'

import CodeBlock from './codeblock'
import './detail.css'

function Detail (props) {
    console.log(props)
    const [markdown, setMarkdown] = useState('')
    const [title, setTitle] = useState('')
    const [viewCount, setViewCount] = useState(0)
    const { params } = props.match
    const getArticle = (id = params.id) => {
        getArticleEgg(id).then(res => {
            console.log(res)
            setMarkdown(res.data.data[0].markdown)
            setTitle(res.data.data[0].title)
            setViewCount(res.data.data[0].view_count)
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
                        <h1 className="title">{title}</h1>
                        <p className="article">
                            <span className="info article-user">fanmu</span>
                            <span className="info article-time">2020.9.7</span>
                            <span className="info article-count">{viewCount}</span>
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