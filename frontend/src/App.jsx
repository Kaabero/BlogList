import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'

import Error from './components/Error'
import Login from './components/Login'
import Notification from './components/Notification'


const App = () => {
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [completeMessage, setCompleteMessage] = useState(null)



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    setUser(null)
    window.localStorage.clear()
    setCompleteMessage(
      'You are logged out '
    )
    setTimeout(() => {
      setCompleteMessage(null)
    }, 3000)
  }


  return (
    <div className="container">
      <Notification message={completeMessage} />
      <Error message={errorMessage} />
      {!user && <Login setUser={setUser} setCompleteMessage={setCompleteMessage} setErrorMessage={setErrorMessage}/>}
      {user && <Blogs user={user} setCompleteMessage={setCompleteMessage} setErrorMessage={setErrorMessage}/>}
      {user &&(
        <p>{user.name} logged in <button onClick={() => logout()}>Logout</button> </p>
      )}
    </div>
  )
}


export default App