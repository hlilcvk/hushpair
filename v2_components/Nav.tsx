'use client'
import Link from 'next/link'
import LangToggle from './LangToggle'
import { useLang } from './LangProvider'

export default function Nav(){
  const { t } = useLang()

  return (
    <nav className="nav">
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <Link href="/" aria-label="HUSHPair">
          <div style={{display:'flex',flexDirection:'column'}}>
            <strong style={{fontFamily:'Space Grotesk', color:'var(--accent-purple)'}}>HUSHPair</strong>
            <small style={{color:'var(--text-secondary)', fontSize:12}}>vNext++</small>
          </div>
        </Link>

        <div style={{display:'flex',gap:12, marginLeft:16, flexWrap:'wrap'}}>
          <Link href="/product" className="nav-link">{t('nav_product')}</Link>
          <Link href="/architecture" className="nav-link">{t('nav_arch')}</Link>
          <Link href="/modules" className="nav-link">{t('nav_modules')}</Link>
          <Link href="/events" className="nav-link">{t('nav_events')}</Link>
          <Link href="/gifting" className="nav-link">{t('nav_gifting')}</Link>
          <Link href="/security" className="nav-link">{t('nav_security')}</Link>
          <Link href="/pricing" className="nav-link">{t('nav_pricing')}</Link>
          <Link href="/company" className="nav-link">{t('nav_company')}</Link>
          <Link href="/contact" className="nav-link">{t('nav_contact')}</Link>
        </div>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <LangToggle />
        <button
          className="btn btn-primary"
          onClick={()=>{ const el = document.getElementById('contact-modal'); el?.scrollIntoView({behavior:'smooth'})}}
        >
          {t('cta_access')}
        </button>
      </div>
    </nav>
  )
}