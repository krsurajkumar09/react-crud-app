import { useState, useEffect } from 'react'

function JSONOperations() {
    const [apiData, setApiData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [currentOperation, setCurrentOperation] = useState('')
    const [operationResult, setOperationResult] = useState(null)
    const [sortOrder, setSortOrder] = useState('asc')
    const [filterKey, setFilterKey] = useState('')
    const [filterValue, setFilterValue] = useState('')

    // Fetch data from API
    const fetchAPIData = async () => {
        setLoading(true)
        setError(null)
        setCurrentOperation('Fetching from API')

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            setApiData(data)
            console.log('Fetched Data:', data)
        } catch (err) {
            setError(`Fetch error: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    // Load initial data on mount
    useEffect(() => {
        fetchAPIData()
    }, [])

    // Operation 1: Parse JSON
    const parseJSON = () => {
        setCurrentOperation('Parse JSON')
        if (!apiData) {
            setError('No data to parse')
            return
        }
        const result = {
            type: typeof apiData,
            isArray: Array.isArray(apiData),
            itemCount: apiData.length,
            keys: apiData.length > 0 ? Object.keys(apiData[0]) : []
        }
        setOperationResult(result)
    }

    // Operation 2: Stringify JSON
    const stringifyJSON = () => {
        setCurrentOperation('Stringify JSON')
        if (!apiData) {
            setError('No data to stringify')
            return
        }
        const jsonString = JSON.stringify(apiData, null, 2)
        setOperationResult({
            stringified: jsonString.substring(0, 500) + '...',
            length: jsonString.length,
            lines: jsonString.split('\n').length
        })
    }

    // Operation 3: Filter JSON
    const filterJSON = () => {
        setCurrentOperation('Filter JSON')
        if (!apiData) {
            setError('No data to filter')
            return
        }
        if (!filterKey || !filterValue) {
            setError('Please provide filter key and value')
            return
        }
        const filtered = apiData.filter(item =>
            String(item[filterKey]).toLowerCase().includes(filterValue.toLowerCase())
        )
        setOperationResult({
            originalCount: apiData.length,
            filteredCount: filtered.length,
            filterKey,
            filterValue,
            results: filtered.slice(0, 5)
        })
    }

    // Operation 4: Sort JSON
    const sortJSON = () => {
        setCurrentOperation('Sort JSON')
        if (!apiData) {
            setError('No data to sort')
            return
        }
        const sorted = [...apiData].sort((a, b) => {
            const aValue = a.id
            const bValue = b.id
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
        })
        setOperationResult({
            sortedBy: 'id',
            sortOrder,
            total: sorted.length,
            first3: sorted.slice(0, 3),
            last3: sorted.slice(-3)
        })
    }

    // Operation 5: Map JSON (Transform)
    const mapJSON = () => {
        setCurrentOperation('Map JSON (Transform)')
        if (!apiData) {
            setError('No data to map')
            return
        }
        const mapped = apiData.map(item => ({
            id: item.id,
            title: item.title.substring(0, 30) + '...',
            bodyLength: item.body.length,
            userId: item.userId,
            hasLongBody: item.body.length > 100
        }))
        setOperationResult({
            transformedCount: mapped.length,
            sampleTransformations: mapped.slice(0, 5)
        })
    }

    // Operation 6: Reduce JSON
    const reduceJSON = () => {
        setCurrentOperation('Reduce JSON')
        if (!apiData) {
            setError('No data to reduce')
            return
        }
        const stats = apiData.reduce((acc, item) => {
            acc.totalIds += item.id
            acc.totalBodyLength += item.body.length
            acc.userIds.add(item.userId)
            if (item.body.length > acc.maxBodyLength) {
                acc.maxBodyLength = item.body.length
                acc.maxBodyItem = item.id
            }
            return acc
        }, {
            totalIds: 0,
            totalBodyLength: 0,
            maxBodyLength: 0,
            maxBodyItem: null,
            userIds: new Set()
        })

        setOperationResult({
            totalIds: stats.totalIds,
            averageBodyLength: Math.round(stats.totalBodyLength / apiData.length),
            maxBodyLength: stats.maxBodyLength,
            postWithMaxBody: stats.maxBodyItem,
            uniqueUsers: stats.userIds.size
        })
    }

    // Operation 7: Find and Search
    const findJSON = () => {
        setCurrentOperation('Find and Search')
        if (!apiData) {
            setError('No data to search')
            return
        }
        const found = apiData.find(item => item.id === 5)
        const findAll = apiData.filter(item => item.userId === 1)
        const includes = apiData.some(item => item.title.includes('qui'))

        setOperationResult({
            findById5: found,
            userPosts: findAll.length,
            includesTitle: includes,
            searchResults: findAll.slice(0, 3)
        })
    }

    // Operation 8: Group By (Reduce)
    const groupByJSON = () => {
        setCurrentOperation('Group By userId')
        if (!apiData) {
            setError('No data to group')
            return
        }
        const grouped = apiData.reduce((acc, item) => {
            if (!acc[item.userId]) {
                acc[item.userId] = []
            }
            acc[item.userId].push(item.id)
            return acc
        }, {})

        setOperationResult({
            groupedByUserId: grouped,
            totalgroupedByUserId: Object.keys(grouped).length,
            details: Object.entries(grouped).map(([userId, posts]) => ({
                userId: parseInt(userId),
                postCount: posts.length,
                postIds: posts
            }))
        })
    }

    // Operation 9: Flatten and Normalize
    const normalizeJSON = () => {
        setCurrentOperation('Normalize JSON')
        if (!apiData) {
            setError('No data to normalize')
            return
        }
        const normalized = {
            posts: apiData.map(item => ({
                id: item.id,
                title: item.title,
                body: item.body
            })),
            users: [...new Set(apiData.map(item => item.userId))],
            statistics: {
                totalPosts: apiData.length,
                uniqueUsers: new Set(apiData.map(item => item.userId)).size,
                averageTitleLength: Math.round(
                    apiData.reduce((sum, item) => sum + item.title.length, 0) / apiData.length
                )
            }
        }
        setOperationResult(normalized)
    }

    // Operation 10: Validate Schema
    const validateSchema = () => {
        setCurrentOperation('Validate Schema')
        if (!apiData) {
            setError('No data to validate')
            return
        }
        const schema = {
            hasAllRequiredFields: true,
            missingFields: [],
            typeCheck: {}
        }

        const requiredFields = ['userId', 'id', 'title', 'body']

        if (apiData.length > 0) {
            requiredFields.forEach(field => {
                const hasField = apiData.every(item => field in item)
                schema.hasAllRequiredFields = schema.hasAllRequiredFields && hasField
                if (!hasField) {
                    schema.missingFields.push(field)
                }
                schema.typeCheck[field] = typeof apiData[0][field]
            })
        }

        const allValid = apiData.every(item =>
            requiredFields.every(field => field in item)
        )

        setOperationResult({
            totalRecords: apiData.length,
            validRecords: allValid ? apiData.length : 'Check details',
            schema,
            sampleRecord: apiData[0] || null
        })
    }

    // Operation 11: Search and Highlight
    const searchAndHighlight = () => {
        setCurrentOperation('Search Operations')
        if (!apiData) {
            setError('No data to search')
            return
        }
        const searchTerm = 'qui'
        const results = apiData.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )

        setOperationResult({
            searchTerm,
            matchCount: results.length,
            matches: results.map(item => ({
                id: item.id,
                title: item.title,
                matchPosition: item.title.toLowerCase().indexOf(searchTerm.toLowerCase())
            }))
        })
    }

    // Operation 12: Merge and Combine
    const mergeJSON = () => {
        setCurrentOperation('Merge Operations')
        if (!apiData) {
            setError('No data to merge')
            return
        }
        const merged = apiData.map((item, index) => ({
            ...item,
            index,
            computedId: `post_${item.id}_user_${item.userId}`,
            metadata: {
                fetchedAt: new Date().toISOString(),
                isProcessed: true
            }
        }))

        setOperationResult({
            mergedCount: merged.length,
            sample: merged.slice(0, 2)
        })
    }

    // Clear results
    const clearResults = () => {
        setOperationResult(null)
        setCurrentOperation('')
        setError(null)
    }

    if (loading) {
        return <div style={{ padding: '20px' }}>Loading API data...</div>
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>JSON Operations Practice</h1>
            <p><strong>Current Operation:</strong> {currentOperation || 'None'}</p>

            <div style={{ marginBottom: '20px' }}>
                <button onClick={fetchAPIData} style={{ padding: '8px 16px', marginRight: '10px' }}>
                    Refresh API Data
                </button>
                <button onClick={clearResults} style={{ padding: '8px 16px', marginRight: '10px', backgroundColor: '#ff6b6b', color: 'white' }}>
                    Clear Results
                </button>
            </div>

            {/* Filter and Sort Controls */}
            <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
                <h3>Filter & Sort Options</h3>
                <div>
                    <label>Filter Key: </label>
                    <input
                        type="text"
                        value={filterKey}
                        onChange={(e) => setFilterKey(e.target.value)}
                        placeholder="e.g., userId, title"
                        style={{ marginRight: '10px', padding: '5px' }}
                    />
                    <label>Filter Value: </label>
                    <input
                        type="text"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        placeholder="e.g., 1, qui"
                        style={{ marginRight: '10px', padding: '5px' }}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <label>Sort Order: </label>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '5px' }}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>

            {/* Operation Buttons Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '20px' }}>
                <button onClick={parseJSON} style={{ padding: '10px' }}>Parse JSON</button>
                <button onClick={stringifyJSON} style={{ padding: '10px' }}>Stringify JSON</button>
                <button onClick={filterJSON} style={{ padding: '10px' }}>Filter JSON</button>
                <button onClick={sortJSON} style={{ padding: '10px' }}>Sort JSON</button>
                <button onClick={mapJSON} style={{ padding: '10px' }}>Map/Transform</button>
                <button onClick={reduceJSON} style={{ padding: '10px' }}>Reduce (Stats)</button>
                <button onClick={findJSON} style={{ padding: '10px' }}>Find & Search</button>
                <button onClick={groupByJSON} style={{ padding: '10px' }}>Group By</button>
                <button onClick={normalizeJSON} style={{ padding: '10px' }}>Normalize</button>
                <button onClick={validateSchema} style={{ padding: '10px' }}>Validate Schema</button>
                <button onClick={searchAndHighlight} style={{ padding: '10px' }}>Search</button>
                <button onClick={mergeJSON} style={{ padding: '10px' }}>Merge/Combine</button>
            </div>

            {/* Error Display */}
            {error && (
                <div style={{ padding: '10px', backgroundColor: '#ffe0e0', color: '#c00', marginBottom: '20px', borderRadius: '4px' }}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Results Display */}
            {operationResult && (
                <div style={{ border: '1px solid #ccc', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '4px' }}>
                    <h3>Operation Result:</h3>
                    <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', overflowX: 'auto', fontSize: '12px' }}>
                        {JSON.stringify(operationResult, (key, value) => {
                            if (value instanceof Set) {
                                return Array.from(value)
                            }
                            return value
                        }, 2)}
                    </pre>
                </div>
            )}

            {/* Original Data Preview */}
            {apiData && !operationResult && (
                <div style={{ border: '1px solid #ccc', padding: '15px', backgroundColor: '#f9f9f9' }}>
                    <h3>API Data Preview (First 3 Items):</h3>
                    <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', overflowX: 'auto', fontSize: '12px' }}>
                        {JSON.stringify(apiData.slice(0, 3), null, 2)}
                    </pre>
                    <p><strong>Total Records:</strong> {apiData.length || 0}</p>
                </div>
            )}

            {/* Education Section */}
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0fff0', border: '1px solid #90ee90' }}>
                <h3>JSON Operations Reference:</h3>
                <ul>
                    <li><strong>Parse:</strong> Identify type, structure, and keys</li>
                    <li><strong>Stringify:</strong> Convert to JSON string with formatting</li>
                    <li><strong>Filter:</strong> Extract items matching criteria</li>
                    <li><strong>Sort:</strong> Order items by property</li>
                    <li><strong>Map:</strong> Transform each item</li>
                    <li><strong>Reduce:</strong> Aggregate/calculate statistics</li>
                    <li><strong>Find:</strong> Locate specific items</li>
                    <li><strong>Group:</strong> Organize by key</li>
                    <li><strong>Normalize:</strong> Restructure data format</li>
                    <li><strong>Validate:</strong> Check schema and types</li>
                    <li><strong>Search:</strong> Text-based queries</li>
                    <li><strong>Merge:</strong> Combine and enrich objects</li>
                </ul>
            </div>
        </div>
    )
}

export default JSONOperations