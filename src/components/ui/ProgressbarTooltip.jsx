import { useState } from "react"
import ProgressBar from 'react-percent-bar';

const ProgressBarTooltip = ({percentage}) =>{

    const [isShowToltip, setIsShowTooltip] = useState(false)
    

    return (
        <div onMouseEnter={()=>{
            setIsShowTooltip(true)
        }} 
        onMouseLeave = {()=>{
            setIsShowTooltip(false)
        }}
        className="w-5/6 ml-1 mt-1 float-left relative">
              <ProgressBar 
                colorShift={true}
                fillColor='#a467ff'
                percent={percentage}
                width='100%'
                radius='5px'
                height='15px'
                style={{transition: 'all .2s ease',
                ['#40769A' ? 'filter' : null]: `hue-rotate(-${percentage}deg)`}}
                />
                <div className="tooltipProgress" style={{display: isShowToltip? "block" : "none"}}>
                  <span className="font-light text-sm spanInfoCard">
                    {`${percentage}% de avance`}
                  </span>
                </div>
            </div>
    )

}

export default ProgressBarTooltip