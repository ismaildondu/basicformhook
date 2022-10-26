# basicformhook

> very simple react form hook

[![NPM](https://img.shields.io/npm/v/basicformhook.svg)](https://www.npmjs.com/package/basicformhook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save basicformhook
```

## Usage

```jsx
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
    const get=await new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(values)
      },1000);
    });
    bag.resetForm();
  },
  forceElement:true,
  submittingInputNotChange:true,
  debugMode:true,
  requiredBlurs:true,
  submittingInputNotChange:true,
  

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
        )}
export default App

```

## Detail
Github => github.com/ismailfp/basicformhook



## License

MIT © [ismailfp](https://github.com/ismailfp)
