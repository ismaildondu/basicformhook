import React from 'react'

import { useBasicFormHook } from 'basicformhook'



const App = () => {

const myForm=useBasicFormHook({

  defaultValues:{
    name:"",
    password:"",
    email:""
  },
  onSubmit: async (values,bag)=>{
    
    bag.setSubmit(true);
    const get=await new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(values)
      },1000);
    });
    bag.setSubmit(false);
   
    
 
  },
  forceElement:true,
  submittingInputNotChange:true,
  debugMode:true,
  requiredBlurs:true,






});



return(


<>

<form onSubmit={myForm.onSubmitHandler}>

    <input type="text" onBlur={myForm.onBlurHandler} value={myForm.getValues.name} onChange={myForm.onChangeHandler} placeholder='Name' name='name'/>
    <br/>
    <input type="text"  onBlur={myForm.onBlurHandler} value={myForm.getValues.password} onChange={myForm.onChangeHandler} placeholder='password' name='password'/>
    <br/>
    <input type="text" onBlur={myForm.onBlurHandler}  value={myForm.getValues.email} onChange={myForm.onChangeHandler} placeholder='email' name='email'/>
    <button disabled={myForm.isSubmitting}>Submit</button>


</form>


</>


)
}

export default App
