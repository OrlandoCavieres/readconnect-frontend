import { usePreloadedQuery } from 'react-relay'
import { GetBook } from '@/schema/GetBook'
import { GetBookQuery } from '@/schema/__generated__/GetBookQuery.graphql'
import Image from 'next/image'
import { MdStar } from 'react-icons/md'


type BookViewerProps = {
  queryRef?: any
}


function CategoryTag({ text }: { text?: string}) {
  return (
    <div className='bookViewer_header_categoryTag'>
      { text }
    </div>
  )
}


export default function BookViewer({ queryRef }: BookViewerProps) {
  const data = usePreloadedQuery<GetBookQuery>(GetBook, queryRef)

  if (data.books.__typename === 'BookObjectResult') {
    const renderData = data.books.single

    const ratingView = () => {
      if (renderData?.reviewsNumber === 0) {
        return (
          <div className='h6_r_danger'>
            Sin Calificación
          </div>
        )
      }
      return (
        <div className='bookViewer_info_ratingContainer' >
          <div>
            { renderData?.rating.toFixed(1) }
          </div>
          <MdStar className='iconStar' />
          <div className='counterReviews'>
            ({ renderData?.reviewsNumber } reviews)
          </div>
        </div>
      )
    }

    return (
      <div className='bookViewer'>
        <div className='bookViewer_header'>
          <div className='bookViewer_header_categoriesContainer'>
            { renderData?.categories.map((category) => {
              return <CategoryTag key={`BookViewTag-${category.id}`} text={category.name} />
            }) }
          </div>

          <div className='bookViewer_title'>
            { renderData?.title }
          </div>

          <div className='bookViewer_authors'>
            { renderData?.authors.map((author) => {
              return (
                <div key={`Author-${author.id}`} style={{ paddingRight: 30 }}>
                  { author.name }
                </div>
              )})
            }
          </div>
        </div>

        <div className='bookViewer_info'>
          <div className='bookViewer_info_leftSide'>
            <div className='bookViewer_info_imageDisplay'>
              <Image src={`${renderData?.thumbnail}`} alt={`Imagen de portada del libro ${renderData?.title}`} fill />
            </div>
            { ratingView() }
          </div>

          <div className='bookViewer_info_field'>
            <div className='fieldTitle'>
              Descripción
            </div>
            <div className='fieldTextData'>
              { renderData?.longDescription ? renderData.longDescription : 'Sin descripción' }
            </div>

            <div className='fieldTitle'>
              Páginas
            </div>
            <div className='fieldTextData'>
              { renderData?.pageCount ? renderData.pageCount : 'No establecido' }
            </div>

            <div className='fieldTitle'>
              Fecha de Publicación
            </div>
            <div className='fieldTextData'>
              { renderData?.publishedDateFormat }
            </div>

            <div className='fieldTitle'>
              ISBN
            </div>
            <div className='fieldTextData'>
              { renderData?.isbn }
            </div>
          </div>
        </div>
      </div>
    )
  }

  else {
    return (
      <div>Error</div>
    )
  }
}
