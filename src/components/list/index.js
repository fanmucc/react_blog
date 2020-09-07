import React from 'react'
import { History } from 'react-router-dom'
import './list.css'
function List (props) {
    return (
        <div className="list" key={props.index}>
            <div className="info-box">
                <div className="info-row meta-row">
                    <ul className="meta-list">
                        <li className="item">
                            <div>前端</div>    
                        </li>
                        <li className="item">
                            <div>1小时前</div> 
                        </li>
                        <li className="item">
                            <div>{props.type_name}</div> 
                        </li>
                    </ul>
                </div>
                <div className="info-row title-row">
                    <span className="titlelist"><a href={`/post/${props.id}`}>{props.title}</a> </span>    
                </div>
                <div className="info-row action-row">
                    <ul className="action-list">
                        <li className="item">浏览数: {props.view_count}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default List;