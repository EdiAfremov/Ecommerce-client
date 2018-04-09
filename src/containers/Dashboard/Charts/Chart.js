import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Chart.css'
import Paper from 'material-ui/Paper';

const DATA = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];


class charts extends Component {
    render() {

        return (
            <div className="paper-chart" >
                <div className="chart-header-chart ">
                    <h2 style={ { fontWeight: 400, textAlign: 'center' } }>SALES BY DATE </h2>
                </div>
                <ResponsiveContainer width={ '100%' } height={ 300 }>
                    <LineChart data={ DATA } >
                        <Line type="monotone" dataKey="uv" stroke="#42a5f5" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default charts;
