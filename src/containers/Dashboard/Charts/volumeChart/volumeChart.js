import React, { Component } from 'react';
import { ResponsiveContainer, Area, AreaChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Paper from 'material-ui/Paper';
import '../Chart.css'

const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];
// const colors = ['#5C6BC0', '#42A5F5', '#1DE9B6', '#FFE082']
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
class lastOrders extends Component {
    render() {
        return (
            <div className="paper-lastOrders" >
                <div className="chart-header">
                    <h2 style={ { fontWeight: 400, textAlign: 'center' } }>VOLUME </h2>
                </div>
                <ResponsiveContainer width={ '100%' } height={ 200 }>
                    <AreaChart data={ data }>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type='monotone' dataKey='uv' stroke='#00C49F' fill='#00C49F' />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default lastOrders;