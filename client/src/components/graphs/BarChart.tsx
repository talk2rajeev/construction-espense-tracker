import React from 'react';
import { Bar } from 'react-chartjs-2';

interface PropsItem {
    data: Array<number>,
    labels: Array<string>,
    
}

interface Props {
    data: PropsItem,
    bartitle: string
}

const getColorCode = () => {
    const colorCode: any = {
        1: 'rgba(59, 59, 110, 1)',
        2: 'rgba(197, 11, 30, 1)',
        3: 'rgba(53, 159, 141, 1)',
        4: 'rgba(175, 190, 90, 1)',
        5: 'rgba(255, 206, 2, 1)',
        6: 'rgba(58, 101, 161, 1)',
        7: 'rgba(255, 153, 50, 1)',
        8: 'rgba(0, 65, 27, 1)',
        9: 'rgb(250, 173, 20, .7)',
        10: 'rgb(173, 3, 3, .7)',
    };
    return colorCode[Math.random() * 10];
}

const BarChart = ({data, bartitle}: Props) => {
    let bgcolors = data.labels.map(item=>{
        return getColorCode();
    });
    let chartdata = {
        labels: data.labels,
        datasets:[{
            label: bartitle,
            backgroundColor:  "#4caf50",
            borderWidth: 1,
            fill: true,
            data: data.data
        }]
    };

    let options = {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0
            }    
          }]
        }
    }

    return (
        <Bar data={chartdata} options={options}/>
    )
}

export default BarChart;
