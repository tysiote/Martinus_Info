import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsTheme from 'highcharts';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total_usd : 0,
            data: [],
            theme: {}
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
        state.theme = {
            legend: {
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                }
            },
            legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
            background2: '#505053',
            dataLabelsColor: '#B0B0B3',
            textColor: '#C0C0C0',
            contrastTextColor: '#F0F0F3',
            maskColor: 'rgba(255,255,255,0.3)'
        };
        this.setState(state);
    }

    setOptions() {
        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'My portfolio [' + this.state.total_usd + '$]'
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
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
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
        let chart = Highcharts;
        chart.setTheme(this.state.theme);
        chart.setOptions(this.setOptions());
        return (
            <div>
                <HighchartsReact
                    highcharts={chart}
                    // options={this.setOptions()}
                    // theme={HighchartsTheme.dark}
                />
            </div>
        );
    }
}


export default Chart;