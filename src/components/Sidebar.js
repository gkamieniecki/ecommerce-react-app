import React, { useState } from 'react'
import "./Sidebar.css"

const Sidebar = ({ width, height, children, hidden, setHidden}, props) => {
    const [xPosition, setX] = React.useState(-width);

//checks if the xPosition is negative = hidden sidepanel 
  const togglePanel= () => {
		if (xPosition < 0) {
			setX(0);
		} else {
			setX(-width);
		}
	}
//useeffect will update the position of the sidepanel 
    React.useEffect(()=>{
			setX(-width);
			if (!hidden) {
				togglePanel();
			}
		}, []);

		const handleButton = () => {
			togglePanel(); 
			setTimeout(() => {
				setHidden(!hidden);
			}, 1000);
		}

    return(
    <div className="sidepanel" style={{ /* zIndex: `${xPosition < 0 ? "-1" : "1"}` */ }}>
        <div className="side-bar" style={{ width: width, minHeight: height, transform: `translatex(${xPosition}px)` }}>
            <button onClick={handleButton} id="test" className="side-bar-btn" style={{transform: `translate(${width}px, 20vh)` }}></button>
            <div className="side-bar-content">{children}</div>
        </div>
    </div>
	)
}

export default Sidebar;