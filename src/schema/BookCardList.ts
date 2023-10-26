import { graphql } from 'react-relay'

export const BookCardList = graphql`
    query BookCardListQuery($elements: Int = 50, $startPosition: Int, $orderBy: String, $filters: BookFilter, $userList: UserBookList) {
        books(action: CARD_LIST, pagination: {elements: $elements, startPosition: $startPosition}, orderBy: $orderBy, 
            filters: $filters, userList: $userList) {
            __typename
            ... on Empty {
                message
            }
            ... on Error {
                message
            }
            ... on BookObjectResult {
                message
                pagination {
                    actualPage
                    consultedElements
                    first
                    last
                    pageSize
                    pages
                    totalElements
                }
                usingFilters
                cards {
                    id
                    inFinishedList
                    inWishList
                    sections {
                        ... on BackgroundImage {
                            __typename
                            altText
                            url
                        }
                        ... on Title {
                            __typename
                            color
                            size
                            text
                            weight
                        }
                        ... on Description {
                            __typename
                            color
                            size
                            text
                            weight
                        }
                        ... on Container {
                            __typename
                            align
                            direction
                            elements {
                                ... on BookCategoryTag {
                                    __typename
                                    name
                                }
                                ... on Title {
                                    __typename
                                    color
                                    size
                                    text
                                    weight
                                }
                                ... on Description {
                                    __typename
                                    color
                                    size
                                    text
                                    weight
                                }
                            }
                            gap
                            justify
                        }
                        ... on AbsoluteContainer {
                            __typename
                            bottom
                            direction
                            elements {
                                ... on BookCategoryTag {
                                    __typename
                                    name
                                }
                                ... on Title {
                                    __typename
                                    color
                                    size
                                    text
                                    weight
                                }
                                ... on Description {
                                    __typename
                                    color
                                    size
                                    text
                                    weight
                                }
                            }
                            left
                            right
                            top
                            gap
                        }
                    }
                }
            }
        }
    }
`
