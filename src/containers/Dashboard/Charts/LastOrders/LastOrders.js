import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Paper from 'material-ui/Paper';
import '../Chart.css'

const data02 = [
    { name: 'Group A', value: 2400 }, { name: 'Group B', value: 4567 },
    { name: 'Group E', value: 3908 }, { name: 'Group F', value: 4800 }];
// const colors = ['#5C6BC0', '#42A5F5', '#1DE9B6', '#FFE082']
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
class lastOrders extends Component {
    render() {
        return (
            <div className="paper-lastOrders" >
                <div className="chart-header">
                    <h2 style={ { fontWeight: 400, textAlign: 'center' } }>LAST ORDERS </h2>
                </div>
                <ResponsiveContainer width={ '100%' } height={ 200 }>
                    <BarChart data={ data02 }>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" stackId="a" fill="#8884d8" barSize={ 20 } type="monotone" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default lastOrders;