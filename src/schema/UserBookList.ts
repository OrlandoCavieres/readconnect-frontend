import { graphql } from 'react-relay'

export const UserBookList = graphql`
    mutation UserBookListMutation($action: ApiRelatedAction!, $listName: UserBookList!, $bookId: GlobalID!) {
        userBookList(action: $action, listTarget: $listName, bookId: $bookId) {
            __typename
            ... on Success {
                message
            },
            ... on Error {
                message
            }
            ... on NoChanges {
                message
            }
        }
    }
`
