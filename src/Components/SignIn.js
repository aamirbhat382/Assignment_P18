import React , {useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { signInMethod,authenticate, isAutheticated} from "./helper"
 
 const SignIn = ()=> {
  // useState({})
  const [values, setValues ] = useState({
    phoneNumber:"",
    password:"",
    error:"",
    didRedirect:false,
    success: false
  })

  const {phoneNumber,password,error,success,didRedirect}= values
   
  // HANDLE Change in Input fields
  const handleChange = name => event=>{
  setValues({...values, error:false, [name]: event.target.value});
 }


//  Handle Click event(Submit)
 const onSubmit = event =>{
  event.preventDefault()
  setValues({...values,error:false})
  signInMethod({phoneNumber,password})
    .then(data=>{
        // console.log(data)
        if(data.error){
           setValues({...values, error:data.error, success:false})
        }else{
            authenticate(data, ()=>{
                setValues({...values, didRedirect:true})
            })
        }
    })
    .catch(err=>console.log(err))
}
const performRedirect =()=>{
    if(didRedirect){
         <Navigate to="/dashboard" />  
      
    }
    if(isAutheticated()){
      return <Navigate to="/dashboard"  />
    }
  }

  const signUpForm = ()=>{
    return (
      <div className="form-container rounded">
          <h1 className="text-center">Login </h1>
           <form>
              <div className="mb-3">
                <label htmlFor="phone " className="form-label">Phone Number</label>
                <input type="tel" value={phoneNumber} className="form-control" onChange={handleChange("phoneNumber")} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" value={password} className="form-control" onChange={handleChange("password")} id="exampleInputPassword1"/>
              </div>
              
              <button onClick={onSubmit}  className="btn btn-primary ">Submit</button>
              <p>Create an Account </p><Link to="/signup">Create Account</Link>
           </form>
        </div>
      )
  };

   const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Login Success. Please{" "}
            {/* <Navigate to="/signin">Login Here</Navigate> */}
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
    <div className="container py-3 ">
    {successMessage()}
    {errorMessage()}
    {signUpForm()}
    {performRedirect()}
    <Link to="https://github.com/aamirbhat382/Assignment_P18/tree/main">Github</Link>
    </div>
    </>
 )
}
export default SignIn