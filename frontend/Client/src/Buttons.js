import React from 'react'
import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-fontawesome'
import { faImages, faImage } from '../node_modules/@fortawesome/free-solid-svg-icons'

// <FontAwesomeIcon icon={faImages} color='#6d84b4' size='10x' />

export default props => 
  <div className='buttons fadein'>

    <div className='button'>
      <label htmlFor='multi'>
        <FontAwesomeIcon icon={faImages} color='#6d84b4' size='10x' />
      </label>
      <input type='file' id='multi' onChange={props.onChange} multiple />
    </div>

  </div>