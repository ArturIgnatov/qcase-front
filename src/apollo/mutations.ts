import { gql } from '@apollo/client';

// ORGANIZATIONS
export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($creationData: CreateOrganizationInput!) {
    createOrganization(createOrgInput: $creationData) {
      id
      name
      description
    }
  }
`;

export const UPDATE_ORGANIZATION = gql`
  mutation UpdateOrganization($data: UpdateOrganizationInput!) {
    updateOrganization(updateOrgInput: $data) {
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

// PROJECTS
export const CREATE_PROJECT = gql`
  mutation CreateProject($data: CreateProjectInput!) {
    createProject(createProjectInput: $data) {
      id
      name
      description
      organizationId
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($data: UpdateProjectInput!) {
    updateProject(updateProjectInput: $data) {
      id
      name
      description
      organizationId
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation RemoveProject($id: String!) {
    removeProject(id: $id)
  }
`;

// TEMPLATES
export const CREATE_TEMPLATE = gql`
  mutation CreateTemplate($creationData: CreateTemplateInput!) {
    createTemplate(createTemplateInput: $creationData) {
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

export const UPDATE_TEMPLATE = gql`
  mutation UpdateTemplate($data: UpdateTemplateInput!) {
    updateTemplate(updateTemplateInput: $data) {
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

export const REMOVE_TEMPLATE = gql`
  mutation RemoveTemplate($id: String!) {
    removeTemplate(id: $id)
  }
`;

// CASES
export const CREATE_CASE = gql`
  mutation CreateCase($data: CreateCaseInput!) {
    createCase(createCaseInput: $data) {
      id
      name
      description
      templateId
      createdAt
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

export const UPDATE_CASE = gql`
  mutation UpdateCase($data: UpdateCaseInput!) {
    updateCase(updateCaseInput: $data) {
      id
      name
      description
      templateId
      createdAt
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

export const REMOVE_CASE = gql`
  mutation RemoveCase($id: String!) {
    removeCase(id: $id)
  }
`;

//TAGS
export const CREATE_TAG = gql`
  mutation CreateTag($data: CreateTagInput!) {
    createTag(createTagInput: $data) {
      id
      title
      color
      organizationId
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation UpdateTag($data: UpdateTagInput!) {
    updateTag(updateTagInput: $data) {
      id
      title
      color
      organizationId
    }
  }
`;

export const REMOVE_TAG = gql`
  mutation RemoveTag($id: String!) {
    removeTag(id: $id)
  }
`;

// INVITES
export const CREATE_USER_INVITE = gql`
  mutation CreateUserInvite($data: CreateUserInviteInput!) {
    createUserInvite(createUserInviteInput: $data) {
      id
      email
      createdAt
    }
  }
`;

// TESTS
export const CREATE_TEST = gql`
  mutation CreateTest($input: CreateTestInput!) {
    createTest(createTestInput: $input) {
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

export const REMOVE_TEST = gql`
  mutation RemoveTest($id: String!) {
    removeTest(id: $id)
  }
`;
