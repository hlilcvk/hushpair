'use client'
import {useState} from 'react'

export default function LangToggle(){
  const [lang,setLang] = useState<'tr'|'en'>('tr')
  return (
    <div style={{display:'flex',alignItems:'center',gap:8}}>
      <button className="btn btn-ghost" onClick={()=>setLang('tr')} aria-pressed={lang==='tr'}>TR</button>
      <button className="btn btn-ghost" onClick={()=>setLang('en')} aria-pressed={lang==='en'}>EN</button>
    </div>
  )
}