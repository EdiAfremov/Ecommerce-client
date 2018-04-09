import React, { Component } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell, LabelList, Label } from 'recharts';
import Paper from 'material-ui/Paper';
import '../Chart.css'

const data02 = [
    { name: 'Group A', value: 2400 }, { name: 'Group B', value: 4567 },
    { name: 'Group E', value: 3908 }, { name: 'Group F', value: 4800 }];
// const colors = ['#5C6BC0', '#42A5F5', '#1DE9B6', '#FFE082']
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
class smallPie extends Component {
    render() {
        return (
            <div className="paper-SmallChart" >
                <div className="chart-header">
                    <h2 style={ { fontWeight: 400, textAlign: 'center' } }>SALES BY TYPE </h2>
                </div>
                <ResponsiveContainer width={ '100%' } height={ 250 }>
                    <PieChart   >
                        <Pie
                            dataKey="value"
                            data={ data02 }
                            cx="50%"
                            cy="50%"
                            innerRadius={ 40 }
                            outerRadius={ 60 }
                            fill="#8884d8"
                            paddingAngle={ 5 }
                            label

                        >

                            { colors.map((color, index) => <Cell key={ index } fill={ color } />) }
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default smallPie;