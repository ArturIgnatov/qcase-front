import { Dispatch, FC, memo, SetStateAction } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@apollo/client';
import {
  CasesSelectListQuery,
  CasesSelectListQueryVariables,
} from '../../../../apollo/queries-generated-types';
import { CASES_SELECT_LIST } from '../../../../apollo/queries';
import { EmptyPlaceholder } from '../../../../components/empty-placeholder/EmptyPlaceholder';
import { styles } from './styles';
import { TransferList } from './transfer-list/TransferList';

interface IProps {
  testCases: CasesSelectListQuery['cases'];
  organizationId: string;
  templateIds: string[];
  setTestCases: Dispatch<SetStateAction<IProps['testCases']>>;
}

export const CasesStep: FC<IProps> = memo(
  ({ organizationId, testCases, templateIds, setTestCases }) => {
    const { data, loading } = useQuery<CasesSelectListQuery, CasesSelectListQueryVariables>(
      CASES_SELECT_LIST,
      {
        fetchPolicy: 'network-only',
        variables: { filters: { templateIds } },
      },
    );

    return (
      <Box sx={styles.container}>
        {loading ? (
          <Box sx={styles.container__center}>
            <CircularProgress />
          </Box>
        ) : data?.cases.length ? (
          <Box sx={styles.container__center}>
            <TransferList cases={data.cases} {...{ testCases, setTestCases }} />
          </Box>
        ) : (
          <Box sx={styles.container__center}>
            <EmptyPlaceholder
              title="Cases list is empty"
              description="There are no cases in the selected templates. Return to the page with templates and add cases"
            />
          </Box>
        )}
      </Box>
    );
  },
);
