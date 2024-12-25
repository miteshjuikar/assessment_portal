import CommonForm from '@/common/form';
import { loginFormControls } from '@/common/helper'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/store/userSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

function AuthLogin() {

  const [formData, setFormData] = useState({email: "", password: ""});
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data)=>{      
      if(data?.payload?.success){
        toast({
          title: data?.payload?.message,
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        })
      }
      else{
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: data?.payload?.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    })

  // dispatch(loginUser(formData)).then((data) => {
      // if(data?.payload.success){
      //   toast({
      //     title: data?.payload?.message,
      //   })
      // }
      // else{
      //   toast({
      //     title: data?.payload?.message,
      //     variant: "destructive",
      //   })
      // }
    // })
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign-In"}
      />

    </div>
  )
}

export default AuthLogin
