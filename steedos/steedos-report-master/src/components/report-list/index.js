import React, { Component } from 'react';
import './index.css';
import loadData from '../../helpers/load-data';

class ReportList extends Component {
    constructor(props) {
        super(props);
        let reports = props.staticContext && props.staticContext.data;
        reports = reports && reports.length && reports[0];
        if (reports) {
            // 服务端由后台context传入data数据
            let list = [];
            for (let key in reports) {
                list.push(reports[key]);
            }
            this.state = {
                list: list
            };
        } else {
            this.state = {
                list: []
            };
        }
    }

    render() {
        let list = this.state.list;
        var items = list.map(function (item) {
            return (
                <div className="report-list-item" key={item._id}>
                    <a href={"/api-v2/report/ui/" + item._id}>{item.name}</a>
                    <a href={"/api-v2/report/ui/designer/" + item._id}>编辑</a>
                </div>
            );
        }, this);
        return (
            <div className="report-list">
                {items}
            </div>
        );
    }          

    async componentDidMount(){
        // 客户端需要主动请求数据
        let reports = await loadData('list');
        let list = [];
        for (let key in reports){
            list.push(reports[key]);
        }
        this.setState(state => ({
            list: list
        }));
    }
}


export default ReportList;
