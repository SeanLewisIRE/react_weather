import React, {Component} from 'react';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import placeholderImg from './components/img/background-placeholder.jpg'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      background: '',
      isLoaded: false,
      location: '',
      country: '',
      temp: '',
      weather_main: '',
      weather_desc: '',
      icon: '',
      isActive: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ background: placeholderImg });
  };

  handleChange(e) {
    this.setState({query: e.target.value});
  };


  handleSubmit(e) {
    Promise.all([
      fetch(`https://api.unsplash.com/search/photos?page=1&query=${this.state.query}-city&client_id=4e2cb4fefbcb90d124c35c05112315f1a9ba5e10de372fc7eb1f54c74807ade2`)
      .then(res => res.json()),
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.query}&APPID=40e3500120c6d881f6f45e3e83c48104`)
      .then(res => res.json())
    ])
    .then((result) => {
      this.setState({
        isLoaded: true,
        background: result[0].results[0].urls.full,
        location: result[1].name,
        country: result[1].sys.country,
        temp: result[1].main.temp,
        weather_main: result[1].weather[0].main,
        weather_desc:  result[1].weather[0].description,
        icon: result[1].weather[0].icon,
        isActive: true
      });
    });
    e.preventDefault();

  }

  render() {

    const {isLoaded, background, location, temp, weather_main, weather_desc, icon, isActive, country} = this.state;

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

        <WeatherDisplay
          location={location}
          temp={temp}
          weather_main={weather_main}
          weather_desc={weather_desc}
          icon={icon}
          isActive={isActive}
          country={country}
         />
         
        </div>
      );
     


  
  }
 
}

export default App;
