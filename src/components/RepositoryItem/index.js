import './index.css'

const RepositoryItem = props => {
  const {productDetails} = props
  const {name, avatarUrl, issuesCount, forksCount, starsCount} = productDetails
  return (
    <li>
      <div className="repository-item">
        <img src={avatarUrl} alt={name} className="repo-image" />
        <h1 className="repo-name">{name}</h1>
        <div className="details-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="logo"
          />
          <p className="count">{starsCount}</p>
        </div>

        <div className="details-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="logo"
          />
          <p className="count">{forksCount}</p>
        </div>

        <div className="details-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="logo"
          />
          <p className="count">{issuesCount}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
