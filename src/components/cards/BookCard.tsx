'use client'

import Image from "next/image"
import Link from 'next/link'
import { MdBookmarkAdd, MdCheckCircle, MdOutlineCircle } from 'react-icons/md'
import { useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-relay'
import { UserBookList } from '@/schema/UserBookList'
import { UserListsViewerContext } from '@/types/contexts'


type Book = {
  readonly id: any;
  readonly inFinishedList: boolean
  readonly inWishList: boolean
  readonly sections: any
}

type BookCardProps = {
  info: Book
}


export default function BookCard({ info }: BookCardProps) {
  const [inWishList, setInWishList] = useState(info.inWishList)
  const [inFinishedList, setInFinishedList] = useState(info.inFinishedList)
  const [commitListAction, loadingListChange] = useMutation(UserBookList)
  const {finishedRefreshQuery,
    wishedRefreshQuery} = useContext(UserListsViewerContext)

  /**
   * Si se actualiza libro para dejarlo en lista de deseados, se elimina visualmente de la lista de leidos.
   */
  useEffect(() => {
    if (inWishList) {
      setInFinishedList(false)
    }
  }, [inWishList]);

  /**
   * Si se actualiza libro para dejarlo en lista de leídos, se elimina visualmente de la lista de deseados.
   */
  useEffect(() => {
    if (inFinishedList) {
      setInWishList(false)
    }
  }, [inFinishedList]);

  const listAction = (actualValue: boolean, listName: string) => {
    const action = actualValue ? 'REMOVE' : 'ADD'

    commitListAction({
      variables: { action, listName: listName, bookId: info.id },
      onCompleted: (data: any) => {
        if (data.userBookList.__typename === 'Success') {
          if (listName === 'WISHED') {
            setInWishList(!inWishList)
          }

          else if (listName === 'FINISHED') {
            setInFinishedList(!inFinishedList)
          }

          if (finishedRefreshQuery) {
            finishedRefreshQuery(0)
          }
          if (wishedRefreshQuery) {
            wishedRefreshQuery(0)
          }
        }
      }
    })
  }

  const loadSection = () => {
    let imageSection = null
    const sections = []

    for (let i = 0; i < info.sections.length; i++) {
      const sect = info.sections[i]

      if (sect.__typename === 'BackgroundImage') {
        imageSection = (
          <div key={`Section${i}`} className='bookCard_imageViewer'>
            <Image src={info.sections[0].url} alt={''} fill sizes={'220px 140px'} />
          </div>
        )
      }

      else {
        if (sect.__typename === 'Container') {
          const elems = []

          for (let j = 0; j < sect.elements.length; j++) {
            const el = sect.elements[j]

            if (el.__typename === 'Title') {
              elems.push(
                <div key={`SectionTitle${i}${j}`} className={`${el.size}_${el.weight}_${el.color}`}>
                  {el.text}
                </div>
              )
            }

            else if (el.__typename === 'Description') {
              elems.push(
                <div key={`SectionDescription${i}${j}`} className={`${el.size}_${el.weight}_${el.color}`}>
                  {el.text}
                </div>
              )
            }
            else if (el.__typename === 'BookCategoryTag') {
              elems.push(
                <div key={`SectionCategoryTag${i}${j}`} className='p1_b_textAlternative bookCategoryTag'>
                  {el.name}
                </div>
              )
            }
          }

          sections.push(
            <div key={`Section${i}`} style={{ display: 'flex', alignItems: sect.align, flexDirection: sect.direction,
              justifyContent: sect.justify, gap: sect.gap }}>
              {elems}
            </div>
          )
        }
      }
    }

    return [imageSection, sections]
  }

  return (
    <div className='bookCard_container' >
      {/* Contenedor para acciones de agregar/quitar libro de lista del usuario */}
      <div className='bookCard_buttonContainer'>
        {/* Icono del boton auto expandible para agregar/quitar libro a listas */}
        <MdBookmarkAdd className='bookCardButton_plusIcon' />

        {/* Agregar/quitar libro de lista POR LEER */}
        <div className='bookCardButton_checksButton' onClick={() => listAction(inWishList, 'WISHED')}>
          {inWishList
            ? <MdCheckCircle className='bookCardButton_checkCircleIcon' />
            : <MdOutlineCircle className='bookCardButton_emptyCircleIcon' />
          }
          <div>Por leer</div>
        </div>

        {/* Agregar/quitar libro de lista LEIDOS */}
        <div className='bookCardButton_checksButton' onClick={() => listAction(inFinishedList, 'FINISHED')}>
          {inFinishedList
            ? <MdCheckCircle className='bookCardButton_checkCircleIcon' />
            : <MdOutlineCircle className='bookCardButton_emptyCircleIcon' />
          }
          <div>Leído</div>
        </div>
      </div>

      {/* Mostrar tarjeta del libro */}
      <Link style={{ display: 'flex', flex: 1 }} href={`/app/books/${info.id}`}>
        {/* Sección correspondiente a IMAGEN del libro */}
        { loadSection()[0] }

        {/* Sección correspondiente a INFORMACIÓN del libro, habilitada por hover sobre el mismo */}
        <div className='bookCard_infoViewer'>
          {loadSection()[1]}
        </div>
      </Link>
    </div>
  )
}
