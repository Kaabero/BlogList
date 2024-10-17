import { useState } from 'react'


const BlogForm = ({ createBlog }) => {
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newTitle, setNewTitle] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <div>
      <strong>Create new</strong><br />
      <br />

      <form onSubmit={addBlog}>
        <div>Title:&nbsp;
          <input
            id='title'
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            placeholder='write title here'
          />
        </div>
        <br />
        <div>Author:&nbsp;
          <input
            id='author'
            value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)}
            placeholder='write author here'
          />
        </div>
        <br />
        <div>Url:&nbsp;
          <input
            id='url'
            value={newUrl}
            onChange={event => setNewUrl(event.target.value)}
            placeholder='write url here'
          />
        </div>
        <br />
        <button id='create-button' type="submit">Create</button> <br />
        <hr />
      </form>
    </div>
  )
}


export default BlogForm