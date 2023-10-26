'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useMutation, useQueryLoader } from 'react-relay'
import { useParams } from 'next/navigation'
import BookReviewsView from '@/components/viewers/BookReviewsView'
import { GetBookReviews } from '@/schema/GetBookReviews'
import { MdStar } from 'react-icons/md'
import Button from '@/components/Button'
import { BookReviewMutation } from '@/schema/BookReviewMutation'


export default function BookReviewWrapper() {
  const [bookReviewsRef, loadBookReviews] = useQueryLoader(GetBookReviews)
  const [commitReview, loadingReview] = useMutation(BookReviewMutation)
  const params = useParams()

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [bodyComment, setBodyComment] = useState('')
  const [rating, setRating] = useState(-1)
  const [sendErrors, setSendError] = useState('')

  useEffect(() => {
    const id_correct = params.id.toString().replaceAll('%3D', '=')
    loadBookReviews({ bookId: id_correct }, { fetchPolicy: 'store-and-network' })
  }, [params.id, loadingReview, commitReview, rating, bodyComment])

  const sendReview = () => {
    const bookId = params.id.toString().replaceAll('%3D', '=')

    commitReview({
      variables: { action: 'CREATE', form: { body: bodyComment, rating, book: bookId }},
      onCompleted: (data: any) => {
        if (data.booksReviews.__typename === 'Success') {
          setBodyComment('')
          if (textAreaRef.current) {
            textAreaRef.current.value = ''
          }

          setRating(-1)
          setSendError('')
          loadBookReviews({ bookId: bookId }, { fetchPolicy: 'store-and-network' })
        }

        else if (data.booksReviews.__typename === 'Error') {
          setSendError(data.booksReviews.message)
        }
      }
    })
  }

  if (!!bookReviewsRef) {
    return (
      <main className='listCommentsViewer_mainWrapper'>
        <Suspense fallback={<div>Cargando</div>}>
          <div className='listCommentsCardsContainer'>
            <div>
              Crear comentario
            </div>
            <textarea ref={textAreaRef}
                      className='commentCard_textarea'
                      placeholder='Escriba el texto aquí'
                      onChange={(e) => setBodyComment(e.target.value)} />
            <div>
              <MdStar className={rating < 1 ? 'h4_b_secondaryAlternative' : 'h4_b_primaryAlternative'}
                      onClick={() => setRating(1)}/>
              <MdStar className={rating < 2 ? 'h4_b_secondaryAlternative' : 'h4_b_primaryAlternative'}
                      onClick={() => setRating(2)}/>
              <MdStar className={rating < 3 ? 'h4_b_secondaryAlternative' : 'h4_b_primaryAlternative'}
                      onClick={() => setRating(3)}/>
              <MdStar className={rating < 4 ? 'h4_b_secondaryAlternative' : 'h4_b_primaryAlternative'}
                      onClick={() => setRating(4)}/>
              <MdStar className={rating < 5 ? 'h4_b_secondaryAlternative' : 'h4_b_primaryAlternative'}
                      onClick={() => setRating(5)}/>
            </div>

            { sendErrors &&
              <div className='h5_b_danger'>
                { sendErrors }
              </div>
            }

            <Button text='Crear' style={{ alignSelf: 'center' }} onClick={() => sendReview()} />
          </div>

          <div className='listCommentsCardsContainer'>
            <BookReviewsView queryRef={bookReviewsRef} />
          </div>
        </Suspense>
      </main>
    )
  }

  return (
    <div>
      Cargando...
    </div>
  )
}
