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
  > & {
    tags: Array<
      Pick<Types.TemplateTagsEntity, 'id'> & { tag: Pick<Types.TagEntity, 'title' | 'color'> }
    >;
    project: Types.Maybe<Pick<Types.ProjectEntity, 'id' | 'name'>>;
  };
};

export type UpdateTemplateMutationVariables = Types.Exact<{
  data: Types.UpdateTemplateInput;
}>;

export type UpdateTemplateMutation = {
  updateTemplate: Pick<
    Types.TemplateEntity,
    'id' | 'name' | 'description' | 'createdAt' | 'organizationId'
  > & {
    tags: Array<
      Pick<Types.TemplateTagsEntity, 'id'> & { tag: Pick<Types.TagEntity, 'title' | 'color'> }
    >;
    project: Types.Maybe<Pick<Types.ProjectEntity, 'id' | 'name'>>;
  };
};

export type RemoveTemplateMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type RemoveTemplateMutation = Pick<Types.Mutation, 'removeTemplate'>;

export type CreateCaseMutationVariables = Types.Exact<{
  data: Types.CreateCaseInput;
}>;

export type CreateCaseMutation = {
  createCase: Pick<
    Types.CaseEntity,
    | 'id'
    | 'name'
    | 'description'
    | 'templateId'
    | 'createdAt'
    | 'precondition'
    | 'expectedResult'
    | 'importance'
  > & {
    steps: Array<Pick<Types.StepEntity, 'id' | 'title'>>;
    tags: Array<
      Pick<Types.CaseTagsEntity, 'id'> & { tag: Pick<Types.TagEntity, 'id' | 'title' | 'color'> }
    >;
  };
};

export type UpdateCaseMutationVariables = Types.Exact<{
  data: Types.UpdateCaseInput;
}>;

export type UpdateCaseMutation = {
  updateCase: Pick<
    Types.CaseEntity,
    | 'id'
    | 'name'
    | 'description'
    | 'templateId'
    | 'createdAt'
    | 'precondition'
    | 'expectedResult'
    | 'importance'
  > & {
    steps: Array<Pick<Types.StepEntity, 'id' | 'title'>>;
    tags: Array<
      Pick<Types.CaseTagsEntity, 'id'> & { tag: Pick<Types.TagEntity, 'id' | 'title' | 'color'> }
    >;
  };
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

export type CreateUserInviteMutationVariables = Types.Exact<{
  data: Types.CreateUserInviteInput;
}>;

export type CreateUserInviteMutation = {
  createUserInvite: Pick<Types.UserInviteEntity, 'id' | 'email' | 'createdAt'>;
};
