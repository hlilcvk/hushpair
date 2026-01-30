'use client'
import Link from 'next/link'
import DiagramBox from '../components/DiagramBox'
import { useLang } from '../components/LangProvider'

export default function Home(){
  const { t } = useLang()
  return (
    <div className="container" style={{paddingTop:32, paddingBottom:32}}>
      ...
      <div style={{display:'flex', gap:12}}>
        <button
          className="btn btn-primary"
          onClick={()=>{ const el = document.getElementById('contact-modal'); el?.scrollIntoView({behavior:'smooth'})}}
        >
          {t('cta_access')}
        </button>
        <Link href="/architecture"><button className="btn btn-ghost">View Architecture</button></Link>
      </div>
      ...
    </div>
  )
}