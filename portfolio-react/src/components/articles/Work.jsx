import content from '../../../content/work.json'

export default function Work() {
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
