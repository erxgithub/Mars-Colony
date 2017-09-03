import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';

const Home = () => (
  <div>
    <h2>Welcome to Mars Colony!</h2>
  </div>
)

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colonists: [],
            jobs: [],
            aliens: [],
            encounters: []
        }
    }

    componentDidMount() {
        console.log("App - component mounted.");

        //this.getEncounters();
        //this.getColonists();
        //this.getJobs();
        //this.getAliens();
        //this.postColonist();
        //this.postEncounter();
    }

    getColonists() {
        axios.get('https://red-wdp-api.herokuapp.com/api/mars/colonists')
            .then((response) => {
                this.setState({colonists: response.data.colonists});
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getJobs() {
        axios.get('https://red-wdp-api.herokuapp.com/api/mars/jobs')
            .then((response) => {
                this.setState({jobs: response.data.jobs});
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getAliens() {
        axios.get('https://red-wdp-api.herokuapp.com/api/mars/aliens')
            .then((response) => {
                this.setState({aliens: response.data.aliens});
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    about() {
        this.getEncounters();
    }

    getEncounters() {
        axios.get('https://red-wdp-api.herokuapp.com/api/mars/encounters')
            .then((response) => {
                this.setState({encounters: response.data.encounters});
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    postColonist() {
        axios.post('https://red-wdp-api.herokuapp.com/api/mars/colonists', {
            "colonist" : {
                "name" : "Hooper",
                "age" : "37",
                "job_id" : "3"
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    postEncounter() {
        axios.post('https://red-wdp-api.herokuapp.com/api/mars/encounters', {
            "encounter" : {
                "atype" : "Octospider",
                "date" : "2017-08-31",
                "action" : "Web developer.",
                "colonist_id" : "4"
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        if (this.state.colonists.length > 0) {
            let colonists = this.state.colonists;

            return (
                <div className="App">
                    <div>
                        {colonists.map(colonist => <h6 key={colonist.id}>{colonist.id}, {colonist.name}, {colonist.age}, {colonist.job.id}, {colonist.job.name}, {colonist.job.description}</h6>)}
                    </div>
                </div>
            );
        } else if (this.state.jobs.length > 0) {
            let jobs = this.state.jobs;

            return (
                <div className="App">
                    <div>
                        {jobs.map(job => <h6 key={job.id}>{job.id}, {job.name}, {job.description}</h6>)}
                    </div>
                </div>
            );
        } else if (this.state.aliens.length > 0) {
            let aliens = this.state.aliens;

            return (
                <div className="App">
                    <div>
                        {aliens.map(alien => <h6 key={alien.id}>{alien.id}, {alien.type}, {alien.description}, {alien.submitted_by}</h6>)}
                    </div>
                </div>
            );
        } else if (this.state.encounters.length > 0) {
            let encounters = this.state.encounters;
            let recents = encounters.filter((encounter) => encounter.date >= '2017-01-01' );

            return (
                <Router>
                  <div>
                    <div className="App">
                        <div>
                            {recents.map(encounter => <h6 key={encounter.id}>{encounter.id}, {encounter.date}, {encounter.job_id}, {encounter.atype}, {encounter.action}</h6>)}
                        </div>
                    </div>
                  </div>
                </Router>
            );
        } else {
            return (
                <Router>
                    <div className="App">

                        <div className="container">
                            <ul className="main-menu">
                                <li><Link to="/">Home</Link></li>
                            </ul>

                            <div className="dropdown">
                                <button className="dropbtn">Colonists</button>
                                <div className="dropdown-content">
                                    <ul>
                                        <li><Link to="/newcolonist">Register New</Link></li>
                                        <li><Link to="/listcolonists">Listing</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="dropdown">
                                <button className="dropbtn">Encounters</button>
                                <div className="dropdown-content">
                                    <ul>
                                        <li><Link to="/newencounter">Report New</Link></li>
                                        <li><Link to="/recentencounters">List Recent</Link></li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <Route exact path="/" component={Home}/>
                        <Route path="/newcolonist" component={NewColonist}/>
                        <Route path="/newencounter" component={NewEncounter}/>
                    </div>
                </Router>
            );
        }
    }
}

class NewColonist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            response: [],
            jobs: [],
            name: '',
            age: '',
            job_id: ''
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
        axios.get('https://red-wdp-api.herokuapp.com/api/mars/jobs')
            .then((response) => {
                this.setState({
                    jobs: response.data.jobs,
                    job_id: response.data.jobs[0].id
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
                this.setState({response: response});
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
        } else if (this.state.jobs.length > 0) {
            let jobs = this.state.jobs;

            return (
                <form onSubmit={(event) => this.handleSubmit(event)}>
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
            action: ''
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
        axios.get('https://red-wdp-api.herokuapp.com/api/mars/aliens')
            .then((response) => {
                this.setState({
                    aliens: response.data.aliens,
                    alien_type: response.data.aliens[0].type
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
                this.setState({response: response});
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
        } else if (this.state.aliens.length > 0) {
            let aliens = this.state.aliens;
            console.log(this.state.alien_id);

            return (
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <br />
                    <div>
                    <label>Colonist ID:</label>
                    <input
                        name="colonist_id"
                        type="text"
                        value={this.state.colonist_id}
                        placeholder="Colonist ID"
                        required
                        onChange={(event) => this.handleChange(event)} />
                    </div>
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

class Encounters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            encounters: []
        }
    }

    componentDidMount() {
        console.log("Component mounted.");

        this.getEncounters();
        //this.getColonists();
        //this.getJobs();
        //this.getAliens();
        //this.postColonist();
        //this.postEncounter();
    }

    getEncounters() {
        axios.get('https://red-wdp-api.herokuapp.com/api/mars/encounters')
            .then((response) => {
                this.setState({encounters: response.data.encounters});
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    postEncounter() {
        axios.post('https://red-wdp-api.herokuapp.com/api/mars/encounters', {
            "encounter" : {
                "atype" : "Octospider",
                "date" : "2017-08-31",
                "action" : "Web developer.",
                "colonist_id" : "4"
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
            let encounters = this.state.encounters;
            let recents = encounters.filter((encounter) => encounter.date >= '2017-01-01' );

            return (
                <Router>
                    <div className="Encounters">
                        <div>
                            {recents.map(encounter => <h6 key={encounter.id}>{encounter.id}, {encounter.date}, {encounter.job_id}, {encounter.atype}, {encounter.action}</h6>)}
                        </div>
                    </div>
                </Router>
            );
        }
}

export default App;
