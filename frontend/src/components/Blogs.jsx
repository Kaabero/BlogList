import { useState, useEffect } from 'react'
import BlogForm from './BlogForm'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ user, setCompleteMessage, setErrorMessage }) => {

  const [creatingVisible, setCreatingVisible] = useState(false)
  const [blogs, setBlogs] = useState([])


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [blogs])


  const hideWhenVisible = { display: creatingVisible ? 'none' : '' }
  const showWhenVisible = { display: creatingVisible ? '' : 'none' }
  const sortedBlogs = blogs.sort((a ,b) => b.likes - a.likes)

  const addBlog = (blogObject) => {
    if (!blogObject.title || !blogObject.author || !blogObject.url) {

      setErrorMessage('Please fill the required fields')
      setCompleteMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      return
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setCreatingVisible(false)
        setCompleteMessage(`A new blog ${blogObject.title} by ${blogObject.author} added `)
        setTimeout(() => {
          setCompleteMessage(null)
        }, 3000)
      })
      .catch(error => {
        setErrorMessage('Something unexpected happened')
        setCompleteMessage(null)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  const removeBlog = id => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      blogService
        .remove(id)
        .then(response => {
          const filtered = blogs.filter(blog => blog.id !== id)
          setBlogs(filtered)
          setCompleteMessage(`Deleted blog '${blog.title}'`
          )
          setTimeout(() => {
            setCompleteMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of blog '${blog.title}' has already been removed from server`
          )
          setCompleteMessage(null)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          setTimeout(() => {
          }, 3000)
        })
    }
  }

  const addLikeOf = id => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes+=1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        setCompleteMessage('Like added ')
        setTimeout(() => {
          setCompleteMessage(null)
        }, 3000)
      })
      .catch(error => {
        setErrorMessage('Something unexpected happened')
        setCompleteMessage(null)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }



  return (
    <div>
      <h2>Blogs</h2>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreatingVisible(true)}>Create new blog</button><br />
        <br />
      </div>
      <div style={showWhenVisible}>
        <BlogForm createBlog={addBlog} />
        <button onClick={() => setCreatingVisible(false)}>Cancel</button>
        <hr />
      </div>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          addLike={() => addLikeOf(blog.id)}
          remove={() => removeBlog(blog.id)}
          loggedUser={user.username} />
      )}
    </div>
  )
}

export default Blogs