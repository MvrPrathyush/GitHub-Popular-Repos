// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachItem, activeLanguage, changeActiveLanguage} = props
  const {id, language} = eachItem
  const activeButtonStyle = activeLanguage === language ? 'active' : ''
  const onClickLanguageButton = () => changeActiveLanguage(id)

  return (
    <li className="language-item">
      <button
        type="button"
        className={`language-button ${activeButtonStyle}`}
        onClick={onClickLanguageButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
