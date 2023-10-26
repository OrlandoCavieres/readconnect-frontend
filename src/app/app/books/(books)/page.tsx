'use client'

import { usePreloadedQuery, useQueryLoader } from 'react-relay'
import { BookCardList } from '@/schema/BookCardList'
import { BookCardListQuery } from '@/schema/__generated__/BookCardListQuery.graphql'
import BookCard from '@/components/cards/BookCard'
import { Suspense, useContext, useEffect } from 'react'
import { BookSearchListContext } from '@/types/contexts'
import Paginator from '@/components/viewers/Paginator'


function BooksDisplay({ queryRef  }: { queryRef: any }) {
  const data = usePreloadedQuery<BookCardListQuery>(BookCardList, queryRef)

  const createCards = () => {
    const cards = []
    const response = data.books

    if (response.__typename === 'BookObjectResult') {
      if (response.cards) {
        for (let i = 0; i < response.cards.length; i++) {
          cards.push(<BookCard key={`Cards-${response.cards[i].id}`} info={response.cards[i]} />)
        }
      }
    }

    return cards
  }

  if (createCards().length === 0) {
    return (
      <div className='listCardContainer'>
        No se han encontrado coincidencias
      </div>
    )
  }

  return (
    <div className='listCardContainer'>
      <Paginator data={data.books} />

      <div className='listCardContainer_grid'>
        { createCards() }
      </div>
    </div>
  )
}


export default function BookList() {
  const [booksQuery, loadBooks] = useQueryLoader<BookCardListQuery>(BookCardList)
  const context = useContext(BookSearchListContext)

  useEffect(() => {
    loadBooks({
      startPosition: context?.startPosition,
      orderBy: `${context?.descendantOrder ? '-' : ''}${context?.orderBy?.value}`,
      filters: {
        category: context?.category?.value ? context.category.value : null,
        author: context?.author?.value ? context.author.value : null,
        minPagesNumber: context?.minPageCount,
        maxPagesNumber: context?.maxPageCount,
        minPublishedDate: context?.minPublishedDate,
        maxPublishedDate: context?.maxPublishedDate
      }
    },
      { fetchPolicy: 'store-and-network'})
  }, [
    context?.startPosition, context?.orderBy?.value, context?.descendantOrder, context?.category?.value, context?.author?.value,
    context?.minPageCount, context?.maxPageCount, context?.minPublishedDate, context?.maxPublishedDate, loadBooks
  ])

  if (!!booksQuery) {
    return (
      <Suspense fallback={<div>Cargando</div>}>
        <BooksDisplay queryRef={booksQuery} />
      </Suspense>
    )
  }

  return (
    <div>
      Cargando...
    </div>
  )
}
