import { Component } from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  { id: 'ALL', language: 'All' },
  { id: 'JAVASCRIPT', language: 'Javascript' },
  { id: 'RUBY', language: 'Ruby' },
  { id: 'JAVA', language: 'Java' },
  { id: 'CSS', language: 'CSS' },
]

class GithubPopularRepos extends Component {
  state = {
    repository: [],
    isLoading: false,
    activeOptionId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepository()
  }

  getRepository = async () => {
    this.setState({ isLoading: true })
    const { activeOptionId } = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeOptionId}`
    const response = await fetch(url)
    if (response.ok) {
      const fetchData = await response.json()
      const updatedData = fetchData.popular_repos.map(repo => ({
        name: repo.name,
        id: repo.id,
        issuesCount: repo.issues_count,
        forksCount: repo.forks_count,
        starsCount: repo.stars_count,
        avatarUrl: repo.avatar_url,
      }))
      this.setState({ repository: updatedData, isLoading: false })
    } else {
      this.setState({ isLoading: false })
    }
  }

  updateActiveOptionId = activeOptionId => {
    this.setState({ activeOptionId }, this.getRepository)
  }

  renderLanguage = () => {
    const { activeOptionId } = this.state
    return (
      <ul className="language-filters">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            languageFiltersData={eachLanguage}
            activeOptionId={activeOptionId}
            updateActiveOptionId={this.updateActiveOptionId}
          />
        ))}
      </ul>
    )
  }

  renderRepository = () => {
    const { repository } = this.state
    return (
      <ul className="repository-list">
        {repository.map(repo => (
          <RepositoryItem repositoryDetails={repo} key={repo.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const { isLoading } = this.state
    return (
      <div className="github-popular-repos-container">
        <h1 className="popular-heading">Popular</h1>
        {this.renderLanguage()}
        {isLoading ? this.renderLoader() : this.renderRepository()}
      </div>
    )
  }
}

export default GithubPopularRepos
