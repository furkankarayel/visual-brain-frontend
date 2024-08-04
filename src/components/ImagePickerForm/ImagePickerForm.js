import React from "react";
import './ImagePickerForm.css'

const ImagePickerForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="mt5 f3 fw1 black">
                {'Our advanced algorithms will detect objects in your pictures. Go for it..'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className='f4 br2 pa2 w-70 center' placeholder="Enter your image URL…" type='text' onChange={onInputChange} />
                    <button className="f5 br2 no-underline grow dib v-mid black ba b--black w-20" onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImagePickerForm;