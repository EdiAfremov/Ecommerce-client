import React, { Component } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell, LabelList, Label } from 'recharts';
import Paper from 'material-ui/Paper';
import '../Chart.css'
const data02 = [
    { name: 'Group A', value: 2400 }, { name: 'Group B', value: 4567 },
    { name: 'Group E', value: 3908 }, { name: 'Group F', value: 4800 }];
const colors = ['#5C6BC0', '#42A5F5', '#1DE9B6', '#FFE082']
// const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={ x } y={ y } fill="white" textAnchor={ x > cx ? 'start' : 'end' } dominantBaseline="central">
            { `${(percent * 100).toFixed(0)}%` }
        </text>
    );
};

class pieChart extends Component {
    render() {

        return (
            <div className="paper-pie" >
                <div className="chart-header">
                    <h2 style={ { fontWeight: 400, textAlign: 'center' } }>SALES BY TYPE </h2>
                </div>
                <ResponsiveContainer width={ '100%' } height={ 300 }>
                    <PieChart   >
                        <Pie data={ data02 }
                            dataKey="value" nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={ 135 }
                            labelLine={ false }
                            fill="#8884d8"
                            label={ renderCustomizedLabel }>

                            { colors.map((color, index) => <Cell key={ index } fill={ color } />) }
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default pieChart;
