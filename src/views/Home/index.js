import React, { Component, Fragment } from 'react';
import { getList } from '../../api/getList'
import './home.css'
import List from '../../components/list'
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount () {
        getList().then(res => {
            this.setState({
                list: [...this.state.list, ...res.data.data]
            })
            console.log(res)
        })
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
                <section className="home-nav">2</section>
            </div>
        ) 
    }
    
}

export default Home