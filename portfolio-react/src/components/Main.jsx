import { useEffect } from 'react'
import Intro from './articles/Intro'
import Work from './articles/Work'
import About from './articles/About'
import Contact from './articles/Contact'

const ARTICLES = {
  intro: Intro,
  work: Work,
  about: About,
  contact: Contact,
}

export default function Main({ renderedId, active, onClose }) {
  // Escape key closes the open article, same as the original main.js.
  useEffect(() => {
    if (!renderedId) return

    function onKeyUp(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keyup', onKeyUp)
    return () => window.removeEventListener('keyup', onKeyUp)
  }, [renderedId, onClose])

  // #main only exists in the DOM while an article is open or animating
  // closed — mirrors the original's `$main.hide()` when nothing is active.
  if (!renderedId) return null

  const ArticleComponent = ARTICLES[renderedId]

  return (
    <div id="main" onClick={onClose}>
      <article
        id={renderedId}
        className={active ? 'active' : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <ArticleComponent />
        <div className="close" onClick={onClose}></div>
      </article>
    </div>
  )
}
