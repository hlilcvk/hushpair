'use client'
import Link from 'next/link'
import {useState} from 'react'
import LangToggle from './LangToggle'

export default function Nav(){
  const [open,setOpen] = useState(false)
  return (
    <nav className="nav container">
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <Link href="/" aria-label="HUSHPair">
          <div style={{display:'flex',flexDirection:'column'}}>
            <strong style={{fontFamily:'Space Grotesk', color:'var(--accent-purple)'}}>HUSHPair</strong>
            <small style={{color:'var(--text-secondary)', fontSize:12}}>vNext++</small>
          </div>
        </Link>
        <div style={{display:'flex',gap:12, marginLeft:16}}>
          <Link href="/product" className="nav-link">Product</Link>
          <Link href="/architecture" className="nav-link">Architecture</Link>
          <Link href="/modules" className="nav-link">Modules</Link>
          <Link href="/events" className="nav-link">Events</Link>
          <Link href="/gifting" className="nav-link">Gifting</Link>
          <Link href="/security" className="nav-link">Security</Link>
          <Link href="/pricing" className="nav-link">Pricing</Link>
          <Link href="/company" className="nav-link">Company</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <LangToggle />
        <button className="btn btn-primary" onClick={()=>{ const el = document.getElementById('contact-modal'); if(el) el.scrollIntoView({behavior:'smooth'})}}>Request Access</button>
      </div>
    </nav>
  )
}