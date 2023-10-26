import { graphql } from 'react-relay'


export const Profile = graphql`
    query ProfileQuery {
        profile {
            name,
            email
        }
    }
`
