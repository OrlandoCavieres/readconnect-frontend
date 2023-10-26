'use client'

import React, { ReactNode, useCallback } from "react"
import ListViewer from '@/components/viewers/ListViewer'
import { useQueryLoader } from 'react-relay'
import { BookCardList } from '@/schema/BookCardList'
import { UserListsViewerContext } from "@/types/contexts"


export default function UserListLayout({ children }: { children: ReactNode }) {
  const [wishedListQuery, loadWishedListQuery] =  useQueryLoader(BookCardList)
  const [finishedListQuery, loadFinishedListQuery] =  useQueryLoader(BookCardList)

  const refreshWishedList = useCallback((startPosition: number) => {
    loadWishedListQuery(
      { elements: 12, startPosition, userList: "WISHED" },
      { fetchPolicy: 'store-and-network' }
    )}, [loadWishedListQuery],
  )

  const refreshFinishedList = useCallback((startPosition: number) => {
      loadFinishedListQuery(
        { elements: 12, startPosition, userList: "FINISHED" },
      { fetchPolicy: 'store-and-network' }
      )
    },
    [loadFinishedListQuery],
  )

  return (
    <main className='outletViewMain'>
      <div className='userListsBooksOutletViewSide'>
        <UserListsViewerContext.Provider value={{
          elements: 12,
          finishedRefreshQuery: refreshFinishedList,
          wishedRefreshQuery: refreshWishedList
        }}>
          <ListViewer key='WishedList'
                      queryRef={wishedListQuery}
                      refreshQuery={refreshWishedList}
                      title='Por leer' />

          <ListViewer key='FinishedList'
                      queryRef={finishedListQuery}
                      refreshQuery={refreshFinishedList} title='Ya leídos' />
        </UserListsViewerContext.Provider>
      </div>

      <div style={{ width: 350 }}>
        {children}
      </div>
    </main>
  )
}
