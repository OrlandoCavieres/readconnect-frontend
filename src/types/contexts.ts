import { createContext, Dispatch, SetStateAction } from 'react'


export type UserListsViewerContextValues = {
  elements: number
  finishedRefreshQuery?: (startPosition: number) => void
  wishedRefreshQuery?: (startPosition: number) => void
}

export const UserListsViewerContext = createContext<UserListsViewerContextValues>({
  elements: 50
})


export type SelectOption = {
  value: string,
  label: string
}


export type BookSearchListContextValues = {
  orderBy: SelectOption,
  setOrderBy: Dispatch<SetStateAction<SelectOption>>,
  descendantOrder: boolean,
  setDescendantOrder: Dispatch<SetStateAction<boolean>>

  author: SelectOption,
  setAuthor: Dispatch<SetStateAction<SelectOption>>,
  category: SelectOption,
  setCategory: Dispatch<SetStateAction<SelectOption>>,

  minPublishedDate: string | null,
  setMinPublishedDate: Dispatch<SetStateAction<any | null>>
  maxPublishedDate: string | null,
  setMaxPublishedDate: Dispatch<SetStateAction<any | null>>,

  minPageCount: number | null,
  setMinPageCount: Dispatch<SetStateAction<number | null>>
  maxPageCount: number | null
  setMaxPageCount: Dispatch<SetStateAction<number | null>>

  startPosition: number
  setStartPosition: Dispatch<SetStateAction<number>>
} | undefined

export const BookSearchListContext = createContext<BookSearchListContextValues>(undefined)
