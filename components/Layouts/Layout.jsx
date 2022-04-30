import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children, title ='Book best hotels for your holidays'}) => {
  return (
    <div>
       <Head>
           <title>{title}</title>
       </Head>
       <Header/>
       <ToastContainer position="bottom-right" limit={1}/>
       {children}
       <Footer/>
    </div>
  )
}

export default Layout