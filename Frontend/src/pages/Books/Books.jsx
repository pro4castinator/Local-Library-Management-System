import React from 'react'

const Books = () => {
  return <>
    <section className='bg-[#fff9ea] p-10'>
      <div className="container text-center">
        <h2 className='heading'>Reserve a Book</h2>
        <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
          <input type="search" className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor' placeholder='Search Doctor' />
          <button className='btn mt-0 rounded-[0px] rounded-r-md'>Search</button>
        </div>
      </div>
    </section>
  </>
}

export default Books