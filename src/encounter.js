import React, { Component } from 'react';
import axios from 'axios';

class NewEncounter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            response: [],
            aliens: [],
            colonist_id: '',
            date: '',
            alien_id: '',
            alien_type: '',
            action: '',
            message: ''
        }
    }

    componentDidMount() {
        console.log("Colonists - component mounted.");

        //this.getEncounters();
        //this.postColonist();
        //this.getColonists();
        //this.getJobs();
        this.getAliens();
        //this.getColonists();
        //this.postEncounter();
    }

    getAliens() {
        this.setState({
            message: 'Loading...'
        });

        axios.get('https://red-wdp-api.herokuapp.com/api/mars/aliens')
            .then((response) => {
                this.setState({
                    aliens: response.data.aliens,
                    alien_type: response.data.aliens[0].type,
                    message: ''
                });
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Input values: ' + this.state.colonist_id + ' / ' + this.state.date + ' / ' + this.state.alien_type + ' / ' + this.state.action);
        this.postEncounter();
        event.preventDefault();
    }

    postEncounter() {
        this.setState({
            message: 'Submitting...'
        });

        axios.post('https://red-wdp-api.herokuapp.com/api/mars/encounters', {
            "encounter" : {
                "atype" : this.state.alien_type,
                "date" : this.state.date,
                "action" : this.state.action,
                "colonist_id" : this.state.colonist_id
            }
        })
        .then((response) => {
            if (response) {
                //console.log(response);
                this.setState({
                    response: response,
                    message: ''
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        console.log(this.state.response);
        if (this.state.response.data !== undefined) {
            let encounter = this.state.response.data.encounter;
            console.log(encounter);

            return (
                <div className="App">
                    <p>Your encounter report has been submitted.</p>
                    <br />
                    <div className="report-line">
                        <div>
                            <span><b>Encounter ID</b></span>
                            <span><b>Date</b></span>
                            <span><b>Colonist ID</b></span>
                            <span><b>Alien Type</b></span>
                            <span><b>Action Taken</b></span>
                        </div>
                    </div>
                    <div className="report-line">
                        <div>
                            <span>{encounter.id}</span>
                            <span>{encounter.date}</span>
                            <span>{encounter.colonist_id}</span>
                            <span>{encounter.atype}</span>
                            <span>{encounter.action}</span>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.message.length > 0) {
            return (
                <div>
                    <br />
                    <h4>{this.state.message}</h4>
                </div>
            );
        } else if (this.state.aliens.length > 0) {
            let aliens = this.state.aliens;
            console.log(this.state.alien_id);

            return (
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <br />
                    <h3>New Encounter</h3>
                    <br />
                    <label>Colonist ID:</label>
                    <input
                        name="colonist_id"
                        type="text"
                        value={this.state.colonist_id}
                        required
                        onChange={(event) => this.handleChange(event)} />
                    <br />
                    <label>Date:</label>
                    <input
                        name="date"
                        type="date"
                        value={this.state.date}
                        required
                        onChange={(event)=>this.handleChange(event)} />
                    <br />
                    <label>Alien Type:</label>
                    <select name="alien_type" value={this.state.alien_type} onChange={(event) => this.handleChange(event)}>
                        {aliens.map(alien => <option key={alien.id} value={alien.type}>{alien.type}</option>)}
                    </select>
                    <br />
                    <label>Action Taken:<br /></label>
                    <textarea
                        name="action"
                        value={this.state.action}
                        required
                        onChange={(event) => this.handleChange(event)} />
                    <br />
                    <input type="submit" value="Submit" />
                    <br />
                    <br />
                </form>
            );
        } else {
            return(
                <div>
                </div>
            );
        }
    }
}

class ListEncounters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            response: [],
            message: ''
        }
    }

    componentDidMount() {
        console.log("Colonists - component mounted.");

        this.getEncounters();
    }

    getEncounters() {
        this.setState({
            message: 'Loading...'
        });

        axios.get('https://red-wdp-api.herokuapp.com/api/mars/encounters')
            .then((response) => {
                this.setState({
                    response: response,
                    message: ''
                });
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        console.log(this.state.response);
        if (this.state.response.data !== undefined) {
            let encounters = this.state.response.data.encounters;
            let recents = encounters.filter((encounter) => encounter.date >= '2017-01-01' );

            return (
                <div className="App">
                    <br />
                    <h4>Recent Encounters</h4>
                    <br />
                    <div className="report-heading report-column">
                        <div>
                            <span><b>Encounter</b></span>
                            <span><b>Date</b></span>
                            <span><b>Colonist</b></span>
                            <span><b>Alien Type</b></span>
                            <span><b>Action Taken</b></span>
                        </div>
                    </div>
                    <br />
                    <div className="report-line report-column">
                        {recents.map(encounter =>
                            <div key={encounter.id}>
                                <span>{encounter.id}</span>
                                <span>{encounter.date.substring(0,10)}</span>
                                <span>{encounter.colonist_id}</span>
                                <span>{encounter.atype}</span>
                                <span>{encounter.action}</span>
                            </div>
                        )}
                    </div>
                </div>
            );
        } else if (this.state.message.length > 0) {
            return (
                <div>
                    <br />
                    <h4>{this.state.message}</h4>
                </div>
            );
        } else {
            return(
                <div>
                </div>
            );
        }
    }
}

export {NewEncounter, ListEncounters};
