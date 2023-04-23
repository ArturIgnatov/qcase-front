import { FC, memo } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@apollo/client';
import {
  GlobalCasesQuery,
  GlobalCasesQueryVariables,
} from '../../../../apollo/queries-generated-types';
import { GLOBAL_CASES } from '../../../../apollo/queries';

interface IProps {
  organizationId: string;
  templateIds: string[];
}

export const CasesStep: FC<IProps> = memo(({ organizationId, templateIds }) => {
  const { data, loading } = useQuery<GlobalCasesQuery, GlobalCasesQueryVariables>(GLOBAL_CASES, {
    fetchPolicy: 'network-only',
    variables: { filters: { templateIds } },
  });

  return (
    <Box>
      <Box />
    </Box>
  );
});
