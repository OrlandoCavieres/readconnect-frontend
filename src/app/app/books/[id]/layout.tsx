'use client'

import { ReactNode } from "react"
import BookReviewWrapper from '@/components/viewers/BookReviewWrapper'


export default function BookLayout({ children }: { children: ReactNode }) {
  return (
    <main className='outletViewMain'>
      <div className='bookOutletViewSide'>
        { children }
      </div>

      <div className='bookCommentOutletViewSide'>
        <BookReviewWrapper />
      </div>
    </main>
  )
}
