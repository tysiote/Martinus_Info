import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total_usd : 0,
            data: [],
        };
    }

    componentDidMount() {
        let data = this.props.data;
        let state = this.state;
        console.log(data);
        let temp = [];
        let total = 0;
        data["binance"].forEach((b) => {
            data["currencies"].forEach((c) => {
                if (b["asset"].toLowerCase() === c["abbr"].toLowerCase()) {
                    let curr = {
                        name: c["other"].name,
                        amount: parseFloat(parseFloat(b["free"]) + parseFloat(b["locked"])),
                        usd: (parseFloat(parseFloat(b["free"]) + parseFloat(b["locked"])) * parseFloat(c["other"]["quote"]["USD"]["price"])).toFixed(2),
                        y: parseFloat(parseFloat(b["free"]) + parseFloat(b["locked"])) * parseFloat(c["other"]["quote"]["USD"]["price"]),
                    };
                    temp.push(curr);
                    total += curr.y;
                }
            });
        });
        state.data = temp;
        state.total_usd = total.toFixed(2);
        this.setState(state);
    }

    setOptions() {
        return {
            chart: {
                plotBackgroundColor: '#282c34',
                backgroundColor: '#282c34',
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
            },
            title: {
                useHTML: true,
                text: 'My portfolio [' + this.state.total_usd + '$]',
                style: {
                    backgroundColor: '#282c34',
                    color: 'white',
                    fontWeight: 'bold'
                },
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>Amount: <b>{point.amount}</b><br>USD: <b>{point.usd}$</b>'
            },
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                floating: true,
                backgroundColor: '#282c34',
                itemStyle: {
                    color: '#FFF',
                    cursor: 'text'
                },
                itemHoverStyle: {
                    color: '#FFF',
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true
                }
            },
            series: {
                name: 'a',
                colorByPoint: true,
                data: this.state.data
            }
        };
    }

    render() {
        return (
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.setOptions()}
                />
            </div>
        );
    }
}


export default Chart;