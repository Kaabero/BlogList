var _ = require('lodash')

const dummy = () => {

  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)

  const totalLikes = likes.reduce(
    (accumulator, currentValue) => accumulator + currentValue, 0
  )

  return totalLikes
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const isMostLiked = (element) => element === Math.max(...likes)
  const winner = blogs[likes.findIndex(isMostLiked)]
  return winner
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)

  const blogsPerAuthor = _.values(_.groupBy(authors)).map(d => ({ author: d[0], blogs: d.length }))

  const mostBlogs = _.maxBy(blogsPerAuthor, 'blogs')



  return mostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const likes = blogs.map(({ author, likes }) => ({ author: author, likes: likes }))

  const likesPerAuthor = {}

  likes.forEach(blog => {
    const { author, likes } = blog
    if (likesPerAuthor[author]) {
      likesPerAuthor[author] += likes
    } else {
      likesPerAuthor[author] = likes
    }
  })


  const authorWithMostLikes = Object.keys(likesPerAuthor).reduce((a, b) => likesPerAuthor[a] > likesPerAuthor[b] ? a : b)

  const mostLikes = Math.max(...Object.values(likesPerAuthor))

  const result =  { author: authorWithMostLikes, likes: mostLikes }

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}