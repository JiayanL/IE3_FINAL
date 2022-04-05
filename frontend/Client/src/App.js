



///////////
///////////
///////////  CALL
///////////  BACKEND
///////////  THROUGH
///////////  APP.JS
///////////
///////////


import React, { Component, useRef } from 'react'
//import Notifications, { notify } from 'react-notify-toast'
import Images from './Images'
import Buttons from './Buttons'
import WakeUp from './WakeUp'
//import Header from "./components/Navigation";
//import Footer from './components/Footer'
//import { API_URL } from './config'
//import './App.css'

const toastColor = { 
  background: '#505050', 
  text: '#fff' 
}

//image_scanned = false;

function until(conditionFunction) {

  const poll = resolve => {
    if(conditionFunction()) {
      resolve();
    }
    else {
      setTimeout(_ => poll(resolve), 400)
    };
  }

  return new Promise(poll);
}


export default class App extends Component {

  state = {
    loading: false,
    uploading: false,
    images: []
  }

  

/*
  componentDidMount() {
    
    fetch(`${API_URL}/wake-up`)
      .then(res => {
        if (res.ok) {
          return this.setState({ loading: false })  
        }
        const msg = 'Something is went wrong with Heroku' 
        //this.toast(msg, 'custom', 2000, toastColor)
      })
  }*/

  //toast = notify.createShowQueue()
  //async helper(formData, images){
    
    /*
    .then(res => {
      if (!res.ok) {
        throw res
      }
      return res.json()
    })
    .then(images => {
      this.setState({
        uploading: false, 
        images
      })
    })*/
  //}

  onChange = async (e) => {
    const errs = [] 
    const files = Array.from(e.target.files)
   
    const formData = new FormData()
    
    //this.helper(formData, this.images);
    this.setState({ uploading: true })
    //const ans = 

    ///// trying new way to fetch
    /*
    if (imageRef.current) {
      const formData = new FormData();
      formData.append('image', imageRef.current);

      const response = await fetch('/classify', {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        const text = await response.text();
        //setResult(text);
        image_scanned = true;
      } else {
        //setResult("Error from API.");
      }
    }
    */

    ///// another way to fetch
    /*
    return fetch('/classify', {
        method: "POST",
        body: formData,
      })
      .then(async function(response) {
        await until(_ => response.ok == true);

        if (response.ok){
          return response.json();
        }
      })
      .then (images => {
        this.setState({
          uploading: false, 
          images
        })
      });*/

    ///// another another way to fetch
    //const imageRef = useRef();

    //formData.append('image');

    const response = await fetch('/classify', {
      method: "POST",
      body: formData
    })

    async function image_uploaded(){
      if (await response.json()){
        const json = await response.json();

        this.setState({
          uploading: false,
          json
        })
      }
      
    }

    image_uploaded();

    ///// old way to fetch
    /*
    fetch(`/classify`, {
      method: 'POST',
      body: formData
    })
    .then(res => {
      if (!res.ok) {
        throw res
      }
      return res.json();
    })
    //if (ans.status === 405){
    .then (images => {
        this.setState({
          uploading: false, 
          images
        })
      })
    //}*/


    /*
    .catch(err => {
      err.json().then(e => {
        //this.toast(e.message, 'custom', 2000, toastColor)
        this.setState({ uploading: false })
      })
    })*/
  }

  filter = id => {
    return this.state.images.filter(image => image.public_id !== id)
  }

  removeImage = id => {
    this.setState({ images: this.filter(id) })
  }

  onError = id => {
    //this.toast('Oops, something went wrong', 'custom', 2000, toastColor)
    this.setState({ images: this.filter(id) })
  }
  
  render() {
    const { loading, uploading, images } = this.state
    const uploaded = []
    
    const content = () => {
      switch(true) {
        case loading:
          return <WakeUp />
        case images.length > 0://image_scanned:
          /*
          file_record.forEach((file, i) =>{
            uploaded.push(`'${file.name}' has been uploaded`)
          })
          uploaded.forEach(err => this.toast(uploaded, 'custom', 2000, toastColor))*/
          return <Images 
                  images={images} 
                  removeImage={this.removeImage} 
                  onError={this.onError}
                  upload={uploaded}
                 />
        default:
          return <Buttons onChange={this.onChange} />
      }
    }

    return ( // include <Header /> <Notifications />  <Footer />
      <div className='container'>

        <div className='buttons'>
          {content()}
        </div>


      </div>
    )
  }

  test(){
    
  }
}

