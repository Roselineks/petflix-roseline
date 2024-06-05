import React from 'react'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'

import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Search from './pages/Search'
import Adopt from './pages/Adopt';
import Dogs from './pages/Dogs';
import Cats from './pages/Cats';
import Horses from './pages/Horses';
import Rodents from './pages/Rodents';
import Rabbits from './pages/Rabbits';
import Birds from './pages/Birds';
import Abandonment from './pages/Abandonment';
import Control from './pages/Control';
import Adoption from './pages/Adoption';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const AppRouter = () => (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='adopt' element={<Adopt />} />
      <Route path='dogs' element={<Dogs />} />
      <Route path='cats' element={<Cats />} />
      <Route path='horses' element={<Horses />} />
      <Route path='rodents' element={<Rodents />} />
      <Route path='rabbits' element={<Rabbits />} />
      <Route path='birds' element={<Birds />} />
      <Route path='Abandonment' element={<Abandonment />} />
      <Route path='Control' element={<Control />} />
      <Route path='Adoption' element={<Adoption />} />
      <Route path='search' element={<Search />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  </Routes>
</BrowserRouter>
)

export default AppRouter
