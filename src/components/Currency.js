import React from 'react';

// const API = 'https://api.coinmarketcap.com/v2/ticker/';
const API = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';


class Currency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        // this.setState({
        //     abbr: this.props.abbr,
        //     coinmarketcap_id: this.props.coinmarketcap_id,
        // });
        console.log(this.props);
        //
        // fetch(API + this.props.coinmarketcap_id + "/", {
        //     json: true,
        //     method: "GET",
        //     headers: {"X-CMC_PRO_API_KEY": "46134641-0b7f-4b1e-8d14-b78589ac7b0b"}
        // }).then(response => response.json())
        //     .then(data => {
        //         this.setState({raw_data: data, isLoading: false});
        //         // this.filterEvents();
        //     })
    }

    render() {
        return (
            <tr>
                <td>{this.props.data.abbr}</td>
                <td>{this.props.data.other.quote.USD.price}</td>
            </tr>);
    }

}

export default Currency;