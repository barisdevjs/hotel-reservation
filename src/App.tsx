
import './App.css'
import Header from './Header'
import Navigation from './Navigation'

export type FormT = {
  firstName: string
  lastName: string
  age: number
  street: string
  city: string
  state: string
  zip: string
  email: string
  password: string
}

function App() {

  return (
    <div className="App">
      <Header/>
      <Navigation />
    </div>
  )
}

export default App
