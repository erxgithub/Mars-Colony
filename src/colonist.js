/*******************************/
/*  colonist.js (Eric Gregor)  */
/*******************************/

import React, { Component } from 'react';
import axios from 'axios';

// new colonist registration

class NewColonist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            response: [],
            jobs: [],
            name: '',
            age: '',
            job_id: '',
            message: ''
        }
    }

    componentDidMount() {
        this.getJobs();
    }

    getJobs() {
        // get job list for dropdown from api

        this.setState({
            message: 'Loading...'
        });

        axios.get('https://red-wdp-api.herokuapp.com/api/mars/jobs')
            .then((response) => {
                this.setState({
                    jobs: response.data.jobs,
                    job_id: response.data.jobs[0].id,
                    message: ''
                });
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
        this.postColonist();
        event.preventDefault();
    }

    postColonist() {
        // post new colonist registration through api

        this.setState({
            message: 'Submitting...'
        });

        axios.post('https://red-wdp-api.herokuapp.com/api/mars/colonists', {
            "colonist" : {
                "name" : this.state.name,
                "age" : this.state.age,
                "job_id" : this.state.job_id
            }
        })
        .then((response) => {
            if (response) {
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
        if (this.state.response.data !== undefined) {
            // confirmation message for api post

            let colonist = this.state.response.data.colonist;

            return (
                <div className="App">
                    <br />
                    <h4>Your colonist registration has been submitted.</h4>
                    <br />
                    <div className="post-response">
                        <div><label>Colonist ID:</label><h5>{colonist.id}</h5></div>
                        <div><label>Name:</label><h5>{colonist.name}</h5></div>
                        <div><label>Age:</label><h5>{colonist.age}</h5></div>
                        <div><label>Job:</label><h5>{colonist.job.name}</h5></div>
                        <div><label>Description:</label><h5>{colonist.job.description}</h5></div>
                    </div>
                </div>
            );
        } else if (this.state.message.length > 0) {
            // display loading message

            return (
                <div>
                    <br />
                    <h4>{this.state.message}</h4>
                </div>
            );
        } else if (this.state.jobs.length > 0) {
            // input form for new colonist registration

            let jobs = this.state.jobs;

            return (
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <br />
                    <h3>New Colonist</h3>
                    <br />
                    <label>Name:</label>
                    <input
                        name="name"
                        type="text"
                        value={this.state.name}
                        required
                        onChange={(event) => this.handleChange(event)} />
                    <br />
                    <label>Age:</label>
                    <input
                        name="age"
                        type="number"
                        value={this.state.age}
                        required
                        onChange={(event)=>this.handleChange(event)} />
                    <br />
                    <label>Job:</label>
                    <select name="job_id" value={this.state.job_id} onChange={(event) => this.handleChange(event)}>
                        {jobs.map(job => <option key={job.id} value={job.id}>{job.name}</option>)}
                    </select>
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

// colonist listing

class ListColonists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            response: [],
            message: ''
        }
    }

    componentDidMount() {
        this.getColonists();
    }

    getColonists() {
        // get colonist listing from api

        this.setState({
            message: 'Loading...'
        });

        axios.get('https://red-wdp-api.herokuapp.com/api/mars/colonists')
            .then((response) => {
                this.setState({
                    response: response,
                    message: ''
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        if (this.state.response.data !== undefined) {
            // display colonist listing

            let colonists = this.state.response.data.colonists;

            return (
                <div className="App">
                    <div className="report-background">
                        <br />
                        <h4>Colonist Listing</h4>
                        <br />
                        <div className="report-heading colonist-report-column">
                            <ListColonistHeadings />
                        </div>
                        <br />
                        <div className="report-line colonist-report-column">
                            {colonists.map(colonist =>
                                <div key={colonist.id}>
                                    <ListColonist
                                        colonist_id={colonist.id}
                                        colonist_name={colonist.name}
                                        colonist_age={colonist.age}
                                        job_name={colonist.job.name}
                                        job_description={colonist.job.description}
                                    />
                                </div>
                            )}
                        </div>
                        <br />
                    </div>
                </div>
            );
        } else if (this.state.message.length > 0) {
            // display loading message

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

// display listing headings

class ListColonistHeadings extends Component {
  render() {
    return (
        <h6>
            <span>ID</span>
            <span>Name</span>
            <span>Age</span>
            <span>Job Name</span>
            <span>Description</span>
        </h6>
    );
  }
}

// display listing row

class ListColonist extends Component {
  render() {
    return (
        <h6>
            <span>{this.props.colonist_id}</span>
            <span>{this.props.colonist_name}</span>
            <span>{this.props.colonist_age}</span>
            <span>{this.props.job_name}</span>
            <span>{this.props.job_description}</span>
        </h6>
    );
  }
}

export {NewColonist, ListColonists};
