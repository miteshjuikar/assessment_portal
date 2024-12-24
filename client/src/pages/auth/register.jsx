import CommonForm from '@/common/form';
import { registrationFormControl } from '@/common/helper';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

function AuthRegister() {

  const [formData, setFormData] = useState({email: "", password: ""});
  const dispatch = useDispatch();
  const navigate = useNavigate();


  function onSubmit(event) {
    event.preventDefault();
console.log("submit called",formData);

    // dispatch(registerUser(formData)).then((data) => {
    //   if(data?.payload?.success){
    //     toast({
    //       title: data?.payload?.message
    //     })
    //     navigate('/auth/login');
    //   }
    //   else{
    //     toast({
    //       title: data?.payload?.message
    //     })
    //   }
      
    // }
  // );
    
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={registrationFormControl}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign-In"}
      />
    </div>
  )
}

export default AuthRegister
