import React from 'react'
import { shallow, mount } from 'enzyme'
import SimpleBlog from './SimpleBlog'
import Blog from './Blog'
import App from '../App'
import blogService from '../services/blogs'
jest.mock('../services/__mocks__/blogs')

describe('<App />', () => {
  let app
  
  describe('when user is not logged in', () => {
    beforeAll(() => {
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('when user is logged in', () => {
    beforeAll(() => {
      const user = {
        username: 'testi',
        name: 'Testi Testinen',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
      }
      localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('blogs are rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(3)
    })
  })

  
})