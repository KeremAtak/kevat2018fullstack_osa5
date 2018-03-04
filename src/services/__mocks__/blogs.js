let token = null

const blogs = [
  {
    id: "5a9aea285ed400136931491c",
    title: "Testiotsikko 1",
    author: "Matti Meikäläinen",
    url: "feisbook.com",
    likes: 3,
      user: {
      _id: "5a90a6f09c3d9d58b540612f",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a9aea285ed400136931491d",
    title: "Testiotsikko 2",
    author: "Matti Meikäläinen",
    url: "feisbuuk.com",
    likes: 0,
      user: {
      _id: "5a90a6f09c3d9d58b540612f",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a9aea285ed400136931491e",
    title: "Testiotsikko 3",
    author: "Maija Meikäläinen",
    url: "facebuuk.com",
    likes: 5,
      user: {
      _id: "5a90a6f09c3d9d58b540612f",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }