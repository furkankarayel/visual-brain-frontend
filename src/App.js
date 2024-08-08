import React, { Component } from "react";
import Navigation from './components/Navigation/Navigation';
import Logo from "./components/Logo/Logo";
import ImagePickerForm from "./components/ImagePickerForm/ImagePickerForm";
import Rank from "./components/Rank/Rank";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ImageDescription from "./components/ImageDescription/ImageDescription";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import './App.css';
import 'tachyons';

const API_URL = process.env.REACT_APP_API_URL

const initialState = {
  init: false,
  input: '',
  imageUrl: '',
  route: 'login',
  isSignedIn: false,
  box: [],
  description: '',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onImageSubmit = (event) => {
    this.setState({ imageUrl: this.state.input })
    fetch(`${API_URL}/image/facedetection`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "input": this.state.input
      })})
    .then(response => response.json())
    .then(response => {
      if(response) {
        this.displayFaceBox(this.calculateFaceLocation(response))
        fetch(`${API_URL}/image`, {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id,
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
      
      })
      .catch(error => console.log('error', error));

      fetch(`${API_URL}/image/description`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
         "input": this.state.input
        })})
      .then(response => response.json())
      .then(response => {
        if(response) {
          this.displayImageDescription(response)
          fetch(`${API_URL}/image`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
            })})
            .then(response => response.json())
            .then(count => {
             
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
        }
      })
      .catch(error => console.log('error', error));
    }
  

   calculateFaceLocation = (data) => {
    const faceLocations = [];

    if(data && data[0].data) {
      const regions = data[0].data.regions;

      if (regions.length > 1) {
        regions.forEach(region => {
          const clarifaiFace = region.region_info.bounding_box;
          const image = document.getElementById('inputimage');
          const width = Number(image.width);
          const height = Number(image.height);
          
          const faceLocation = {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width * 0.95),
            bottomRow: height - (clarifaiFace.bottom_row * height * 0.95)
          };
    
          faceLocations.push(faceLocation);
        });
      } else if (regions.length === 1) {
        const clarifaiFace = regions[0].regionInfo.boundingBox;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        
        const faceLocation = {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width * 0.95),
          bottomRow: height - (clarifaiFace.bottom_row * height * 0.95)
        };
    
        faceLocations.push(faceLocation);
      }
    }
    

    return faceLocations;
  }
  
  displayImageDescription = (data) => {
    if(data && data[0]) {
      const imageDescription = data[0].data.text.raw;
      this.setState({ description: imageDescription });
    }

  }

  displayFaceBox = (box) => {
    if(box) {
      this.setState({ box: box });
    }
 
  }

  componentDidMount() {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      this.setState({ init: true });
    });
  } 

  onRouteChange = (route) => {
    if ( route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {
    const { init } = this.state;
    const options = {
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 200,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }



    if (init) {
      return (
        
        <div className="App">
          <Particles className="particles" options={options} />
          { (this.state.route === 'login' || this.state.route === 'register')
          ?
          <div></div>
          :
          <div>
            <Logo />
            <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
          </div>
        }
          { this.state.route === 'home' 
            ?  
            <div> 
              
              <div className="br4 pa4 bg-white ml-auto mr-auto ba b--black-40 w-60-l w-80-s shadow-5">
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImagePickerForm onInputChange={this.onInputChange} onButtonSubmit={this.onImageSubmit} />
              </div>
              <ImageDescription text={this.state.description}/>
              <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
              
              
            </div>
             :
             (
             this.state.route === 'login'
             ? <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            ) 
            }
          
      
        </div>
      );
    }
  }
}

export default App;
