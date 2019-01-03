import React from 'react';
import moment from "moment";
import Currency from "./Currency";
import {Table } from 'reactstrap';
// import CoinMarketCap from "coinmarketcap-api";

const API = 'http://martinusmaco.sk/portfolio/api.php';
// const API_KEY = '46134641-0b7f-4b1e-8d14-b78589ac7b0b';
// const client = new CoinMarketCap(API_KEY);

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            raw_data : []
        };

    }

    render() {
        const {raw_data, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading ... </p>
        }
        return (
            <div>
                <Table dark striped>
                    <thead>
                        <tr>
                            <th>Coin</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {raw_data.currencies.map(c =>
                            <Currency data={c} />
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }

    componentDidMount() {
        fetch(API)
            .then(response => response.json())
            .then(data => {
                this.setState({raw_data: data, isLoading: false});
                // this.filterEvents();
            })
        //
    }

    filterEvents() {
        let events = [];
        let all_events = this.state.all_events;
        all_events.forEach((e) => {
            if (moment(moment.now()) < moment(e.start.dateTime)) {
                events.push(e);
                let a = moment(e.start.dateTime);
                a.format("DD.MM.YYYY HH-mm");
                console.log(a);
                console.log(a.format("DD-MM-YYYY"));
                //
            }
        });
        this.setState({events: events});
    }
}

export default Portfolio;