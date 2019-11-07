import React, {Component} from 'react';
import { unsplashURL, unsplashAPI, weatherURL, weatherAPI } from './config.js';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import Spinner from './components/Spinner/Spinner'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      background: '',
      loading: false,
      location: '',
      country: '',
      temp: '',
      weather_main: '',
      weather_desc: '',
      icon: '',
      credit: '',
      creditLink: ''
    };    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchItems("London");
  };
  
  handleChange(e) {
    this.setState({search: e.target.value});
  };

  handleSubmit(e) {
    this.setState({ loading: true })
    this.fetchItems(this.state.search);
    e.preventDefault();
  }

  fetchItems = (query) => {
    Promise.all([
      fetch(`${unsplashURL}&query=${query}-city&client_id=${unsplashAPI}`)
      .then(res => res.json()),
      fetch(`${weatherURL}?q=${query}&APPID=${weatherAPI}`)
      .then(res => res.json())
    ])
    .then((result) => {
      this.setState({
        loading: false,
        background: result[0].results[0].urls.full,
        location: result[1].name,
        country: result[1].sys.country,
        temp: result[1].main.temp,
        weather_main: result[1].weather[0].main,
        weather_desc:  result[1].weather[0].description,
        icon: result[1].weather[0].icon,
        credit: result[0].results[0].user.name,
        creditLink: result[0].results[0].user.links.html
      });
    });
  }


  render() {

    const {loading, background, location, temp, weather_main, weather_desc, icon, country, credit, creditLink} = this.state;

    const backgroundStyle = {      
      backgroundImage: `url("${background}")`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };

      return (
        <div 
        className="App"
        style={backgroundStyle}
        >
        
          <div className="searchbar-container">
            <form className="searchbar-content" onSubmit={this.handleSubmit}>
                <button className="btn" type="submit"><i className="icon fas fa-search fa-lg"></i></button>
                <input className="searchbar-input" type="text" value={this.state.query} onChange={this.handleChange} placeholder="Search City..."/>
            </form>
          </div>

        
          {loading ? <Spinner /> : null}

          <WeatherDisplay
            location={location}
            temp={temp}
            weather_main={weather_main}
            weather_desc={weather_desc}
            icon={icon}
            country={country}
            credit={credit}
            creditLink={creditLink}
          />
         
        </div>
      );  
  }
 
}

export default App;
