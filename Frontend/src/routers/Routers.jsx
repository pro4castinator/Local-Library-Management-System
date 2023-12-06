import React from 'react'
import Home from '../pages/Home/Home'
import Catalog from '../pages/Catalog'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Contact from '../pages/Contact'
import Books from '../pages/Books/Books'
import BookDetails from '../pages/Books/BookDetails'

import {Routes, Route} from 'react-router-dom'

const Routers = () => {
  return (
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/books" element={<Books/>} />
    <Route path="/books/:id" element={<BookDetails/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Signup/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/catalog" element={<Catalog/>} />
  </Routes>
  )
}

export default Routers