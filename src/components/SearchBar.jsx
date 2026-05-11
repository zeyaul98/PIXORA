import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { setQuery } from '../redux/features/searchSlice'

const SearchIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const suggestions = [
  'Nature wallpapers',
  'Coding GIFs',
  'Gaming videos',
  'Anime edits',
  'UI inspiration',
]

const SearchBar = () => {
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    if (!text.trim()) return

    dispatch(setQuery(text))
  }

  const handleSuggestion = (value) => {
    setText(value)
    dispatch(setQuery(value))
  }

  return (
    <section className="relative overflow-hidden min-h-[85vh] bg-gradient-to-br from-sky-50 via-white to-purple-50 flex items-center justify-center px-4">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute w-[450px] h-[450px] bg-cyan-200/40 blur-3xl rounded-full top-[-120px] left-[-100px]" />
        <div className="absolute w-[350px] h-[350px] bg-pink-200/40 blur-3xl rounded-full bottom-[-100px] right-[-80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-5xl text-center"
      >

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight text-gray-900">
          Search Any
          <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            {' '}Image
          </span>,
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            {' '}Video
          </span>
          {' '}& GIF
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Explore millions of high-quality photos, videos, and trending GIFs
          using powerful APIs with a fast and modern search experience.
        </p>

        {/* Search Box */}
        <motion.form
          onSubmit={submitHandler}
          animate={{
            boxShadow: isFocused
              ? '0 0 40px rgba(59,130,246,0.15)'
              : '0 10px 30px rgba(0,0,0,0.06)',
          }}
          className="relative max-w-3xl mx-auto bg-white border border-gray-200 rounded-3xl p-3 flex items-center mt-12 shadow-xl"
        >

          {/* Search Icon */}
          <div className="px-4 text-blue-500">
            <SearchIcon />
          </div>

          {/* Input */}
          <input
            type="text"
            value={text}
            required
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search images, videos, GIFs..."
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-lg px-2"
          />

          {/* Clear Button */}
          <AnimatePresence>
            {text && (
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setText('')}
                className="text-gray-400 hover:text-gray-700 px-3"
              >
                ✕
              </motion.button>
            )}
          </AnimatePresence>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white px-7 py-4 rounded-2xl font-semibold text-lg shadow-md cursor-pointer"
          >
            Search
          </motion.button>
        </motion.form>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 mb-7">
          {suggestions.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSuggestion(item)}
              className="px-5 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 cursor-pointer shadow-sm"
            >
              {item}
            </motion.button>
          ))}
        </div>

      </motion.div>
    </section>
  )
}

export default SearchBar