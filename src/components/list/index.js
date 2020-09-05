import React from 'react'
import './list.css'
function List (props) {

    const handleClickItem = () => {
        console.log(props.id)
    }

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
                    <span className="title" onClick={handleClickItem}>{props.title}</span>    
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