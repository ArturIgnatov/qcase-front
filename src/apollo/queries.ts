import { gql } from '@apollo/client';

export const GET_GLOBAL_USER = gql`
  query GlobalUser($id: String!) {
    user(id: $id) {
      id
      fname
      lname
      email
    }
  }
`;

export const GLOBAL_ORGANIZATION_USERS = gql`
  query GlobalOrganizationUsers($data: OrganizationUsersInput!) {
    organizationUsers(organizationUsersInput: $data) {
      user {
        id
        fname
        lname
        email
      }
    }
  }
`;

export const GLOBAL_USER_INVITES = gql`
  query GlobalInvites($filters: UserInvitesInput!) {
    userInvites(filters: $filters) {
      id
      email
      createdAt
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
      tags {
        id
        tag {
          title
          color
        }
      }
      project {
        id
        name
      }
    }
  }
`;

export const TEMPLATES_SELECT_LIST = gql`
  query TemplatesSelectList($filters: TemplateFiltersInput!) {
    templates(filters: $filters) {
      id
      name
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
      precondition
      expectedResult
      importance
      steps {
        id
        title
      }
      tags {
        id
        tag {
          title
          color
        }
      }
    }
  }
`;

export const CASES_SELECT_LIST = gql`
  query CasesSelectList($filters: CaseFiltersInput) {
    cases(filters: $filters) {
      id
      name
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

export const GLOBAL_TESTS = gql`
  query GlobalTests($filters: TestFiltersInput!) {
    tests(filers: $filters) {
      id
      name
      description
      status
      tags {
        id
        tag {
          title
          color
        }
      }
      project {
        id
        name
      }
      responsible {
        id
        fname
        lname
      }
      executor {
        id
        fname
        lname
      }
    }
  }
`;

export const GLOBAL_TEST_CASES = gql`
  query GlobalTestCases($filters: TestCaseFiltersInput) {
    testCases(filters: $filters) {
      id
      case {
        id
        name
        description
        createdAt
        templateId
        precondition
        expectedResult
        importance
        steps {
          id
          title
        }
        tags {
          id
          tag {
            id
            color
            title
          }
        }
      }
      criticality
      status
    }
  }
`;
