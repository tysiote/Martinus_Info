import React from 'react';

// const API = 'https://api.coinmarketcap.com/v2/ticker/';
// const API = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const BITCOIN_MAX_USD = 20089;
const IMG_PATH = "https://s2.coinmarketcap.com/static/img/coins/32x32/";

class Currency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loaded: false,
            is_valid: false,
            amount: 0,
            in_btc: 0,
            target_btc: 0,
            amount_shown: '',
            si: 1,
            diff: {
                hour: 0,
                day: 0,
                week: 0
            },
            asset: {
                usd: 0,
                class: '',
                shown: ''
            },
        }
    }

    componentDidMount() {
        let binance = null;
        let amount = null;
        let bitcoin_usd = null;
        if (this.props.hasOwnProperty('binance')) {
            this.props.binance.forEach((b) => {
                if (b.hasOwnProperty('free') && b.hasOwnProperty('locked')) {
                    let free = parseFloat(b.free);
                    let locked = parseFloat(b.locked);
                    if (b.hasOwnProperty('asset')) {
                        if (b.asset.toLowerCase() === 'btc') {
                            bitcoin_usd = this.props["bitcoin"]["other"]["quote"]["USD"]["price"];
                        }
                        if (b.asset.toLowerCase() === this.props.data.abbr.toLowerCase()) {
                            binance = b;
                            amount = free;
                            if (locked) {
                                amount = (free + locked).toFixed(2) + ' (' + b.locked.toFixed(2) + ' locked)';
                            }
                        }
                    }
                }
            });
        }
        let state = this.state;
        state.is_loaded = true;
        this.setState(state);
        if (this.props.data.hasOwnProperty('other') && this.props.data['other'].hasOwnProperty('quote') && this.props.data['other']['quote'].hasOwnProperty('USD') && this.props.data['other']['quote']['USD'].hasOwnProperty('price')) {
            state.target_btc = this.props.data["target_bitcoin"];
            state.amount = 0;
            if (binance) {
                state.amount = parseFloat(binance["free"]) + parseFloat(binance["locked"]);
            }
            state.asset.usd = this.props.data["other"]["quote"]["USD"]["price"];
            let in_usd = state.amount * state.asset.usd;
            state.in_usd = parseFloat(in_usd);
            if (state.in_usd > 0.01) {
                state.in_usd = state.in_usd.toFixed(2);
            } else {
                state.in_usd = 0;
            }
            state.in_btc = (this.state.in_usd / bitcoin_usd);
            state.si = parseFloat((state.target_btc * BITCOIN_MAX_USD) / ((state.asset.usd / bitcoin_usd) * bitcoin_usd)).toFixed(1);
            state.amount_shown = amount;
            state.diff.hour = this.props.data["other"]["quote"]["USD"]["percent_change_1h"];
            state.diff.day = this.props.data["other"]["quote"]["USD"]["percent_change_24h"];
            state.diff.week = this.props.data["other"]["quote"]["USD"]["percent_change_7d"];
            state.asset.class = 'price-xs';
            state.asset.shown = parseFloat(state.asset.usd).toFixed(5);
            if (state.asset.usd > 0.001) {
                state.asset.class = 'price-sm';
                state.asset.shown = parseFloat(state.asset.usd).toFixed(3);
            }
            if (state.asset.usd > 1) {
                state.asset.class = 'price-md';
                state.asset.shown = parseFloat(state.asset.usd).toFixed(2);
            }
            if (state.asset.usd > 100) {
                state.asset.class = 'price-lg';
                state.asset.shown = parseFloat(state.asset.usd).toFixed(1);
            }
            if (state.asset.usd > 1000) {
                state.asset.class = 'price-xl';
                state.asset.shown = parseFloat(state.asset.usd).toFixed(0);
            }
            state.is_valid = true;
            this.setState(state);
        }
    }

    render() {
        if (this.state.is_loaded) {
            if (this.state.is_valid) {
                let diff1 = this.state.diff.hour;
                let diff2 = this.state.diff.day;
                let diff3 = this.state.diff.week;
                return (
                    <tr>
                        <td><img src={IMG_PATH + this.props.data["coinmarketcap_id"] + ".png"} alt="logo" /> {this.props.data['other'].name}</td>
                        <td>{this.state.in_usd} $</td>
                        <td>{this.state.amount_shown}</td>
                        <td>{this.state.si}</td>
                        <td>
                            <span className={"diff " + (diff1 >= 0 ? 'diff-success': 'diff-danger')}>{diff1.toFixed(2)}%</span>,&nbsp;
                            <span className={"diff " + (diff2 >= 0 ? 'diff-success': 'diff-danger')}>{diff2.toFixed(2)}%</span>,&nbsp;
                            <span className={"diff " + (diff3 >= 0 ? 'diff-success': 'diff-danger')}>{diff3.toFixed(2)}%</span>
                        </td>
                        <td><span className={this.state.asset.class}>{this.state.asset.shown}$</span></td>
                    </tr>
                );
            } else {
                console.log("ERROR", this.state, this.props);
                return (
                    <tr></tr>
                );
            }
        } else {
            return (
                <tr></tr>
            );
        }
    }
}

export default Currency;