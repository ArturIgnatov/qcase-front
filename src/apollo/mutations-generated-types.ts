import * as Types from './app-schema';

export type CreateOrganizationMutationVariables = Types.Exact<{
  creationData: Types.CreateOrganizationInput;
}>;

export type CreateOrganizationMutation = {
  createOrganization: Pick<Types.OrganizationEntity, 'id' | 'name' | 'description'>;
};

export type UpdateOrganizationMutationVariables = Types.Exact<{
  data: Types.UpdateOrganizationInput;
}>;

export type UpdateOrganizationMutation = {
  updateOrganization: Pick<Types.OrganizationEntity, 'id' | 'name' | 'description'>;
};

export type RemoveOrganizationMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type RemoveOrganizationMutation = Pick<Types.Mutation, 'removeOrganization'>;

export type CreateProjectMutationVariables = Types.Exact<{
  data: Types.CreateProjectInput;
}>;

export type CreateProjectMutation = {
  createProject: Pick<Types.ProjectEntity, 'id' | 'name' | 'description' | 'organizationId'>;
};

export type UpdateProjectMutationVariables = Types.Exact<{
  data: Types.UpdateProjectInput;
}>;

export type UpdateProjectMutation = {
  updateProject: Pick<Types.ProjectEntity, 'id' | 'name' | 'description' | 'organizationId'>;
};

export type RemoveProjectMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type RemoveProjectMutation = Pick<Types.Mutation, 'removeProject'>;

export type CreateTemplateMutationVariables = Types.Exact<{
  creationData: Types.CreateTemplateInput;
}>;

export type CreateTemplateMutation = {
  createTemplate: Pick<
    Types.TemplateEntity,
    'id' | 'name' | 'description' | 'createdAt' | 'organizationId'
  >;
};

export type UpdateTemplateMutationVariables = Types.Exact<{
  data: Types.UpdateTemplateInput;
}>;

export type UpdateTemplateMutation = {
  updateTemplate: Pick<
    Types.TemplateEntity,
    'id' | 'name' | 'description' | 'createdAt' | 'organizationId'
  >;
};

export type RemoveTemplateMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type RemoveTemplateMutation = Pick<Types.Mutation, 'removeTemplate'>;

export type CreateCaseMutationVariables = Types.Exact<{
  data: Types.CreateCaseInput;
}>;

export type CreateCaseMutation = {
  createCase: Pick<Types.CaseEntity, 'id' | 'name' | 'description' | 'templateId' | 'createdAt'>;
};

export type UpdateCaseMutationVariables = Types.Exact<{
  data: Types.UpdateCaseInput;
}>;

export type UpdateCaseMutation = {
  updateCase: Pick<Types.CaseEntity, 'id' | 'name' | 'description' | 'templateId' | 'createdAt'>;
};

export type RemoveCaseMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type RemoveCaseMutation = Pick<Types.Mutation, 'removeCase'>;

export type CreateTagMutationVariables = Types.Exact<{
  data: Types.CreateTagInput;
}>;

export type CreateTagMutation = {
  createTag: Pick<Types.TagEntity, 'id' | 'title' | 'color' | 'organizationId'>;
};

export type UpdateTagMutationVariables = Types.Exact<{
  data: Types.UpdateTagInput;
}>;

export type UpdateTagMutation = {
  updateTag: Pick<Types.TagEntity, 'id' | 'title' | 'color' | 'organizationId'>;
};

export type RemoveTagMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type RemoveTagMutation = Pick<Types.Mutation, 'removeTag'>;
