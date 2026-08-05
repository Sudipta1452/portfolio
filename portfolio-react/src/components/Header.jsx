import Nav from './Nav'

export default function Header({ activeId, onNavigate, hidden }) {
  return (
    <header id="header" style={hidden ? { display: 'none' } : undefined}>
      <div className="logo">
        <span className="icon fa-gem"></span>
      </div>
      <div className="content">
        <div className="inner">
          <h1>WELCOME</h1>
          <p>
            Hello! My name is Sudipta Saha, and I am currently an Associate at NAB, working as a
            Java &amp; Spring Boot Developer while exploring AI Engineering.
            <br />
            Welcome to my portfolio, where I showcase my skills, experience, and projects.
            <br />
            Feel free to explore and learn more about my journey in the tech world.
          </p>
        </div>
      </div>
      <Nav activeId={activeId} onNavigate={onNavigate} />
    </header>
  )
}
