"use client"
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {

  const [news, setNews] = useState<String>("")
  const [status, setStatus] = useState<String>("")

  async function getStatus() {
    const options = {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "message": news
      })
    }
    try {
      const response = await fetch("http://localhost:8000/predict", options)
      const data = await response.json()
      setStatus(data['prediction'])    
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <main className='flex flex-col h-screen w-screen justify-center items-center p-10 gap-5'>
      <h1 className='text-4xl md:text-6xl font-semibold'>Fake News Detection</h1>
      <textarea className='w-full border-2 border-black rounded-xl p-4' rows={5} value={news} onChange={(e) => setNews(e.target.value)} ></textarea>
      <button onClick={getStatus} className='p-4 rounded-md border-black border-2'>Submit</button>
      <h1>Status of News: {status.length === 0 ? "Looking for submission" : status}</h1>
    </main>
  )
}
