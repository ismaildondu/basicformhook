import React from 'react'

export const useBasicFormHook = (args) => {

  const UBF_DefaultValues            = args.defaultValues;
  const UBF_onSubmit                 = args.onSubmit;
  const UBF_requiredBlurs            = args.requiredBlurs || false;
  const UBF_forceElement             = args.forceElement || false;
  const UBF_manuelSubmit             = args.manuelSubmit || false;
  const UBF_submittingInputNotChange = args.submittingInputNotChange || false;
  const UBF_debugMode                = args.debugMode || false;
  

  const [UBF, setUBF]                           = React.useState(UBF_DefaultValues);
  const [UBF_touched, setUBF_touched]           = React.useState({});
  const [UBF_isSubmitting, setUBF_isSubmitting] = React.useState(false);

  
  if(typeof UBF_DefaultValues !== 'object'){
    throw new Error('defaultValues must be an object');
  }
  if(typeof UBF_onSubmit !== 'function'){
    throw new Error('onSubmit must be a function');
  }
  const DEBUGALERT = (from,elements) => {
    let message = `${elements} is called from [${from}]`;
    console.warn(message);
  }
  const UBF_checkName = (name, func) => {

    /*let is_UBF_DefaultValues = false;
    Object
    .keys(UBF).
    forEach((keys) => keys == name ? is_UBF_DefaultValues = true : null);
    if (is_UBF_DefaultValues) {
      func();
    } else {
      throw new Error(`name:${name} is not defined in defaultValues`);
    }*/
  
    if (Object.keys(UBF).includes(name)) {
      func();
    } else {
      throw new Error(`name:${name} is not defined in defaultValues`);
    }

  }
  
  const bag = {
    resetForm: () => {
      UBF_debugMode ? DEBUGALERT("resetForm","resetForm") : null;
      setUBF(UBF_DefaultValues);
    },
    nameResetInput: (name) => {
      UBF_debugMode ? DEBUGALERT(name,"nameResetInput") : null;
      setUBF({ ...UBF, [name]: UBF_DefaultValues[name] });
    },
    nameChangeInput: (name, value) => {
      UBF_debugMode ? DEBUGALERT(name,"nameChangeInput") : null;
      UBF_checkName(name, () => setUBF({ ...UBF, [name]: value }));
    },
    nameTouchedInput: (name) => {
      UBF_debugMode ? DEBUGALERT(name,"nameTouchedInput") : null;
      UBF_checkName(name, () => setUBF_touched({ ...UBF_touched, [name]: true }));
    },
    setSubmit: (value) => {
      
      if(UBF_manuelSubmit){
        switch (value) {
          case true:
            setUBF_isSubmitting(true);
            break;
          default:
            setUBF_isSubmitting(false);
            break;
         }
      UBF_debugMode ? DEBUGALERT(value,"setSubmit") : null;
      }else{
        throw new Error("manuelSubmit is false, you can not use setSubmit function");
      }
     
    }
    

  };

  const runSubmit = async () => {
    UBF_debugMode ? DEBUGALERT("runSubmit","runSubmit") : null;
    if(UBF_isSubmitting) return;
    !UBF_manuelSubmit && setUBF_isSubmitting(true);
    await UBF_onSubmit(UBF, bag);
    !UBF_manuelSubmit && setUBF_isSubmitting(false);
  }





  return {
    getSettings:{
      requiredBlurs:UBF_requiredBlurs,
      forceElement:UBF_forceElement,
      manuelSubmit:UBF_manuelSubmit,
      submittingInputNotChange:UBF_submittingInputNotChange
    },
    isSubmitting: UBF_isSubmitting,
    getTouched: UBF_touched,
    getValues: UBF,
    onSubmitHandler: (e) => {
      e.preventDefault();

      if(UBF_forceElement){
        UBF_debugMode ? DEBUGALERT("onSubmit","forceElement") : null;
        let UBF_Input_Elements_Name=[];
        e.
        target.
        querySelectorAll('input').forEach((element)=>{
          UBF_Input_Elements_Name.push(element.name);
        });

        UBF_Input_Elements_Name.
        forEach((node)=>{
          if(UBF[node]==undefined){
            throw new Error(`Form element name:${node} is not defined in defaultValues`);
          }
        });

        Object.keys(UBF).forEach((key)=>{
         if(!UBF_Input_Elements_Name.includes(key)){
            throw new Error(`Form element name:${key} is not defined in form elements`);
         }
        });

      }

      if (UBF_requiredBlurs) {
       
        UBF_debugMode ? DEBUGALERT("onSubmit","requiredBlurs") : null;
        let is_UBF_touched = true;
        Object
        .keys(UBF).forEach((keys) => UBF_touched[keys] == undefined ? is_UBF_touched = false : null);
        is_UBF_touched && runSubmit();


       
      } else {
        UBF_debugMode ? DEBUGALERT("onSubmit","onSubmit") : null;
        runSubmit();
      }

    },
    onChangeHandler: (e) => {

      if(UBF_submittingInputNotChange && UBF_isSubmitting){
        return;
      }else{
        UBF_debugMode ? DEBUGALERT("onChange",e.target.name) : null;
        UBF_checkName(e.target.name, () => setUBF({ ...UBF, [e.target.name]: e.target.value }));
      }
     
    
    },
    onBlurHandler: (e) => {
      UBF_debugMode ? DEBUGALERT("onBlur",e.target.name) : null;
      UBF_checkName(e.target.name, () => setUBF_touched({ ...UBF_touched, [e.target.name]: true }));
    }
  }

  


}


