/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
}

export interface CaseEntity {
  __typename?: 'CaseEntity';
  createdAt: Scalars['DateTime'];
  createdUserId: Scalars['ID'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  templateId: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  user: UserEntity;
}

export interface CaseFiltersInput {
  templateId: Scalars['ID'];
}

export interface CreateCaseInput {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  templateId: Scalars['ID'];
}

export interface CreateOrganizationInput {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
}

export interface CreateProjectInput {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  organizationId: Scalars['String'];
}

export interface CreateTagInput {
  color: Scalars['String'];
  organizationId: Scalars['ID'];
  title: Scalars['String'];
}

export interface CreateTemplateInput {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  organizationId: Scalars['ID'];
}

export interface CreateUserInput {
  email: Scalars['String'];
  fname: Scalars['String'];
  lname?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
}

export interface Mutation {
  __typename?: 'Mutation';
  createCase: CaseEntity;
  createOrganization: OrganizationEntity;
  createProject: ProjectEntity;
  createTag: TagEntity;
  createTemplate: TemplateEntity;
  createUser: UserEntity;
  removeCase: Scalars['String'];
  removeOrganization: Scalars['String'];
  removeProject: Scalars['String'];
  removeTag: Scalars['String'];
  removeTemplate: Scalars['String'];
  removeUser: Scalars['String'];
  updateCase: CaseEntity;
  updateOrganization: OrganizationEntity;
  updateProject: ProjectEntity;
  updateTag: TagEntity;
  updateTemplate: TemplateEntity;
  updateUser: UserEntity;
}


export interface MutationCreateCaseArgs {
  createCaseInput: CreateCaseInput;
}


export interface MutationCreateOrganizationArgs {
  createOrgInput: CreateOrganizationInput;
}


export interface MutationCreateProjectArgs {
  createProjectInput: CreateProjectInput;
}


export interface MutationCreateTagArgs {
  createTagInput: CreateTagInput;
}


export interface MutationCreateTemplateArgs {
  createTemplateInput: CreateTemplateInput;
}


export interface MutationCreateUserArgs {
  createUser: CreateUserInput;
}


export interface MutationRemoveCaseArgs {
  id: Scalars['String'];
}


export interface MutationRemoveOrganizationArgs {
  id: Scalars['String'];
}


export interface MutationRemoveProjectArgs {
  id: Scalars['String'];
}


export interface MutationRemoveTagArgs {
  id: Scalars['String'];
}


export interface MutationRemoveTemplateArgs {
  id: Scalars['String'];
}


export interface MutationRemoveUserArgs {
  id: Scalars['String'];
}


export interface MutationUpdateCaseArgs {
  updateCaseInput: UpdateCaseInput;
}


export interface MutationUpdateOrganizationArgs {
  updateOrgInput: UpdateOrganizationInput;
}


export interface MutationUpdateProjectArgs {
  updateProjectInput: UpdateProjectInput;
}


export interface MutationUpdateTagArgs {
  updateTagInput: UpdateTagInput;
}


export interface MutationUpdateTemplateArgs {
  updateTemplateInput: UpdateTemplateInput;
}


export interface MutationUpdateUserArgs {
  updateUser: UpdateUserInput;
}

export interface OrganizationEntity {
  __typename?: 'OrganizationEntity';
  createdAt: Scalars['DateTime'];
  createdUserId: Scalars['ID'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  organizationUsers: Array<OrganizationUserEntity>;
  projects: Array<ProjectEntity>;
  status: OrganizationStatus;
  updatedAt: Scalars['DateTime'];
}

export interface OrganizationFiltersInput {
  userId?: InputMaybe<Scalars['ID']>;
}

/** The organization statuses */
export enum OrganizationStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  DISABLE = 'DISABLE'
}

export interface OrganizationUserEntity {
  __typename?: 'OrganizationUserEntity';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  organization: OrganizationEntity;
  organizationId: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  user: UserEntity;
  userId: Scalars['ID'];
}

export interface ProjectEntity {
  __typename?: 'ProjectEntity';
  createdAt: Scalars['DateTime'];
  createdUserId: Scalars['ID'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  organization: OrganizationEntity;
  organizationId: Scalars['ID'];
  status: ProjectStatus;
  updatedAt: Scalars['DateTime'];
}

export interface ProjectFiltersInput {
  organizationId: Scalars['String'];
}

/** The organization statuses */
export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  DISABLE = 'DISABLE'
}

export interface Query {
  __typename?: 'Query';
  case: CaseEntity;
  cases: Array<CaseEntity>;
  organization: OrganizationEntity;
  organizations: Array<OrganizationEntity>;
  project: ProjectEntity;
  projects: Array<ProjectEntity>;
  tag: TagEntity;
  tags: Array<TagEntity>;
  template: TemplateEntity;
  templates: Array<TemplateEntity>;
  user: UserEntity;
  users: Array<UserEntity>;
}


export interface QueryCaseArgs {
  id: Scalars['String'];
}


export interface QueryCasesArgs {
  filters?: InputMaybe<CaseFiltersInput>;
}


export interface QueryOrganizationArgs {
  id: Scalars['String'];
}


export interface QueryOrganizationsArgs {
  filters?: InputMaybe<OrganizationFiltersInput>;
}


export interface QueryProjectArgs {
  id: Scalars['String'];
}


export interface QueryProjectsArgs {
  filters?: InputMaybe<ProjectFiltersInput>;
}


export interface QueryTagArgs {
  id: Scalars['String'];
}


export interface QueryTagsArgs {
  filters: TagFiltersInput;
}


export interface QueryTemplateArgs {
  id: Scalars['String'];
}


export interface QueryTemplatesArgs {
  filters?: InputMaybe<TemplateFiltersInput>;
}


export interface QueryUserArgs {
  id: Scalars['String'];
}

export interface TagEntity {
  __typename?: 'TagEntity';
  caseId: Scalars['ID'];
  color: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdUserId: Scalars['ID'];
  id: Scalars['ID'];
  organizationId: Scalars['ID'];
  templateId: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
}

export interface TagFiltersInput {
  caseId?: InputMaybe<Scalars['ID']>;
  organizationId?: InputMaybe<Scalars['ID']>;
  templateId?: InputMaybe<Scalars['ID']>;
}

export interface TemplateEntity {
  __typename?: 'TemplateEntity';
  cases: Array<CaseEntity>;
  createdAt: Scalars['DateTime'];
  createdUserId: Scalars['ID'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  organization: OrganizationEntity;
  organizationId: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  user: UserEntity;
}

export interface TemplateFiltersInput {
  organizationId?: InputMaybe<Scalars['ID']>;
}

export interface UpdateCaseInput {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
}

export interface UpdateOrganizationInput {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
}

export interface UpdateProjectInput {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
}

export interface UpdateTagInput {
  color?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
}

export interface UpdateTemplateInput {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
}

export interface UpdateUserInput {
  fname?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lname?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
}

export interface UserEntity {
  __typename?: 'UserEntity';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  fname: Scalars['String'];
  id: Scalars['ID'];
  lname: Scalars['String'];
  role: UserRole;
  updatedAt: Scalars['DateTime'];
  userOrganizations: Array<OrganizationUserEntity>;
}

/** The user supported roles. */
export enum UserRole {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  USER = 'USER'
}
