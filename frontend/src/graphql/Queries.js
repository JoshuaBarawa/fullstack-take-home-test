

import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query {
    books {
        author
        coverPhotoURL
        readingLevel
        title
      }
  }
`;


