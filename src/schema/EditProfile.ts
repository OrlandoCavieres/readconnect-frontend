import { graphql } from 'react-relay'

export const EditProfile = graphql`
    mutation EditProfileMutation($name: String) {
        editProfile(form: {name: $name}) {
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
