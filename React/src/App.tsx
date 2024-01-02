import './App.css'
import { useAutoCompleteSearch } from './hooks/useAutoCompleteSearch'


function App() {
  const { filterValue, setFilterValue, isLoading, error, suggestions } = useAutoCompleteSearch()


  const onFilterChange = (val: string) => {
    setFilterValue(val)
  }

  return (
    <>
      <div>
        <h1>Search with auto complete suggestions</h1>
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor='filter'>
            Search for a tree
            <input id='filter' value={filterValue} onChange={e => onFilterChange(e.target.value)} />
          </label>
        </form>
      </div>

      {isLoading && <progress />}

      {error && <article style={{ background: "red", color: "white" }}>{error}</article>}

      {suggestions && <div>
        <ul>
          {suggestions?.map(s => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>}
    </>
  )
}

export default App
