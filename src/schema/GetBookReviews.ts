import { graphql } from 'react-relay'

export const GetBookReviews = graphql`
    query GetBookReviewsQuery($bookId: GlobalID) {
        booksReviewsList(bookId: $bookId) {
            __typename
            ... on BookReviewObjectResult {
                message
                list {
                    body
                    fromLoggedUser
                    lastUpdateFormat
                    rating
                    user {
                        email
                        name
                        id
                    }
                }
            }
            ... on Error {
                message
            }
            ... on Empty {
                message
            }
        }
    }
`
