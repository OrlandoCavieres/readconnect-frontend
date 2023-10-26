import { graphql } from 'react-relay'


export const LoginUser = graphql`
    mutation LoginUserMutation($email: String, $password: String) {
        login(form: {email: $email, password: $password}) {
            __typename
            ... on AuthSuccess {
                message
                processName
                token
                expires
                user {
                    id
                    email
                    name
                }
            }
            ... on Error {
                message
            }
        }
    }
`
