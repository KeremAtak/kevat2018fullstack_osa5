import React from 'react'
import { shallow, mount } from 'enzyme'
import SimpleBlog from './SimpleBlog'
import Blog from './Blog'
import App from '../App'
import blogService from '../services/blogs'
jest.mock('../services/__mocks__/blogs')

describe('<SimpleBlog />', () => {
  it('simpleblog renders content', () => {
    const blog = {
      title: 'Testausotsikko',
      author: 'Testi Testinen',
      likes: 0
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)

    const likeDiv = blogComponent.find('.likes')
    expect(likeDiv.text()).toContain(blog.likes)
  })

  it('simpleblog clicking the button calls the event handler twice', () => {
    const blog = {
      title: 'Testausotsikko',
      author: 'Testi Testinen',
      likes: 0
    }
    
    const mockHandler = jest.fn()
    const blogComponent = shallow(
      <SimpleBlog 
        blog={blog}
        onClick={mockHandler}
      />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})