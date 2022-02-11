const listHelper = require('../utils/list_helper')

describe('favouriteblog', () => {
    const listWithOneBlog = [
        {
            id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]
    const blogs = [
        {
            id: '5a422aa71b54a676234d17f8',
            title: 'favourite',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 3,
            __v: 0
        },
        {
            id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 4,
            __v: 0
        }
    ]     
  
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.favouriteblog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })

    test('0 blogs', () => {
        const result = listHelper.favouriteblog([])
        expect(result).toEqual(null)
    })

    test('multiple blogs', () => {
        const result = listHelper.favouriteblog(blogs)
        expect(result).toEqual(blogs[0])
    })

})