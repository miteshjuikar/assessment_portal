import CommonForm from '@/common/form';
import { registrationFormControl } from '@/common/helper';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { registerUser } from '@/store/userSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

function AuthRegister() {

  const [formData, setFormData] = useState({userName: "", email: "", password: "", role: ""});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(registerUser(formData)).then((data)=>{      
        if(data?.payload?.success){
          navigate("/auth/login")
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
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center mt-2">
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
