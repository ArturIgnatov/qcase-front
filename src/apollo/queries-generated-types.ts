import * as Types from './app-schema';

export type GlobalUserQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type GlobalUserQuery = { user: Pick<Types.UserEntity, 'id' | 'fname' | 'lname' | 'email'> };

export type GlobalOrganizationUsersQueryVariables = Types.Exact<{
  data: Types.OrganizationUsersInput;
}>;

export type GlobalOrganizationUsersQuery = {
  organizationUsers: Array<{ user: Pick<Types.UserEntity, 'id' | 'fname' | 'lname' | 'email'> }>;
};

export type GlobalInvitesQueryVariables = Types.Exact<{
  filters: Types.UserInvitesInput;
}>;

export type GlobalInvitesQuery = {
  userInvites: Array<Pick<Types.UserInviteEntity, 'id' | 'email' | 'createdAt'>>;
};

export type GlobalOrganizationQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.OrganizationFiltersInput>;
}>;

export type GlobalOrganizationQuery = {
  organizations: Array<Pick<Types.OrganizationEntity, 'id' | 'name' | 'description'>>;
};

export type GlobalProjectsQueryVariables = Types.Exact<{
  filters: Types.ProjectFiltersInput;
}>;

export type GlobalProjectsQuery = {
  projects: Array<Pick<Types.ProjectEntity, 'id' | 'name' | 'description' | 'organizationId'>>;
};

export type GlobalTemplatesQueryVariables = Types.Exact<{
  filters: Types.TemplateFiltersInput;
}>;

export type GlobalTemplatesQuery = {
  templates: Array<
    Pick<Types.TemplateEntity, 'id' | 'name' | 'description' | 'createdAt' | 'organizationId'> & {
      tags: Array<
        Pick<Types.TemplateTagsEntity, 'id'> & { tag: Pick<Types.TagEntity, 'title' | 'color'> }
      >;
      project: Types.Maybe<Pick<Types.ProjectEntity, 'id' | 'name'>>;
    }
  >;
};

export type TemplatesSelectListQueryVariables = Types.Exact<{
  filters: Types.TemplateFiltersInput;
}>;

export type TemplatesSelectListQuery = {
  templates: Array<Pick<Types.TemplateEntity, 'id' | 'name'>>;
};

export type GlobalCasesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.CaseFiltersInput>;
}>;

export type GlobalCasesQuery = {
  cases: Array<
    Pick<
      Types.CaseEntity,
      | 'id'
      | 'name'
      | 'description'
      | 'createdAt'
      | 'templateId'
      | 'precondition'
      | 'expectedResult'
      | 'importance'
    > & {
      steps: Array<Pick<Types.StepEntity, 'id' | 'title'>>;
      tags: Array<
        Pick<Types.CaseTagsEntity, 'id'> & { tag: Pick<Types.TagEntity, 'title' | 'color'> }
      >;
    }
  >;
};

export type CasesSelectListQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.CaseFiltersInput>;
}>;

export type CasesSelectListQuery = {
  cases: Array<Pick<Types.CaseEntity, 'id' | 'name' | 'templateId'>>;
};

export type GlobalTagsQueryVariables = Types.Exact<{
  filters: Types.TagFiltersInput;
}>;

export type GlobalTagsQuery = {
  tags: Array<Pick<Types.TagEntity, 'id' | 'title' | 'color' | 'organizationId'>>;
};

export type GlobalTestsQueryVariables = Types.Exact<{
  filters: Types.TestFiltersInput;
}>;

export type GlobalTestsQuery = {
  tests: Array<
    Pick<Types.TestEntity, 'id' | 'name' | 'description' | 'status'> & {
      tags: Array<
        Pick<Types.TestTagsEntity, 'id'> & { tag: Pick<Types.TagEntity, 'title' | 'color'> }
      >;
      project: Types.Maybe<Pick<Types.ProjectEntity, 'id' | 'name'>>;
      responsible: Types.Maybe<Pick<Types.UserEntity, 'id' | 'fname' | 'lname'>>;
      executor: Types.Maybe<Pick<Types.UserEntity, 'id' | 'fname' | 'lname'>>;
    }
  >;
};

export type GlobalTestCasesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.TestCaseFiltersInput>;
}>;

export type GlobalTestCasesQuery = {
  testCases: Array<
    Pick<Types.TestCaseEntity, 'id' | 'criticality' | 'status'> & {
      case: Pick<
        Types.CaseEntity,
        | 'id'
        | 'name'
        | 'description'
        | 'createdAt'
        | 'templateId'
        | 'precondition'
        | 'expectedResult'
        | 'importance'
      > & {
        steps: Array<Pick<Types.StepEntity, 'id' | 'title'>>;
        tags: Array<
          Pick<Types.CaseTagsEntity, 'id'> & {
            tag: Pick<Types.TagEntity, 'id' | 'color' | 'title'>;
          }
        >;
      };
    }
  >;
};
