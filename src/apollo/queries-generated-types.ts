import * as Types from './app-schema';

export type GlobalUserQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type GlobalUserQuery = { user: Pick<Types.UserEntity, 'id' | 'fname' | 'lname'> };

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
    Pick<Types.TemplateEntity, 'id' | 'name' | 'description' | 'createdAt' | 'organizationId'>
  >;
};

export type GlobalCasesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.CaseFiltersInput>;
}>;

export type GlobalCasesQuery = {
  cases: Array<Pick<Types.CaseEntity, 'id' | 'name' | 'description' | 'createdAt' | 'templateId'>>;
};

export type GlobalTagsQueryVariables = Types.Exact<{
  filters: Types.TagFiltersInput;
}>;

export type GlobalTagsQuery = {
  tags: Array<Pick<Types.TagEntity, 'id' | 'title' | 'color' | 'organizationId'>>;
};
