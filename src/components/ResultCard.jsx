import React from 'react'
import { motion } from 'framer-motion'

const ResultCard = ({ item }) => {

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl bg-white"
    >

      {/* Image */}
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">

        {/* Type Badge */}
        <div className="absolute top-4 left-4">

          <span
            className={`
              px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md
              ${item.type === 'photo' && 'bg-cyan-500'}
              ${item.type === 'video' && 'bg-red-500'}
              ${item.type === 'GIF' && 'bg-purple-500'}
            `}
          >
            {item.type}
          </span>

        </div>

        {/* Bottom Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          className="translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >

          {/* Title */}
          <h3 className="text-white font-semibold text-lg line-clamp-2 mb-4">
            {item.title || 'Untitled'}
          </h3>

          {/* Buttons */}
          <div className="flex items-center gap-3">

            {/* Open */}
            <a
              href={item.src}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
            >
              Open
            </a>

            {/* Download */}
            <a
              href={item.src}
              download
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition"
            >
              Download
            </a>

          </div>

        </motion.div>

      </div>

    </motion.div>
  )
}

export default ResultCard