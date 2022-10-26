# basicformhook

> very simple react form hook





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



# requiredBlurs
It is not submitted without clicking on all inputs.

# forceElement
forces you to give the appropriate input name with the value you give

# manuelSubmit
You must manually set the submitting values ​​while submitting the form.
Like:
```jsx
  (values,bag)=>{

    bag.setSubmit(true);
    /*const get=await new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(values)
      },1000);
    });*/
    bag.setSubmit(false);

  }
```
# submittingInputNotChange
No value changes are made to the inputs while submitting the form.

# debugMode
shows debug messages




###### requiredBlurs,forceElement,
###### manuelSubmit,submittingInputNotChange and debugMode 
###### not required, defaults to false if not assigned


| returning bag functions       | ?           |
| ------------- |:-------------:|
| resetForm()   | restores all input as default value |
| nameResetInput(name)      | restores (name)input as default value      | 
| nameChangeInput(name,value) | restores (name)input as (value) value      |  
| nameTouchedInput(name) | restores (name)input as true in obj.getTouched list      |  
| setSubmit(value) | set submit status value (IF TRUE manuelSubmit)      |  



## License

MIT © [ismailfp](https://github.com/ismailfp)
