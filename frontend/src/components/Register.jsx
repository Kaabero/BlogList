
import { useState, useEffect } from 'react'
import userService from '../services/users'

const Register = ({ setCompleteMessage, setErrorMessage }) => {

  const [name, setName] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])


  useEffect(() => {
    userService.getAll().then(users =>
      setUsers( users )
    )
  }, [users])

  const usernames = users.map(user => user.username)

  const createUser = async (event) => {
    event.preventDefault()

    const userObject = {
      name: name,
      username: username,
      password: password
    }

    if (username in usernames) {
      console.log('hep')
      setErrorMessage('Username already taken')
      setCompleteMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      return

    }
    if (!userObject.name || !userObject.username || !userObject.password) {

      setErrorMessage('Please fill the required fields')
      setCompleteMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      return
    }

    userService
      .create(userObject)
      .then(returnedUser => {
        setUsers(users.concat(returnedUser))
        setCompleteMessage(`A new user ${userObject.username} created `)
        setTimeout(() => {
          setCompleteMessage(null)
        }, 3000)
      })
      .catch(error => {
        setErrorMessage(error.response.data)
        setCompleteMessage(null)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    setName('')
    setUserName('')
    setPassword('')
  }

  return (
    <div>
      <h2>Create Account</h2>
      <div>

        <form onSubmit={createUser}>
          <div>
            <p>Name:</p>
            <input
              id='name'
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </div>
          <div>
            <p>Username:</p>
            <input
              id='newUsername'
              value={username}
              onChange={event => setUserName(event.target.value)}
            />
          </div>
          <div>
            <p>Password:</p>
            <input
              id='newPassword'
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <br />
          <button id='registeration-button' type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}

export default Register