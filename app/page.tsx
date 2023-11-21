"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {

  const [news, setNews] = useState<string>("")
  const [status, setStatus] = useState<string>("")
  const [analysis, setAnalysis] = useState<any>()

  async function getStatus() {
    const options = {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "query": news
      })
    }
    try {
      const response = await fetch("http://localhost:8000/detect", options)
      const data = await response.json()
      setStatus(data['prediction'])    
    } catch (err) {
      console.error(err)
    }
  }

  async function analyze() {
    const options = {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "query": news
      })
    }
    try {
      const response = await fetch("http://localhost:8000/analyze", options)
      const data = await response.json()
      setAnalysis(data)    
      console.log(analysis)
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <main className='flex flex-col w-screen justify-center items-center p-10 gap-5 text-center'>
      <h1 className='text-4xl md:text-6xl font-semibold'>Fake News Detection</h1>
      <textarea className='w-full border-2 border-black rounded-xl p-4' rows={5} value={news} onChange={(e) => setNews(e.target.value)} ></textarea>
      <button onClick={getStatus} className='p-4 rounded-md border-black border-2'>Submit</button>
      <h1>Status of News: {status.length === 0 ? "Looking for submission" : status}</h1>
      {
        status === "Real News" ?
        <>
          <div>
            <h1 className='text-4xl font-bold'>News Analysis</h1>
            <button onClick={analyze} className='p-4 rounded-md border-black border-2 my-5'>Analyze</button>
            <h1>Sentiment: {analysis?.sentiment}</h1>
            <h1>Category: {analysis?.classification}</h1>
          </div>
          <div className=''>
            <h1 className='text-4xl font-bold my-5'>Similar News</h1>
            <div className='grid grid-cols-3'>
              {analysis?.crawl.map((news: any) => (
                <div className='border-2'>
                  <h1 className='text-lg font-semibold'>{news?.title}</h1>
                  <h1 className='text-sm'>{news?.author}</h1>
                  <h1 className='text-md'>{news?.description}</h1>
                  <Link className='underline text-blue-400' href={news?.url}>Link</Link>
                </div>
              ))}
            </div>
          </div>
        </> : 
        <>Can't be analysed</>
      }
    </main>
  )
}
