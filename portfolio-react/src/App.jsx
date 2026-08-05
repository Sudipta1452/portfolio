import { useEffect } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Bg from './components/Bg'
import useArticleOverlay from './hooks/useArticleOverlay'
import { NAV_ITEMS } from './data/navItems'

const ARTICLE_IDS = NAV_ITEMS.map((item) => item.id)

export default function App() {
  const { renderedId, active, isVisible, open, close } = useArticleOverlay(ARTICLE_IDS)

  // Body-level classes the vendored main.css keys its styling off of.
  useEffect(() => {
    document.body.classList.toggle('is-article-visible', isVisible)
  }, [isVisible])

  // Original page removes `is-preload` ~100ms after window load, which is
  // what lets the header/footer entrance animation run instead of
  // snapping straight to their final state.
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.remove('is-preload')
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div id="wrapper">
        <Header activeId={renderedId} onNavigate={open} hidden={isVisible} />
        <Main renderedId={renderedId} active={active} onClose={close} />
        <Footer hidden={isVisible} />
      </div>
      <Bg />
    </>
  )
}
