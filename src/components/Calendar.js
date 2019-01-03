import React from 'react';
import moment from 'moment';
// import 'moment-timezone';

const API = 'https://www.googleapis.com/calendar/v3/calendars/martinusmaco@gmail.com/events?key=AIzaSyCEkYFfS9avBnjXP1xX5EJBm2gm3rrHuh4';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            events : [],
            all_events: []
        };

    }


    render() {
            const {events, isLoading} = this.state;
            if (isLoading) {
                return <p>Loading ... </p>
            }
            return (
            <ul>
                {events.map(event =>
                    <li key={event.id}> {event.summary}, {moment(event.start.dateTime).format("DD.MM.YYYY HH-mm")}</li>
                )}
            </ul>
            );
        }

    componentDidMount() {
        fetch(API)
            .then(response => response.json())
            .then(data => {
                this.setState({all_events: data.items, isLoading: false});
                this.filterEvents();
            })
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

export default Calendar;