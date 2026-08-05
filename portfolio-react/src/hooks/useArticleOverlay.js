import { useEffect, useState } from 'react'

// How long the CSS opacity/transform transition on #main article takes
// (see the `#main article` rule in main.css) — kept in sync so the
// unmount is delayed just long enough for the fade-out to finish.
const TRANSITION_MS = 325

// Replaces the jQuery article-overlay logic from the original main.js.
// Instead of imperatively hiding/showing DOM nodes, the "which article
// is open" question lives in the URL hash, and everything else (which
// article is in the DOM, whether it has faded in) is derived state that
// reacts to that single source of truth.
export default function useArticleOverlay(validIds) {
  const [openId, setOpenId] = useState(() => readHash(validIds))
  const [renderedId, setRenderedId] = useState(openId)
  const [active, setActive] = useState(Boolean(openId))

  // Keep openId in sync with the URL — covers nav clicks (which just set
  // location.hash), the browser back/forward buttons, and manual links.
  useEffect(() => {
    function onHashChange() {
      setOpenId(readHash(validIds))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [validIds])

  // Drive the enter/exit animation whenever the target article changes.
  //
  // Deliberately depends on openId only, not renderedId — even though
  // the body reads renderedId. If renderedId were a dependency too,
  // calling setRenderedId below would immediately re-trigger this same
  // effect, running its own cleanup (clearTimeout) before the "fade in"
  // timer ever got to fire. Reading renderedId without depending on it
  // lets us compare against "what it was when openId last changed"
  // without that self-triggered loop.
  useEffect(() => {
    if (openId === renderedId) return undefined // already in sync (e.g. on mount)

    let timer
    if (openId) {
      // Opening (or switching directly to another article): mount it
      // first with `active` false so it starts from the CSS "closed"
      // state, then flip `active` on next tick so the transition runs.
      setActive(false)
      setRenderedId(openId)
      timer = setTimeout(() => setActive(true), 25)
    } else {
      // Closing: start the fade-out immediately, unmount once it's done.
      setActive(false)
      timer = setTimeout(() => setRenderedId(null), TRANSITION_MS)
    }

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId])

  return {
    renderedId,
    active,
    isVisible: Boolean(renderedId),
    open: (id) => {
      window.location.hash = id
    },
    close: () => {
      window.location.hash = ''
    },
  }
}

function readHash(validIds) {
  const hash = window.location.hash.replace('#', '')
  return validIds.includes(hash) ? hash : null
}
