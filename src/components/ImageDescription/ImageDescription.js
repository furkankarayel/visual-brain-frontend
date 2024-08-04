import React from "react";
import './ImageDescription.css'

const ImageDescription = ({ text }) => {
    if (text)
    return (
    <div className="center">
        <div className="br3 hidden ba b--black-10 ma4 w-90-m w-80-l w-95-s">
            <h1 className="f1 bg-near-white br3 br--top black-60 mv0 pv2 ph3">What has been detected?</h1>
            <div className="pa3 bt center bg-white-30">
                <p className="f2 black -ns lh-copy measure">
                    {text.toUpperCase()}
                </p>
            </div>
        </div>
    </div>
    )
}

export default ImageDescription;