import { gql } from '@apollo/client';

export const GET_GLOBAL_USER = gql`
  query GlobalUser($id: String!) {
    user(id: $id) {
      id
      fname
      lname
    }
  }
`;

export const GET_GLOBAL_ORGANIZATIONS = gql`
  query GlobalOrganization($filters: OrganizationFiltersInput) {
    organizations(filters: $filters) {
      id
      name
      description
    }
  }
`;

export const GET_GLOBAL_PROJECTORS = gql`
  query GlobalProjects($filters: ProjectFiltersInput!) {
    projects(filters: $filters) {
      id
      name
      description
      organizationId
    }
  }
`;

export const GET_GLOBAL_TEMPLATES = gql`
  query GlobalTemplates($filters: TemplateFiltersInput!) {
    templates(filters: $filters) {
      id
      name
      description
      createdAt
      organizationId
    }
  }
`;

export const GLOBAL_CASES = gql`
  query GlobalCases($filters: CaseFiltersInput) {
    cases(filters: $filters) {
      id
      name
      description
      createdAt
      templateId
    }
  }
`;

export const GLOBAL_TAGS = gql`
  query GlobalTags($filters: TagFiltersInput!) {
    tags(filters: $filters) {
      id
      title
      color
      organizationId
    }
  }
`;
