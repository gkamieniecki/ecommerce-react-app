import React from 'react'
import "./Sidebar.css"

const Sidebar = ({ width, height, children}) =>{
    const [xPosition, setX] = React.useState(-width);

    const togglePanel=()=>{
       if (xPosition < 0){
           setX(0);
       } 
       else{
           setX(-width);
       }
    }

    React.useEffect(()=>{
        setX(-width);
    }, []);

    return(
        <React.Fragment>
        <div className="side-bar" style={{ width: width, minHeight: height, transform: `translatex(${xPosition}px)`}}>
            <button onClick={()=> togglePanel()} className="side-bar-btn" style={{transform: `translate(${width}px, 20vh)`}}></button>
            <div className="side-bar-content">{children}</div>
        </div>
        </React.Fragment> 
    )
}

export default Sidebar;
