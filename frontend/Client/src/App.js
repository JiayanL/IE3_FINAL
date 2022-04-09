



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
import { saveAs } from "file-saver";
import { rename } from 'fs';
import {Buffer} from 'buffer'

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

  onChange = e => {
    const errs = [] 
    //const files = Array.from(e.target.files)

    const file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(a) {
      var img = document.createElement('img')
      img.src = a.target.value
      document.body.appendChild(img)
    }
    reader.readAsDataURL(file);
    console.log(file.arrayBuffer);
    var objImg = new Buffer.from(file.arrayBuffer);//.toString("base64");
    

    /*
    rename('oldFile.txt', 'newFile.txt', (err) => {
      if (err) throw err;
      console.log('Rename complete!');
    });

    rename(link, 'downloads\\ieee\\backend\\mri.jpeg')*/

    //var base64 = "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" ;
    

    //var a = saveAs(new File([base64], file.name, {type: file.type}));

    

    //// MOVE DOWNLOADED IMAGE TO BACKEND FOR MODEL
    //rename(link, 'downloads\ieee\backend\mri.jpeg')

    //reader.readAsDataURL(img);
    
/*
    var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");

    // Make sure canvas is as big as the picture
    imgCanvas.width = img.width;
    imgCanvas.height = img.height;

    // Draw image into canvas element
    imgContext.drawImage(img, 0, 0, img.width, img.height);*/
    /*
    var link = document.createElement("a");

    link.setAttribute("href", base64);
    link.setAttribute("download", file.name);
    link.click();*/
  /*
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");


    c.width = file.naturalWidth;     // update canvas size to match image
    c.height = file.naturalHeight;
    ctx.drawImage(file, 0, 0);       // draw in image
    c.toBlob(function(blob) {        // get content as JPEG blob
      // here the image is a blob
      reader.readAsDataURL(c);

      var base64 = reader.result ;
      var link = document.createElement("a");

      document.body.appendChild(link); // for Firefox

      link.setAttribute("href", base64);
      link.setAttribute("download", file.name);
      link.click();
    }, "image/jpeg", 0.75);
    
*/
/*
    let canvas = document.createElement("canvas");
    let a = document.createElement('a');
    a.href = canvas.toDataURL(file.type);
    a.download = file.name;
    document.body.appendChild(a);
*/
    //formData.append('image', URL.createObjectURL(e.target.files[0]));

    /*
    files.forEach((file, i) => {
      formData.append(i, file)
    })*/
    
    //this.helper(formData, this.images);
    this.setState({ uploading: true })
    
    

    //formData.append('image', reader.readAsDataURL(file));
    
    fetch('http://127.0.0.1:5000/receiver', {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(file)
    }).then(res => {
      if (res.ok) {
        return res.json();//console.log(res);
      } else {
        alert("something's wrong")
      }
    }).then (images => {
      this.setState({
        uploading: false, 
        images
      })
    }).catch(err => {
      console.log("error: ", err)
    })

    
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

