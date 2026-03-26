import { useEffect, useMemo, useState } from 'react'
import HooksPractice from './HooksPractice.jsx'
import AsyncPractice from './AsyncPractice.jsx'
import JSONOperations from './JSONOperations.jsx'

function App() {
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [editId, setEditId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchId, setSearchId] = useState('')
    const [displayedPosts, setDisplayedPosts] = useState([])

    // Additional input states for practice
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
    const [phone, setPhone] = useState('')
    const [website, setWebsite] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [gender, setGender] = useState('')
    const [category, setCategory] = useState('')
    const [priority, setPriority] = useState(50)
    const [favoriteColor, setFavoriteColor] = useState('#000000')
    const [bio, setBio] = useState('')
    const [agreeToTerms, setAgreeToTerms] = useState(false)

    const isEditing = editId !== null

    const fetchPosts = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
            if (!response.ok) throw new Error('Failed to fetch posts')
            const data = await response.json()
            setPosts(data)
            setDisplayedPosts(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchPosts()
    }, [])

    const createPost = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title.trim(), body: body.trim(), userId: 1 }),
        })
        if (!response.ok) throw new Error('Create failed')
        const created = await response.json()
        setPosts((prev) => [created, ...prev])
        setDisplayedPosts((prev) => [created, ...prev])
    }

    const updatePost = async (id) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, title: title.trim(), body: body.trim(), userId: 1 }),
        })
        if (!response.ok) throw new Error('Update failed')
        const updated = await response.json()
        setPosts((prev) => prev.map((post) => (post.id === id ? updated : post)))
        setDisplayedPosts((prev) => prev.map((post) => (post.id === id ? updated : post)))
        setEditId(null)
    }

    const handleSubmit = async (event) => {
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

            // Reset all form fields
            setTitle('')
            setBody('')
            setEmail('')
            setPassword('')
            setAge('')
            setPhone('')
            setWebsite('')
            setBirthDate('')
            setIsActive(false)
            setGender('')
            setCategory('')
            setPriority(50)
            setFavoriteColor('#000000')
            setBio('')
            setAgreeToTerms(false)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (post) => {
        setEditId(post.id)
        setTitle(post.title)
        setBody(post.body)
    }

    const handleDelete = async (id) => {
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
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchPostById = async (id) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            if (!response.ok) throw new Error('Post not found')
            const post = await response.json()
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
            setError(err.message)
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
        <div>
            <h1>JSONPlaceholder CRUD Practice</h1>
            <p>Total posts: {totalPosts}</p>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <div>
                <input
                    type="text"
                    placeholder="Enter post ID (number) or title (text)"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button onClick={handleSearch} disabled={loading}>
                    Search
                </button>
                <button onClick={handleClearSearch} disabled={loading}>
                    Clear
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <h2>Input Components Practice</h2>

                {/* Text Input */}
                <div>
                    <label>Title (Text Input):</label><br />
                    <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Email Input */}
                <div>
                    <label>Email (Email Input):</label><br />
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password Input */}
                <div>
                    <label>Password (Password Input):</label><br />
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Number Input */}
                <div>
                    <label>Age (Number Input):</label><br />
                    <input
                        type="number"
                        placeholder="Enter age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        min="0"
                        max="120"
                    />
                </div>

                {/* Tel Input */}
                <div>
                    <label>Phone (Tel Input):</label><br />
                    <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                {/* URL Input */}
                <div>
                    <label>Website (URL Input):</label><br />
                    <input
                        type="url"
                        placeholder="Enter website URL"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </div>

                {/* Date Input */}
                <div>
                    <label>Birth Date (Date Input):</label><br />
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>

                {/* Checkbox */}
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                        Is Active (Checkbox)
                    </label>
                </div>

                {/* Radio Buttons */}
                <div>
                    <label>Gender (Radio Buttons):</label><br />
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === 'male'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Female
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="other"
                            checked={gender === 'other'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Other
                    </label>
                </div>

                {/* Select Dropdown */}
                <div>
                    <label>Category (Select Dropdown):</label><br />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select a category</option>
                        <option value="technology">Technology</option>
                        <option value="business">Business</option>
                        <option value="health">Health</option>
                        <option value="education">Education</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                </div>

                {/* Range Slider */}
                <div>
                    <label>Priority (Range Slider): {priority}</label><br />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    />
                </div>

                {/* Color Picker */}
                <div>
                    <label>Favorite Color (Color Picker):</label><br />
                    <input
                        type="color"
                        value={favoriteColor}
                        onChange={(e) => setFavoriteColor(e.target.value)}
                    />
                </div>

                {/* Textarea */}
                <div>
                    <label>Bio (Textarea):</label><br />
                    <textarea
                        placeholder="Tell us about yourself"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                        cols={50}
                    />
                </div>

                {/* File Input */}
                <div>
                    <label>Profile Picture (File Input):</label><br />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => console.log('File selected:', e.target.files[0])}
                    />
                </div>

                {/* Terms Checkbox */}
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={agreeToTerms}
                            onChange={(e) => setAgreeToTerms(e.target.checked)}
                        />
                        I agree to the terms and conditions
                    </label>
                </div>

                {/* Body textarea (original) */}
                <div>
                    <label>Post Body (Textarea):</label><br />
                    <textarea
                        placeholder="Enter post body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows={4}
                        cols={50}
                    />
                </div>

                <div>
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
                                setEmail('')
                                setPassword('')
                                setAge('')
                                setPhone('')
                                setWebsite('')
                                setBirthDate('')
                                setIsActive(false)
                                setGender('')
                                setCategory('')
                                setPriority(50)
                                setFavoriteColor('#000000')
                                setBio('')
                                setAgreeToTerms(false)
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div>
                {displayedPosts.length === 0 ? (
                    <p>No posts available</p>
                ) : (
                    displayedPosts.map((post) => (
                        <div key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <div>
                                <button onClick={() => handleEdit(post)} disabled={loading}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(post.id)} disabled={loading}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <hr style={{ margin: '40px 0' }} />

            <HooksPractice />

            <hr style={{ margin: '40px 0' }} />

            <AsyncPractice />

            <hr style={{ margin: '40px 0' }} />

            <JSONOperations />
        </div>
    )
}

export default App