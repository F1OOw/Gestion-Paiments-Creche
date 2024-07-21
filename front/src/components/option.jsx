import React from "react";

const Option = ({image, color, description, title, onClick})=>{
    return(
        <div className="w-[20%] h-[90%]  relative z-0 ">
        <div className={`w-[90%] h-[90%] rounded-3xl bg-${color}  absolute top-0 right-0`}></div>
        <div className="w-[90%] h-[90%] rounded-3xl border bg-white border-black absolute bottom-0 left-0 flex flex-col items-center justify-around">
            <div className="h-[10%] w-[90%]">
                <h1 className="text-xl text-center font-bold">{description}</h1>
            </div>
            <img src={image} alt={title} className="w-[70%]"/>
            <button onClick={onClick} className={`w-[70%] border-2 shadow-xl h-[10%] bg-${color} text-white rounded-3xl`}>{title}</button>
        </div>
    </div>
    );
}

export default Option; 