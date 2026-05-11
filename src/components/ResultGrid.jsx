import React, { useEffect, useRef, useState } from 'react'
import Masonry from 'react-masonry-css'
import { fetchPhoto, fetchVideos, fetchGIF } from '../Api/MediaApi'

import {
  setLoding,
  setError,
  setResults,
} from '../redux/features/searchSlice'

import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import ResultCard from './ResultCard'

const breakpointColumnsObj = {
  default: 4,
  1280: 4,
  1024: 3,
  768: 2,
  500: 1,
}

const ResultGrid = () => {

  const {
    query,
    activeTab,
    results,
    loding,
    error,
  } = useSelector((store) => store.search)

  const dispatch = useDispatch()

  const [page, setPage] = useState(1)

  const observerRef = useRef(null)

  // ================= FETCH DATA =================
  const getData = async (currentPage = 1) => {

    try {

      dispatch(setLoding())

      let data = []

      // ================= PHOTOS =================
      if (activeTab === 'photos') {

        const response = await fetchPhoto(query, currentPage)

        data = response.results.map((item) => ({
          id: item.id + Math.random(),
          type: 'photo',
          title: item.alt_description || 'Photo',
          thumbnail: item.urls.small,
          src: item.urls.full,
        }))
      }

      // ================= VIDEOS =================
      if (activeTab === 'videos') {

        const response = await fetchVideos(query)

        data = response.videos.map((item) => ({
          id: item.id + Math.random(),
          type: 'video',
          title: item.user?.name || 'Video',
          thumbnail: item.image,
          src: item.video_files?.[0]?.link,
        }))
      }

      // ================= GIF =================
      if (activeTab === 'GIF') {

        const response = await fetchGIF(query)

        data = response.results.map((item) => ({
          id: item.id + Math.random(),
          type: 'GIF',
          title: item.content_description || 'GIF',
          thumbnail: item.media_formats?.tinygif?.url,
          src: item.media_formats?.gif?.url,
        }))
      }

      // ================= APPEND RESULTS =================
      if (currentPage === 1) {
        dispatch(setResults(data))
      } else {
        dispatch(setResults([...results, ...data]))
      }

    } catch (err) {

      dispatch(setError(err.message || 'Something went wrong'))
    }
  }

  // ================= NEW SEARCH =================
  useEffect(() => {

    if (!query) return

    setPage(1)

    getData(1)

  }, [query, activeTab])

  // ================= INFINITE SCROLL =================
  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {

        if (entries[0].isIntersecting && !loding) {

          const nextPage = page + 1

          setPage(nextPage)

          getData(nextPage)
        }
      },
      {
        threshold: 1,
      }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }

  }, [page, loding, results])

  // ================= ERROR =================
  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="bg-red-50 border border-red-200 text-red-500 px-6 py-4 rounded-2xl shadow-sm">
          ❌ {error}
        </div>
      </div>
    )
  }

  // ================= EMPTY =================
  if (!results.length && query && !loding) {
    return (
      <div className="flex justify-center items-center py-24">

        <div className="text-center">

          <h2 className="text-3xl font-bold text-gray-700 mb-3">
            No Results Found 😢
          </h2>

          <p className="text-gray-400">
            Try searching with different keywords.
          </p>

        </div>

      </div>
    )
  }

  // ================= DEFAULT =================
  if (!query) {
    return (
      <div className="flex justify-center items-center py-24">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Discover Stunning Content ✨
          </h2>

          <p className="text-gray-500 text-lg max-w-xl">
            Search millions of photos, videos, and GIFs instantly.
          </p>

        </div>

      </div>
    )
  }

  return (
    <div className="px-4 md:px-8 py-10">

      {/* Top Section */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-10">

        <div>

          <h2 className="text-3xl font-bold text-gray-800 capitalize">
            {activeTab} Results
          </h2>

          <p className="text-gray-500 mt-2">
            Showing results for:
            <span className="text-blue-600 font-semibold">
              {' '}"{query}"
            </span>
          </p>

        </div>

        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md">
          {results.length} Results
        </div>

      </div>

      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid flex gap-6"
        columnClassName="masonry-column"
      >

        {results.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: idx * 0.03,
            }}
            className="mb-6"
          >
            <ResultCard item={item} />
          </motion.div>
        ))}

      </Masonry>

      {/* Infinite Scroll Trigger */}
      <div ref={observerRef} className="h-10 flex justify-center items-center">

        {loding && (
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        )}

      </div>

    </div>
  )
}

export default ResultGrid