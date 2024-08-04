import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="center mt4">
            <div className="absolute">
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
                {
                    box.map((boxElement, index) => (
                        <div 
                            key={index}
                            className="bounding-box" 
                            style={{ 
                                top: boxElement.topRow, 
                                right: boxElement.rightCol, 
                                bottom: boxElement.bottomRow, 
                                left: boxElement.leftCol 
                            }} 
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default FaceRecognition;
