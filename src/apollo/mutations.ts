import { gql } from '@apollo/client';

export const UPDATE_GLOBAL_USER = gql`
  mutation UpdateGlobalUser($updateUser: UpdateUserInput!) {
    updateUser(updateUser: $updateUser) {
      fname
      lname
      role
      userOrganizations {
        organization {
          id
          name
          description
        }
      }
    }
  }
`;

export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($creationData: CreateOrganizationInput!) {
    createOrganization(createOrgInput: $creationData) {
      id
      name
      description
    }
  }
`;

export const REMOVE_ORGANIZATION = gql`
  mutation RemoveOrganization($id: String!) {
    removeOrganization(id: $id)
  }
`;
