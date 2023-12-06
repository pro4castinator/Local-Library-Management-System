import React from 'react'

import signupImg from '../assets/images/signup.gif'
import avatar from '../assets/images/doctor-img01.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const Signup = () => {

  const [selectedFile, setSelectedFile] =useState(null);
  const [previewURL, setPreviewURL] =useState("");


  const [formData, setFormData] = useState({
    name: '',
    email:'',
    password:'',
    photo: selectedFile,
    gender: "",
    role: 'patient',
  })

  const handleInputChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleFileInputChange =async (event) => {
    const file = event.target.files[0]
    ////
    console.log(file)
  }

  const submitHandler = async event => {
    event.preventDefault()
  }

  return <section className='px-5 xl:px-0'>
    <div className='max-w-[1170px] mx-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        {/* ================== Img box ================== */}
        <div className='hidden lg:block bg-blue-500 rounded-l-lg'>
          <figure className='rounded-l-lg'>
            <img src={signupImg} alt="" />
          </figure>
        </div>

          {/* ================== Sign up form ================== */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
              Create an <span className='text-[#32609f]'> account</span>
            </h3>

            <form action="" onSubmit={submitHandler}>
            <div className='mb-5'>
                <input 
                  type="name"
                  placeholder='Enter Your Full Name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-500 text-[16px] leading-7
                  text-headingColor placeholder:text-black cursor-pointer'
                  required 
                />
              </div>
              <div className='mb-5'>
                <input 
                  type="email"
                  placeholder='Enter Your Email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-500 text-[16px] leading-7
                  text-headingColor placeholder:text-black cursor-pointer'
                  required 
                />
              </div>
              <div className='mb-5'>
                <input 
                  type="password"
                  placeholder='Enter Your Password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-blue-500 text-[16px] leading-7
                  text-headingColor placeholder:text-black cursor-pointer'
                  required 
                />
              </div>


              <div className='mt-7'>
                <button type='submit' className='w-full bg-blue-500 text-white leading-[30px] rounded-lg px-4 py-3'>
                  Sign Up
                </button>
              </div>

              <p className='mt-5 text-textColor text-center'>
                Already have an account? 
                <Link className="text-blue-600 font-medium ml-1" to='/login'>Login</Link>
              </p>

            </form>
          </div>

      </div>
    </div>
  </section>
}

export default Signup