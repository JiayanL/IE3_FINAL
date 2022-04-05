import React from 'react'
import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-fontawesome'
import { faTimesCircle } from '../node_modules/@fortawesome/free-solid-svg-icons'
//import { faImages } from '@fortawesome/free-solid-svg-icons'
//import Notifications, { notify } from 'react-notify-toast'

const toastColor = { 
  background: '#505050', 
  text: '#fff' 
}

export default props => 
  //props.images.map((image, i) => props.removeImage(image.public_id))
  
  /*
      <div 
        onClick={() => props.removeImage(image.public_id)} 
        className='delete'
      >
        <FontAwesomeIcon icon={faTimesCircle} size='2x' />
      </div>
  */

  props.images.map((image, i) =>
    <div key={i} className='fadein'>
      <div 
        onClick={() => props.removeImage(image.public_id)} 
        className='delete'
        >
        <FontAwesomeIcon icon={faTimesCircle} size='2x' />
      </div>
      <img 
        src="Prediction.png" 
        alt='' 
        onError={() => props.onError(image.public_id)}
      />
      <p>
        Abnormalities: <var>list1</var>
      </p>
      <p>
        Possible Conditions: <var>list2</var>
      </p>
      
    </div>
  )

