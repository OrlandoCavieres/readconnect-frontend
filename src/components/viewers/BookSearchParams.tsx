import { usePreloadedQuery, useQueryLoader } from 'react-relay'
import { BookFilterValuesQuery } from '@/schema/__generated__/BookFilterValuesQuery.graphql'
import { BookFilterValues } from '@/schema/BookFilterValues'
import { Suspense, useContext, useEffect } from 'react'
import SelectCustom from '@/components/forms/SelectCustom'
import { BookSearchListContext } from '@/types/contexts'
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'
import InputField from '@/components/forms/InputField'


function SearchParamWithQuery({ queryRef }: { queryRef: any }) {
  const data = usePreloadedQuery<BookFilterValuesQuery>(BookFilterValues, queryRef)
  const context = useContext(BookSearchListContext)

  const createAuthorOptions = () => {
    return [
      { value: '', label: 'Todo' },
      ...data.bookFiltersValues.authors.map(author => {
        return { value: author.id, label: author.name }
      })
    ]
  }

  const createBookCategoryOptions = () => {
    return [
      { value: '', label: 'Todo'},
      ...data.bookFiltersValues.categories.map(category => {
        return { value: category.id, label: category.name }
      })
    ]
  }

  return (
    <>
      <div className='bookSearchParams_filterField'>
        <div className='h6_b_secondary'>
          Autor
        </div>

        <div style={{ flex: 1 }}>
          <SelectCustom options={createAuthorOptions()}
                        onChange={(e: any) => {
                          context?.setAuthor(e)
                          context?.setStartPosition(0)
                        }}
                        value={context?.author} />
        </div>

        <div className='h6_b_secondary'>
          Categoría
        </div>

        <div style={{ flex: 1 }}>
          <SelectCustom options={createBookCategoryOptions()}
                        onChange={(e: any) => {
                          context?.setCategory(e)
                          context?.setStartPosition(0)
                        }}
                        value={context?.category} />
        </div>
      </div>
    </>
  )
}


export default function BookSearchParams() {
  const [bookFiltersQuery, loadBookFilters] = useQueryLoader<BookFilterValuesQuery>(BookFilterValues)
  const context = useContext(BookSearchListContext)

  useEffect(() => {
    loadBookFilters({})
  }, [])

  const orderOptions = [
    { value: 'title', label: 'Título' },
    { value: 'authors', label: 'Autores' },
    { value: 'rating', label: 'Calificación' },
    { value: 'categories', label: 'Categorías' },
    { value: 'published_date', label: 'Fecha de Publicación' },
    { value: 'page_count', label: 'Número de Páginas' }
  ]

  if (!!bookFiltersQuery) {
    return (
      <div className='bookSearchParams'>
        <Suspense fallback={<div>Cargando...</div>}>
          <div className='bookSearchParams_filterField' style={{ marginBottom: 20 }}>
            <div className='h5_b_secondary'>
              Ordenar por
            </div>

            <div className='bookSearchParams_orderContainer'>
              <div style={{ flex: 1 }}>
                <SelectCustom options={orderOptions}
                              onChange={(e: any) => context?.setOrderBy(e)}
                              value={context?.orderBy} />
              </div>
              <MdArrowDownward className={`sortIcon${context?.descendantOrder ? '' : '_active'}`}
                               onClick={() => {
                                 context?.setDescendantOrder(false)
                               }} />
              <MdArrowUpward className={`sortIcon${context?.descendantOrder ? '_active' : ''}`}
                             onClick={() => {
                               context?.setDescendantOrder(true)
                             }} />
            </div>
          </div>

          <div className='bookSearchParams_filterField'>
            <div className='h5_b_secondary'>
              Filtrar por
            </div>

            <SearchParamWithQuery queryRef={bookFiltersQuery} />

            <div className='h6_b_secondary'>
              Fecha de publicación
            </div>

            <div className='bookSearchParams_filterField'>
              <div className='p1_b_terciary' style={{ paddingLeft: 10 }}>Inicial</div>
              <InputField titleRequired={false} type='date' onChange={(e: any) => {
                context?.setMinPublishedDate(e.target.value)
                context?.setStartPosition(0)
              }} />

              <div className='p1_b_terciary' style={{ paddingLeft: 10 }}>Final</div>
              <InputField titleRequired={false} type='date' onChange={(e: any) => {
                context?.setMaxPublishedDate(e.target.value)
                context?.setStartPosition(0)
              }} />
            </div>

            <div className='h6_b_secondary'>
              Número de páginas
            </div>

            <div className='bookSearchParams_filterDoubleInput'>
              <InputField titleRequired={false} type='number' placeholder='Mínimo'
                          onChange={(e: any) => {
                            context?.setMinPageCount(e.target.valueAsNumber)
                            context?.setStartPosition(0)
                          }} />
              <InputField titleRequired={false} type='number' placeholder='Máximo'
                          onChange={(e: any) => {
                            context?.setMaxPageCount(e.target.valueAsNumber)
                            context?.setStartPosition(0)
                          }} />
            </div>
          </div>
        </Suspense>
      </div>
    )
  }

  return (
    <div>
      Cargando...
    </div>
  )
}
