import { useState } from 'react'
import './styles.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import UserList from './components/user-section/UserSection'

function App() {

  return (
    <>
      <Header />

      <main className='main'>
        <UserList />
      </main>

      <Footer />
    </>
  )
}

export default App
