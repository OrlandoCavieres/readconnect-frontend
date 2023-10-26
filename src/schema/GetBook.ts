import { graphql } from 'react-relay'

export const GetBook = graphql`
    query GetBookQuery($objectId: GlobalID) {
        books(action: VIEW, objectId: $objectId) {
            __typename
            ... on BookObjectResult {
                message
                single {
                    id
                    title
                    authors {
                        id
                        name
                    }
                    categories {
                        id
                        name
                    }
                    isbn
                    longDescription
                    pageCount
                    publishedDate
                    publishedDateFormat
                    rating
                    reviewsNumber
                    status
                    thumbnail
                }
            }
            ... on Error {
                message
                fields {
                    errors
                    field
                }
            }
        }
    }
`
