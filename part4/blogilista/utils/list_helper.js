const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    const likesReducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0
        ? 0 
        : blogs.reduce(likesReducer, 0)
}

const favoriteBlog = (blogs) => {
    const favoriteReducer = (favorite, current) => {
        return (current.likes >= favorite.likes) ? current : favorite
    }
    return blogs.length === 0
        ? 'No favorite!'
        : blogs.reduce(favoriteReducer, {likes: 0})
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}