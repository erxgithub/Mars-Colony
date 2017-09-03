import React, { Component } from 'react';
import axios from 'axios';

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
        console.log("Colonists - component mounted.");

        //this.getEncounters();
        //this.postColonist();
        //this.getColonists();
        this.getJobs();
        //this.getAliens();
        //this.getColonists();
        //this.postEncounter();
    }

    getJobs() {
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
        console.log('Input values: ' + this.state.name + ' / ' + this.state.age + ' / ' + this.state.job_id);
        this.postColonist();
        event.preventDefault();
    }

    postColonist() {
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
            let colonist = this.state.response.data.colonist;
            console.log(colonist);

            return (
                <div className="App">
                    <div>
                        <h6>{colonist.id}, {colonist.name}, {colonist.age}, {colonist.job.id}, {colonist.job.name}, {colonist.job.description}</h6>
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
        } else if (this.state.jobs.length > 0) {
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

export {NewColonist};
