import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import {NewColonist} from './colonist';
import {NewEncounter, ListEncounters} from './encounter';

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
                                        <li><Link to="/listencounters">List Recent</Link></li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <Route exact path="/" component={Home}/>
                        <Route path="/newcolonist" component={NewColonist}/>
                        <Route path="/newencounter" component={NewEncounter}/>
                        <Route path="/listencounters" component={ListEncounters}/>
                    </div>
                </Router>
            );
        }
    }
}

export default App;
