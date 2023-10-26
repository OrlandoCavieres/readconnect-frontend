import { useContext } from 'react'
import { BookSearchListContext } from '@/types/contexts'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'


type PaginatorProps = {
  data: any,
  startPosition?: number,
  setStartPosition?: any,
  elements?: number
}


export default function Paginator({ data, startPosition, setStartPosition, elements }: PaginatorProps) {
  const context = useContext(BookSearchListContext)

  const elems = elements ? elements : 50
  const pos = context ? context.startPosition : startPosition
  const setPos = context ? context.setStartPosition : setStartPosition

  const createPageButtons = () => {
    const paginationButtons = []
    let suspensiveAdded = false

    if (data.__typename === 'BookObjectResult') {
      if (data.pagination) {
        for (let i = 0; i < data.pagination.pages; i++) {
          if (pos === i * elems) {
            paginationButtons.push(
              <div key={`PaginatorButton${i}`}
                   className='pageButton_active'
                   onClick={() => setPos(i * elems)}>
                {i + 1}
              </div>
            )
          }

          else if (i === 0) {
            paginationButtons.push(
              <div key={`PaginatorButton${i}`}
                   className='pageButton'
                   onClick={() => setPos(i * elems)}>
                {i + 1}
              </div>
            )
          }

          else if (i === data.pagination.pages - 1) {
            paginationButtons.push(
              <div key={`PaginatorButton${i}`}
                   className='pageButton'
                   onClick={() => setPos(i * elems)}>
                {i + 1}
              </div>
            )
          }

          else if (pos !== undefined && ((pos >= i * elems - elems * 2) && (pos <= i * elems + elems * 2))) {
            paginationButtons.push(
              <div key={`PaginatorButton${i}`}
                   className='pageButton'
                   onClick={() => setPos(i * elems)}>
                {i + 1}
              </div>
            )
          }

          else {
            if (!suspensiveAdded) {
              paginationButtons.push(
                <div key={`PaginatorButton${i}`}>
                  ...
                </div>
              )
            }
            suspensiveAdded = true
          }
        }
      }
    }
    return paginationButtons
  }

  return (
    <div className='paginator_main'>
      <MdOutlineArrowBackIos className='icon' onClick={() => {
        if (pos !== undefined && pos !== 0) {
          setPos(pos - elems)
        }
      }} />
      { createPageButtons() }
      <MdOutlineArrowForwardIos className='icon' onClick={() => {
        if (pos !== undefined && pos !== (data.pagination.pages - 1) * elems) {
            setPos(pos + elems)
        }
      }} />
    </div>
  )
}
