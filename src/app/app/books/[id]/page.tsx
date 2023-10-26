'use client'

import { Suspense, useEffect } from 'react'
import { useQueryLoader } from 'react-relay'
import { GetBook } from '@/schema/GetBook'
import BookViewer from '@/components/viewers/BookViewer'


export default function BookViewWrapper({ params }: { params: { id: string } }) {
  const [bookQueryRef, loadBook] = useQueryLoader(GetBook)

  useEffect(() => {
    const id_correct = params.id.replaceAll('%3D', '=')
    loadBook({ objectId: id_correct }, { fetchPolicy: 'store-and-network' })
  }, [params.id]);

  if (!!bookQueryRef) {
    return (
      <main>
        <Suspense fallback={<div>Cargando</div>}>
          <BookViewer queryRef={bookQueryRef} />
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
