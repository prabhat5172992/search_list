import React from 'react';

const conditional = (props)=>{
    console.log("inside conditional", props);
    if(props.condition){
        return(
            <div> 
                {props.children}
            </div>
        );
    }
    else{
        return null;
    }
};

export default conditional;