import { graphql } from 'react-relay'


export const BookFilterValues = graphql`
    query BookFilterValuesQuery {
        bookFiltersValues {
            authors {
                id
                name
            }
            categories {
                id
                name
            }
        }
    }
`
