'use client'

import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  currentTab?: number,
  tabOptions?: number[]
}

const GRID_COLS_SIZE: {[key: number]: string} = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
}

export const TabBar = ({ tabOptions = [1, 2, 3, 4,], currentTab }: Props) => {
  const [selected, setSelected] = useState(currentTab)

  const router = useRouter()
  const onTabSelected = (tab: number) => {
    setSelected(tab)
    setCookie('seletedTab', tab.toString())
    router.refresh()
  }

  return (
    <div className={`grid ${GRID_COLS_SIZE[tabOptions.length] ?? 'grid-cols-4'} w-full space-x-2 rounded-xl bg-gray-200 p-2`}>
      {
        tabOptions.map(tab => (
          <div key={ tab }>
            <input
              checked={ selected === tab }
              onChange={ () => {} }
              type="radio"
              id={tab.toString()}
              className="peer hidden"
            />
            <label
              onClick={ () => onTabSelected(tab) }
              className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              { tab }
            </label>
          </div>
        ))
      }
    </div>
  )
}
