import React , {useState} from "react";
import { Link } from "react-router-dom";
import { signUpMethod} from "./helper"
 
 const Home = ()=> {

  // useState({})
  const [values, setValues ] = useState({
    name:"",
    phoneNumber:"",
    password:"",
    error:"",
    success: false
  })

  const {name,phoneNumber,password,error,success}= values
   
  // HANDLE Change in Input fields
  const handleChange = name => event=>{
  setValues({...values, error:false, [name]: event.target.value});
 }


//  Handle Click event(Submit)
 const onSubmit = event =>{
  event.preventDefault()
  setValues({...values,error:false})
  signUpMethod({name,phoneNumber,password})
    .then(data=>{
        console.log(data)
        if(data.error){
           setValues({...values, error:data.error, success:false})
        }else{
          setValues({...values,name:"",phoneNumber:"",password:"", error:"", success:true})
        }
    })
    .catch(err=>console.log(err))
}
  

  const signUpForm = ()=>{
    return (
      <div className="form-container rounded">
          <h1 className="text-center">Create An Account</h1>
           <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" value={name} className="form-control" id="name" onChange={handleChange("name")} aria-describedby="emailHelp"/>
                
              </div>
              
              <div className="mb-3">
                <label htmlFor="phone " className="form-label">Phone Number</label>
                <input type="tel" value={phoneNumber} className="form-control" onChange={handleChange("phoneNumber")} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" value={password} className="form-control" onChange={handleChange("password")} id="exampleInputPassword1"/>
              </div>
              
              <button onClick={onSubmit}  className="btn btn-primary ">Submit</button>
              <p>Already have an Account </p><Link to="/">Login Here</Link>
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
            New account was created successfully. Please{" "}
            <Link to="/">Login Here</Link>
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
    <a href="https://github.com/aamirbhat382/Assignment_P18/tree/main" target='_blank'>GitHub</a>
    </div>
    </>
 )
}
export default Home