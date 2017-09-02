import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

// const About = () => (
//   <div>
//     <h2>About</h2>
//     <code>{this.getEncounters()}</code>
//   </div>
// )

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
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
        console.log("Component mounted.");

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
                <MainMenu />
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
                    <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/about">About</Link></li>
                      <li><Link to="/topics">Topics</Link></li>
                    </ul>

                    <hr/>

                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={this.About}/>
                    <Route path="/topics" component={Topics}/>

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
                <MainMenu />
            );
        }
    }
}

class MainMenu extends Component {
    render() {
            return (
                <Router>
                <div className="App">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/encounters">Encounters</Link></li>
                  <li><Link to="/colonists">Colonists</Link></li>
                </ul>

                <hr/>

                <Route exact path="/" component={Home}/>
                <Route path="/encounters" component={Encounters}/>
                <Route path="/colonists" component={Colonists}/>
                </div>
                </Router>
            );
        }
}

class Colonists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colonist: []
        }
    }

    componentDidMount() {
        console.log("Component mounted.");

        //this.getEncounters();
        this.postColonist();
        //this.getColonists();
        //this.getJobs();
        //this.getAliens();
        //this.getColonists();
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

    postColonist() {
        axios.post('https://red-wdp-api.herokuapp.com/api/mars/colonists', {
            "colonist" : {
                "name" : "Jimbo",
                "age" : "35",
                "job_id" : "1"
            }
        })
        .then(function (response) {
            this.setState({colonist: response.data.colonist});
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
            //let colonist = this.state.colonist;

            return (
                <div className="App">
                    <div>
                    </div>
                </div>
            );
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
