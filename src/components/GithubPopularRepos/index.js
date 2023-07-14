import {useState, useEffect} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const productsStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const GithubPopularRepos = () => {
  const [activeLanguage, setActiveLanguage] = useState(
    languageFiltersData[0].id,
  )
  const [productsStatus, setProductsStatus] = useState(
    productsStatusConstants.initial,
  )

  const [productsList, setProductsList] = useState([])

  const onSuccess = data => {
    setProductsStatus(productsStatusConstants.success)
    const updatedProductsList = data.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      issuesCount: eachItem.issues_count,
      forksCount: eachItem.forks_count,
      starsCount: eachItem.stars_count,
      avatarUrl: eachItem.avatar_url,
    }))
    setProductsList(updatedProductsList)
  }

  const onFailure = () => {
    setProductsStatus(productsStatusConstants.failure)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProducts = async () => {
    setProductsStatus(productsStatusConstants.inProgress)
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      onSuccess(data.popular_repos)
    } else {
      onFailure()
    }
  }

  useEffect(getProducts, [activeLanguage])

  const renderProductsHeader = () => (
    <div className="products-header-container">
      {languageFiltersData.map(eachItem => (
        <LanguageFilterItem
          eachItem={eachItem}
          key={eachItem.id}
          activeLanguage={activeLanguage}
          changeActiveLanguage={newActiveLanguage =>
            setActiveLanguage(newActiveLanguage)
          }
        />
      ))}
    </div>
  )

  const renderInProgressView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )
  const renderSuccessView = () => (
    <div className="success-view">
      {productsList.map(eachProduct => (
        <RepositoryItem productDetails={eachProduct} key={eachProduct.id} />
      ))}
    </div>
  )
  const renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
    </div>
  )

  const renderProductsList = () => {
    switch (productsStatus) {
      case productsStatusConstants.success:
        return renderSuccessView()
      case productsStatusConstants.inProgress:
        return renderInProgressView()
      case productsStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="app-container">
      {console.log(activeLanguage)}
      <h1 className="main-heading">Popular</h1>
      <div className="products-list-container">
        {renderProductsHeader()}
        {renderProductsList()}
      </div>
    </div>
  )
}

export default GithubPopularRepos
