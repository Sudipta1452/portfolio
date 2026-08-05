export default function Footer({ hidden }) {
  return (
    <footer id="footer" style={hidden ? { display: 'none' } : undefined}>
      <p className="copyright">
        &copy; Untitled. Design: <a href="https://html5up.net">HTML5 UP</a>.
      </p>
    </footer>
  )
}
