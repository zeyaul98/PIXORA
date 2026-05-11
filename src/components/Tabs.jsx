import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { setActiveTabs } from '../redux/features/searchSlice'

const Tabs = () => {

  const dispatch = useDispatch()

  const tabs = [
    {
      name: 'photos',
      icon: '📸',
    },
    {
      name: 'videos',
      icon: '🎥',
    },
    {
      name: 'GIF',
      icon: '🎭',
    },
  ]

  const activeTab = useSelector((state) => state.search.activeTab)

  return (
    <div className="w-full flex justify-center mt-10 px-4">

      <div className="flex items-center gap-3 bg-white border border-gray-200 shadow-lg rounded-2xl p-2">

        {tabs.map((tab, idx) => {

          const isActive = activeTab === tab.name

          return (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(setActiveTabs(tab.name))}
              className={`
                relative overflow-hidden
                flex items-center gap-2
                px-6 py-3 rounded-xl
                font-semibold text-sm md:text-base
                transition-all duration-300 cursor-pointer
                ${isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }
              `}
            >

              {/* Active Glow */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl -z-10"
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                  }}
                />
              )}

              {/* Icon */}
              <span className="text-lg">
                {tab.icon}
              </span>

              {/* Text */}
              <span className="capitalize">
                {tab.name}
              </span>

            </motion.button>
          )
        })}
      </div>

    </div>
  )
}

export default Tabs