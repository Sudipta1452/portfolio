import content from '../../../content/about.json'

export default function About() {
  return (
    <>
      <h2 className="major">{content.heading}</h2>
      <span className="image main">
        <img src={content.image.src} alt={content.image.alt} />
      </span>
      {content.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </>
  )
}
