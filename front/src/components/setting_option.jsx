import React from "react";

const SettingOption = ({image, color, description, title})=>{
    return(
        <div className="w-[20%] h-[90%]  relative z-0 ">
        <div className={`w-[90%] h-[90%] rounded-3xl bg-${color}  absolute top-0 right-0`}></div>
        <div className="w-[90%] h-[90%] rounded-3xl border bg-white border-black absolute bottom-0 left-0 flex flex-col items-center justify-around">
            <div className="h-[10%]  w-[90%] flex justify-center items-center ">
                <h1 className="text-xl text-center font-bold">{title}</h1>
            </div>
            <div className="h-[10%]  flex items-center justify-center w-[90%]">
                <h1 className={`text-xl text-center text-${color} font-bold`}>{description}</h1>
            </div>
            <img src={image} alt={title} className="h-[40%]"/>
        </div>
    </div>
    );
}

export default SettingOption; 