import { usePreloadedQuery } from 'react-relay'
import { GetBookReviews } from '@/schema/GetBookReviews'
import { GetBookReviewsQuery } from '@/schema/__generated__/GetBookReviewsQuery.graphql'
import CommentCard from '@/components/cards/CommentCard'


type BookReviewViewerProps = {
  queryRef?: any
}


export default function BookReviewsView({ queryRef }: BookReviewViewerProps) {
  const data = usePreloadedQuery<GetBookReviewsQuery>(GetBookReviews, queryRef)

  if (data.booksReviewsList.__typename === 'BookReviewObjectResult') {
    const renderData = data.booksReviewsList.list

    const createCommentCards = () => {
      return renderData?.map(comment => {
        return <CommentCard info={comment} />
      })
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        { createCommentCards() }
      </div>
    )
  }

  else if (data.booksReviewsList.__typename === 'Empty') {
    return (
      <div className='h4_r_primaryAlternative'>
        No hay comentarios. Sé el primero!
      </div>
    )
  }

  else {
    return (
      <div>Error</div>
    )
  }
}
