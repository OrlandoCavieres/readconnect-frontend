'use client'

import { Suspense, useEffect, useState } from 'react'
import { ListCardContainer } from '@/components/viewers/ListCardContainer'

type ListViewerProps = {
  queryRef?: any,
  refreshQuery?: any,
  title?: string
}


export default function ListViewer({ queryRef, refreshQuery, title }: ListViewerProps) {
  const [startPosition, setStartPosition] = useState(0);

  useEffect(() => {
    refreshQuery(startPosition)
  }, [startPosition, refreshQuery]);


  if (!!queryRef) {
    return (
      <Suspense fallback={<div>Cargando...</div>}>
        <div className='listViewer_mainWrapper'>
          <div className='listViewer_mainWrapper_title'>
            {title}
          </div>

          <ListCardContainer queryRef={queryRef} startPosition={startPosition} setStartPosition={setStartPosition}/>
        </div>
      </Suspense>
    )
  }

  return (
    <div>
      Cargando...
    </div>
  )
}
