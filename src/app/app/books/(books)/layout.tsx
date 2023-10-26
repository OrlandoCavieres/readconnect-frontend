'use client'

import { ReactNode, useState } from "react"
import BookSearchParams from '@/components/viewers/BookSearchParams'
import { BookSearchListContext } from '@/types/contexts'


export default function BookListLayout({ children }: { children: ReactNode }) {
  const [orderBy, setOrderBy] = useState({ value: 'title', label: 'Título'})
  const [descendantOrder, setDescendantOrder] = useState(false)

  const [author, setAuthor] = useState({ value: '', label: 'Todo'})
  const [category, setCategory] = useState({ value: '', label: 'Todo'})

  const [minPublishedDate, setMinPublishedDate] = useState<string | null>(null)
  const [maxPublishedDate, setMaxPublishedDate] = useState<string | null>(null)

  const [minPageCount, setMinPageCount] = useState<number | null>(null)
  const [maxPageCount, setMaxPageCount] = useState<number | null>(null)

  const [startPosition, setStartPosition] = useState(0)

  return (
    <BookSearchListContext.Provider value={{
      orderBy, setOrderBy, descendantOrder, setDescendantOrder, author, setAuthor, category, setCategory, minPageCount, setMinPageCount,
      maxPageCount, setMaxPageCount, minPublishedDate, setMinPublishedDate, maxPublishedDate, setMaxPublishedDate,
      startPosition, setStartPosition
    }}>
      <main className='outletViewMain'>
        <div className='bookListOutletViewSide'>
          { children }
        </div>

        <BookSearchParams />
      </main>
    </BookSearchListContext.Provider>
  )
}
