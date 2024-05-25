import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
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
    this.setState({
      isLoading: true,
    })
    const {activeOptionId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeOptionId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchData = await response.json()
      console.log(fetchData)
      const updatedData = fetchData.popular_repos.map(repos => ({
        name: repos.name,
        id: repos.id,
        issuesCount: repos.issues_count,
        forksCount: repos.forks_count,
        starsCount: repos.stars_count,
        avatarUrl: repos.avatar_url,
      }))
      this.setState({
        repository: updatedData,
        isLoading: false,
      })
    }
  }

  updateActiveOptionId = activeOptionId => {
    this.setState({activeOptionId}, this.getRepository)
  }

  renderRepository = () => {
    const {repository, activeOptionId} = this.state
    return (
      <>
        <LanguageFilterItem
          languageFiltersData={languageFiltersData}
          activeOptionId={activeOptionId}
          updateActiveOptionId={this.updateActiveOptionId}
        />
        <ul>
          {repository.map(repos => (
            <RepositoryItem repositoryDetails={repos} key={repos.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    return <h1 className="popular-heading">Popular</h1>
    // const {isLoading} = this.state
    // return isLoading ? this.renderLoader() : this.renderRepository()
  }
}

export default GithubPopularRepos
