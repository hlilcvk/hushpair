import './globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { LangProvider } from '../components/LangProvider'

export const metadata = {
  title: 'HUSHPair — Trust × Context × Proof × Experience',
  description: 'Event-driven social platform with on-chain rails, privacy-first geo, and contextual commerce.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <LangProvider>
          <div style={{minHeight:'100vh', display:'flex', flexDirection:'column'}}>
            <header style={{background:'transparent', position:'sticky', top:0, zIndex:40}}>
              <div className="container">
                <Nav />
              </div>
            </header>
            <main style={{flex:1}}>
              {children}
            </main>
            <footer className="container">
              <Footer />
            </footer>
          </div>
        </LangProvider>
      </body>
    </html>
  )
}