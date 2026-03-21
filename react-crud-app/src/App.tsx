import { useEffect, useMemo, useState } from 'react'
import './App.css'

type PostItem = {
  id: number
  title: string
  body: string
  userId: number
}

function App() {
  const [posts, setPosts] = useState<PostItem[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchId, setSearchId] = useState('')
  const [displayedPosts, setDisplayedPosts] = useState<PostItem[]>([])

  const isEditing = editId !== null

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        if (!response.ok) throw new Error('Failed to fetch posts')
        const data: PostItem[] = await response.json()
        setPosts(data)
        setDisplayedPosts(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const createPost = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.trim(), body: body.trim(), userId: 1 }),
    })
    if (!response.ok) throw new Error('Create failed')
    const created: PostItem = await response.json()
    setPosts((prev) => [created, ...prev])
    setDisplayedPosts((prev) => [created, ...prev])
  }

  const updatePost = async (id: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title: title.trim(), body: body.trim(), userId: 1 }),
    })
    if (!response.ok) throw new Error('Update failed')
    const updated: PostItem = await response.json()
    setPosts((prev) => prev.map((post) => (post.id === id ? updated : post)))
    setDisplayedPosts((prev) => prev.map((post) => (post.id === id ? updated : post)))
    setEditId(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title.trim()) return

    setLoading(true)
    setError(null)

    try {
      if (isEditing && editId !== null) {
        await updatePost(editId)
      } else {
        await createPost()
      }

      setTitle('')
      setBody('')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (post: PostItem) => {
    setEditId(post.id)
    setTitle(post.title)
    setBody(post.body)
  }

  const handleDelete = async (id: number) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Delete failed')
      setPosts((prev) => prev.filter((post) => post.id !== id))
      setDisplayedPosts((prev) => prev.filter((post) => post.id !== id))
      if (editId === id) {
        setEditId(null)
        setTitle('')
        setBody('')
      }
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const fetchPostById = async (id: number) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      if (!response.ok) throw new Error('Post not found')
      const post: PostItem = await response.json()
      setPosts((prev) => {
        const exists = prev.some((p) => p.id === id)
        return exists ? prev : [post, ...prev]
      })
      setDisplayedPosts((prev) => {
        const exists = prev.some((p) => p.id === id)
        return exists ? prev : [post, ...prev]
      })
      setSearchId('')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    const trimmed = searchId.trim()
    if (!trimmed) {
      setError('Please enter a search term')
      return
    }
    const id = parseInt(trimmed)
    if (!isNaN(id) && id > 0) {
      // search by id
      fetchPostById(id)
    } else {
      // search by title
      const filtered = posts.filter(post => post.title.toLowerCase().includes(trimmed.toLowerCase()))
      setDisplayedPosts(filtered)
      setSearchId('')
      setError(null)
    }
  }

  const handleClearSearch = () => {
    setDisplayedPosts(posts)
    setSearchId('')
    setError(null)
  }

  const totalPosts = useMemo(() => displayedPosts.length, [displayedPosts])

  return (
    <main className="app-container">
      <h1>JSONPlaceholder CRUD Practice</h1>
      <p>Total posts: {totalPosts}</p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="search-section">
        <label>
          Search Post by ID or Title
          <input
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter post ID (number) or title (text)"
          />
        </label>
        <button onClick={handleSearch} disabled={loading}>
          Search
        </button>
        <button onClick={handleClearSearch} disabled={loading}>
          Clear
        </button>
      </div>

      <form onSubmit={handleSubmit} className="todo-form">
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        </label>

        <label>
          Body
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" />
        </label>

        <button type="submit" disabled={loading}>
          {isEditing ? 'Update' : 'Create'} Post
        </button>
        {isEditing && (
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setEditId(null)
              setTitle('')
              setBody('')
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <section className="todo-list">
        {displayedPosts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          <ul>
            {displayedPosts.map((post) => (
              <li key={post.id} className="todo-item">
                <div>
                  <strong>{post.title}</strong>
                  <p>{post.body}</p>
                </div>
                <div className="actions">
                  <button onClick={() => handleEdit(post)} disabled={loading}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(post.id)} disabled={loading}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App

