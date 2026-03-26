import { useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useLayoutEffect, useImperativeHandle, useDeferredValue, useTransition, useId, forwardRef, createContext } from 'react'

// Create a context for demonstration
const ThemeContext = createContext('light')

// Reducer function for useReducer demo
function counterReducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        case 'reset':
            return { count: 0 }
        default:
            return state
    }
}

// Custom hook example
function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return size
}

// Component with forwardRef and useImperativeHandle
const CustomInput = forwardRef(function CustomInput(props, ref) {
    const [value, setValue] = useState('')
    const inputRef = useRef()

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current.focus(),
        clear: () => setValue(''),
        getValue: () => value
    }), [value])

    return (
        <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Custom input with ref"
        />
    )
})

function HooksPractice() {
    // useState - Basic state management
    const [name, setName] = useState('')
    const [todos, setTodos] = useState([])
    const [showAdvanced, setShowAdvanced] = useState(false)

    // useReducer - Complex state logic
    const [counterState, dispatch] = useReducer(counterReducer, { count: 0 })

    // useContext - Context consumption
    const theme = useContext(ThemeContext)

    // useRef - DOM references and mutable values
    const inputRef = useRef()
    const renderCountRef = useRef(0)
    const intervalRef = useRef()

    // useId - Generate unique IDs
    const nameId = useId()
    const emailId = useId()

    // useDeferredValue - Deferred updates for performance
    const [searchTerm, setSearchTerm] = useState('')
    const deferredSearchTerm = useDeferredValue(searchTerm)

    // useTransition - Concurrent features
    const [isPending, startTransition] = useTransition()

    // Custom hook
    const windowSize = useWindowSize()

    // useMemo - Memoize expensive calculations
    const expensiveCalculation = useMemo(() => {
        console.log('Calculating...')
        let result = 0
        for (let i = 0; i < 1000000; i++) {
            result += i
        }
        return result
    }, [])

    // useCallback - Memoize functions
    const addTodo = useCallback((text) => {
        setTodos(prev => [...prev, { id: Date.now(), text, completed: false }])
    }, [])

    const toggleTodo = useCallback((id) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
    }, [])

    // useEffect - Side effects
    useEffect(() => {
        console.log('Component mounted or name changed:', name)
        return () => console.log('Cleanup for name effect')
    }, [name])

    // useEffect with interval
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            console.log('Interval running...')
        }, 2000)

        return () => clearInterval(intervalRef.current)
    }, [])

    // useLayoutEffect - DOM mutations before paint
    useLayoutEffect(() => {
        console.log('useLayoutEffect: DOM updated')
        if (inputRef.current) {
            inputRef.current.style.borderColor = theme === 'dark' ? '#666' : '#ccc'
        }
    }, [theme])

    // Track render count
    renderCountRef.current += 1

    // Handle search with transition
    const handleSearch = (value) => {
        setSearchTerm(value)
        startTransition(() => {
            // Simulate expensive search operation
            setTimeout(() => {
                console.log('Search completed for:', value)
            }, 100)
        })
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>React Hooks Practice Component</h1>
            <p>Render count: {renderCountRef.current}</p>
            <p>Window size: {windowSize.width} x {windowSize.height}</p>
            <p>Theme: {theme}</p>

            {/* useState Demo */}
            <section style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h2>useState - Basic State Management</h2>
                <div>
                    <label htmlFor={nameId}>Name:</label>
                    <input
                        id={nameId}
                        ref={inputRef}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                    <p>Hello, {name || 'stranger'}!</p>
                </div>
            </section>

            {/* useReducer Demo */}
            <section style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h2>useReducer - Complex State Logic</h2>
                <p>Count: {counterState.count}</p>
                <button onClick={() => dispatch({ type: 'increment' })}>+</button>
                <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
                <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
            </section>

            {/* useMemo Demo */}
            <section style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h2>useMemo - Expensive Calculation</h2>
                <p>Expensive calculation result: {expensiveCalculation}</p>
                <p>(Check console for calculation logs)</p>
            </section>

            {/* useCallback Demo */}
            <section style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h2>useCallback - Todo List</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Add todo"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                                addTodo(e.target.value.trim())
                                e.target.value = ''
                            }
                        }}
                    />
                </div>
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            {todo.text}
                        </li>
                    ))}
                </ul>
            </section>

            {/* useDeferredValue & useTransition Demo */}
            <section style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h2>useDeferredValue & useTransition - Performance</h2>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search (deferred)"
                />
                <p>Immediate value: {searchTerm}</p>
                <p>Deferred value: {deferredSearchTerm}</p>
                {isPending && <p>Searching...</p>}
            </section>

            {/* useImperativeHandle Demo */}
            <section style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h2>useImperativeHandle - Custom Ref</h2>
                <CustomInput ref={inputRef} />
                <button onClick={() => inputRef.current?.focus()}>Focus Input</button>
                <button onClick={() => inputRef.current?.clear()}>Clear Input</button>
                <button onClick={() => alert(inputRef.current?.getValue())}>Get Value</button>
            </section>

            {/* useId Demo */}
            <section style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h2>useId - Unique IDs</h2>
                <div>
                    <label htmlFor={emailId}>Email:</label>
                    <input id={emailId} type="email" placeholder="Enter email" />
                </div>
                <p>Generated unique IDs: {nameId}, {emailId}</p>
            </section>

            {/* Toggle advanced features */}
            <button onClick={() => setShowAdvanced(!showAdvanced)}>
                {showAdvanced ? 'Hide' : 'Show'} Advanced Hooks Info
            </button>

            {showAdvanced && (
                <section style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    <h2>Advanced Hooks Information</h2>
                    <ul>
                        <li><strong>useState:</strong> Manages local component state</li>
                        <li><strong>useEffect:</strong> Handles side effects (API calls, subscriptions)</li>
                        <li><strong>useContext:</strong> Consumes context values</li>
                        <li><strong>useReducer:</strong> Complex state logic with actions</li>
                        <li><strong>useCallback:</strong> Memoizes functions to prevent re-renders</li>
                        <li><strong>useMemo:</strong> Memoizes expensive calculations</li>
                        <li><strong>useRef:</strong> Creates mutable references and DOM access</li>
                        <li><strong>useLayoutEffect:</strong> Runs after DOM mutations, before paint</li>
                        <li><strong>useImperativeHandle:</strong> Customizes ref exposed by forwardRef</li>
                        <li><strong>useDeferredValue:</strong> Defers updates for performance</li>
                        <li><strong>useTransition:</strong> Marks non-urgent updates</li>
                        <li><strong>useId:</strong> Generates unique IDs for accessibility</li>
                    </ul>
                </section>
            )}
        </div>
    )
}

export default HooksPractice