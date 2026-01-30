'use client'
import React, {createContext, useContext, useMemo, useState} from 'react'

type Lang = 'tr'|'en'
type Dict = Record<string, {tr:string, en:string}>

const DICT: Dict = {
  nav_product: {tr:'Ürün', en:'Product'},
  nav_arch: {tr:'Mimari', en:'Architecture'},
  nav_modules: {tr:'Modüller', en:'Modules'},
  nav_events: {tr:'Etkinlikler', en:'Events'},
  nav_gifting: {tr:'Hediye', en:'Gifting'},
  nav_security: {tr:'Güvenlik', en:'Security'},
  nav_pricing: {tr:'Fiyatlama', en:'Pricing'},
  nav_company: {tr:'Şirket', en:'Company'},
  nav_contact: {tr:'İletişim', en:'Contact'},
  cta_access: {tr:'Erişim Talep Et', en:'Request Access'},
  hero_sub: {tr:'Event-driven sosyal platform — on-chain ödemeler, privacy-first konum, contextual commerce.', en:'Event-driven social platform with on-chain rails, privacy-first geo, and contextual commerce.'}
}

const Ctx = createContext<{lang:Lang; setLang:(l:Lang)=>void; t:(k:keyof typeof DICT)=>string} | null>(null)

export function LangProvider({children}:{children:React.ReactNode}){
  const [lang, setLang] = useState<Lang>('tr')
  const value = useMemo(()=>({
    lang,
    setLang,
    t: (k: keyof typeof DICT) => DICT[k][lang]
  }),[lang])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useLang(){
  const ctx = useContext(Ctx)
  if(!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}