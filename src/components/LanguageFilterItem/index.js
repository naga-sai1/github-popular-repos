import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersData, activeOptionId, updateActiveOptionId} = props
  const {id, language} = languageFiltersData

  const handleClick = () => {
    updateActiveOptionId(id)
  }

  return (
    <li onClick={handleClick}>
      <button
        type="button"
        className={`language-filter-item ${id === activeOptionId ? 'active' : ''}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem

