import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, addLike, remove, loggedUser }) => {


  const [showingVisible, setShowingVisible] = useState(false)
  const hideWhenVisible = { display: showingVisible ? 'none' : '' }
  const showWhenVisible = { display: showingVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <div style={blogStyle}>
      <div>
        Title: {blog.title} <br/>
        <div style={hideWhenVisible}>
          <br />
          <button id='view-button' onClick={() => setShowingVisible(true)}>View</button><br />
          <br />
        </div>
        <div style={showWhenVisible}>
          Author: {blog.author} <br />

          URL: {blog.url} <br />

          likes: {blog.likes} <button id='like-button' onClick={addLike}>Like</button><br />

          Added by: {blog.user.name} <br />

          {loggedUser === blog.user.username &&
          <>
            <br />
            <button id='remove-button' onClick={remove}>Remove</button> <br />
          </>}
          <br />
          <button onClick={() => setShowingVisible(false)}>Hide</button><br />
          <br />
        </div>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  loggedUser: PropTypes.string.isRequired

}


export default Blog