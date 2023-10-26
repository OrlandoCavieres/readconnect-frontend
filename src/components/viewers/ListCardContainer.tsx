import { usePreloadedQuery } from 'react-relay'
import { BookCardListQuery } from '@/schema/__generated__/BookCardListQuery.graphql'
import { BookCardList } from '@/schema/BookCardList'
import BookCard from '@/components/cards/BookCard'
import { Dispatch, SetStateAction, useContext } from 'react'
import { UserListsViewerContext } from '@/types/contexts'
import Paginator from '@/components/viewers/Paginator'
import Link from 'next/link'


type ListCardContainerProps = {
  queryRef: any,
  startPosition: number,
  setStartPosition: Dispatch<SetStateAction<number>>
}


export function ListCardContainer({ queryRef, startPosition, setStartPosition }: ListCardContainerProps) {
  const data = usePreloadedQuery<BookCardListQuery>(BookCardList, queryRef)
  const { elements } = useContext(UserListsViewerContext)

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
        <div>
          <span>No hay libros aquí. </span>
          <Link href={'/app/books'} className='h5_b_primaryAlternative'>
            Busca alguno y agrega!
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='listCardContainer'>
      {/* Muestra el paginador de la respuesta */}
      <Paginator data={data.books} startPosition={startPosition} setStartPosition={setStartPosition} elements={elements} />

      {/* Muestra los libros en forma de tarjetas ordenados por nombre y organizados en una grilla */}
      <div className='listCardContainer_grid'>
        { createCards() }
      </div>
    </div>
  )
}
