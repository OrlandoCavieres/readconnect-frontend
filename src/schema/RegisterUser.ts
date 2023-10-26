import { graphql } from 'react-relay'


export const RegisterUser = graphql`
    mutation RegisterUserMutation($email: String, $password: String, $name: String) {
        register(form: {email: $email, password: $password, name: $name}) {
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
                fields {
                    errors
                    field
                }
            }
        }
    }
`
