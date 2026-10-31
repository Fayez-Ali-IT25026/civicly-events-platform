// CHANGED (lint error react-hooks/set-state-in-effect): the previous
// useState + useEffect version called setIsMobile(...) synchronously inside
// the effect, which fails `npm run lint`. React's recommended pattern for
// reading an external store (window.matchMedia) is useSyncExternalStore:
//   - subscribe() attaches/detaches the media-query listener,
//   - getSnapshot() reads the current value on the client,
//   - getServerSnapshot() keeps SSR/hydration stable (renders `false` on the
//     server, then React re-checks on the client — same behavior as before
//     where the hook returned false until the effect ran).
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

function subscribe(callback: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

function getSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches
}

function getServerSnapshot() {
  return false
}

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
