import { NAV_ITEMS } from '../data/navItems'

// Dimension's template adds a "use-middle" divider line when the nav
// has an even number of items, and marks the middle <li> so its own
// border doesn't clash with the divider. We compute that from the data
// instead of hardcoding it, so adding/removing a nav item stays correct.
export default function Nav({ activeId, onNavigate }) {
  const useMiddle = NAV_ITEMS.length % 2 === 0
  const middleIndex = NAV_ITEMS.length / 2

  return (
    <nav className={useMiddle ? 'use-middle' : undefined}>
      <ul>
        {NAV_ITEMS.map((item, index) => (
          <li key={item.id} className={index === middleIndex ? 'is-middle' : undefined}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault()
                onNavigate(item.id)
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
