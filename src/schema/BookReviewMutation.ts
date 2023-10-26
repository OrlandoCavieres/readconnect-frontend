import { graphql } from 'react-relay'

export const BookReviewMutation = graphql`
    mutation BookReviewMutation($action: ApiMutationAction!, $objectId: GlobalID, $form: BookReviewForm) {
        booksReviews(action: $action, objectId: $objectId, form: $form) {
            __typename
            ... on Success {
                message
                processName
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
