import { FC, memo, useCallback, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { DialogHeader } from '../../../components/dialog-header/DialogHeader';
import { MainStep } from './main-step/MainStep';
import { TagsAutoCompleteProps } from '../../../components/tags-autocomplete/TagsAutoComplete';
import { CasesStep } from './cases-step/CasesStep';
import { AdditionalInfoStep } from './addtitional-info/AdditionalInfoStep';
import { useMutation, useQuery } from '@apollo/client';
import {
  CasesSelectListQuery,
  GlobalTestsQuery,
  GlobalTestsQueryVariables,
  TemplatesSelectListQuery,
  TemplatesSelectListQueryVariables,
} from '../../../apollo/queries-generated-types';
import { GLOBAL_TESTS, TEMPLATES_SELECT_LIST } from '../../../apollo/queries';
import { useOrganizationUsers } from '../../../hooks/organization-users';
import { Add, ArrowBack, ArrowForward } from '@mui/icons-material';
import { styles } from './styles';
import { CREATE_TEST } from '../../../apollo/mutations';
import {
  CreateTestMutation,
  CreateTestMutationVariables,
} from '../../../apollo/mutations-generated-types';
import { useSnackbar } from 'notistack';

interface IProps {
  organizationId: string;
  isVisible: boolean;
  closeModal: () => void;
}

const steps = ['Main info', 'Additional info', 'Select cases'];

export const CreateTestModal: FC<IProps> = memo(({ isVisible, closeModal, organizationId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('organization');
  const [selectedTags, setSelectedTags] = useState<TagsAutoCompleteProps['selected']>([]);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [executorId, setExecutorId] = useState('');
  const [responsibleId, setResponsibleId] = useState('');
  const [testCases, setTestCases] = useState<CasesSelectListQuery['cases']>([]);
  const [createTestMutation] = useMutation<CreateTestMutation, CreateTestMutationVariables>(
    CREATE_TEST,
    {
      update(cache, { data }) {
        const queryData = cache.readQuery<GlobalTestsQuery, GlobalTestsQueryVariables>({
          query: GLOBAL_TESTS,
          variables: { filters: { organizationId } },
        });

        const prevTests = queryData?.tests ?? [];

        if (data) {
          cache.writeQuery<GlobalTestsQuery, GlobalTestsQueryVariables>({
            query: GLOBAL_TESTS,
            variables: { filters: { organizationId } },
            data: { tests: prevTests ? [...prevTests, data.createTest] : prevTests },
          });
        }
      },
    },
  );
  const { enqueueSnackbar } = useSnackbar();
  const { data: users } = useOrganizationUsers(organizationId);

  const { data: templateData } = useQuery<
    TemplatesSelectListQuery,
    TemplatesSelectListQueryVariables
  >(TEMPLATES_SELECT_LIST, {
    variables: {
      filters: {
        organizationId,
      },
    },
  });

  const handleBack = useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }, []);

  const handleAddTag = useCallback((newValue: TagsAutoCompleteProps['selected']) => {
    setSelectedTags(newValue);
  }, []);

  const handleRemoveTag = useCallback((id: string) => {
    setSelectedTags(prevState => prevState.filter(el => el.id !== id));
  }, []);

  const handleChangeProject = useCallback((event: SelectChangeEvent) => {
    setSelectedProject(event.target.value);
  }, []);

  const handleChangeResponsible = useCallback((event: SelectChangeEvent) => {
    setResponsibleId(event.target.value);
  }, []);

  const handleChangeExecutor = useCallback((event: SelectChangeEvent) => {
    setExecutorId(event.target.value);
  }, []);

  const handleChangeTemplates = useCallback(
    ({ target: { value } }: SelectChangeEvent<string[]>) => {
      setSelectedTemplates(typeof value === 'string' ? value.split(',') : value);
    },
    [],
  );

  const nextIsDisabled = useMemo(() => {
    if (activeStep === 0) {
      return !title.trim().length;
    } else {
      return !executorId || !responsibleId || !selectedTemplates.length;
    }
  }, [activeStep, executorId, responsibleId, selectedTemplates.length, title]);

  const createTest = () => {
    createTestMutation({
      variables: {
        input: {
          name: title,
          description,
          projectId: selectedProject === 'organization' ? null : selectedProject,
          executorId,
          responsibleId,
          organizationId,
          tagIds: selectedTags.map(el => el.id),
          caseIds: testCases.map(el => el.id),
        },
      },
    })
      .then(() => {
        enqueueSnackbar('Test created successfully', {
          variant: 'success',
          autoHideDuration: 3000,
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        });
        closeModal();
      })
      .catch(() => {
        enqueueSnackbar('Internal error. Please try again!', {
          variant: 'error',
          autoHideDuration: 3000,
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        });
      });
  };

  return (
    <Dialog open={isVisible} fullWidth sx={styles.dialog} maxWidth="md" onClose={closeModal}>
      <DialogHeader title="Create test" {...{ closeModal }} />
      <DialogContent sx={styles.dialog__content} dividers>
        <Box sx={styles.content}>
          <Stepper activeStep={activeStep} sx={styles.content__stepper} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 ? (
            <MainStep
              {...{
                title,
                selectedProject,
                selectedTags,
                description,
                setTitle,
                setDescription,
                organizationId,
                handleAddTag,
                handleRemoveTag,
                handleChangeProject,
              }}
            />
          ) : activeStep === 1 ? (
            <AdditionalInfoStep
              templates={templateData?.templates}
              users={users?.organizationUsers}
              {...{
                executorId,
                responsibleId,
                selectedTemplates,
                handleChangeTemplates,
                handleChangeResponsible,
                handleChangeExecutor,
              }}
            />
          ) : (
            <CasesStep
              templateIds={selectedTemplates}
              {...{ organizationId, testCases, setTestCases }}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          startIcon={<ArrowBack />}
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={styles.back__button}
        >
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button disabled={!testCases.length} endIcon={<Add />} onClick={createTest}>
            Create test
          </Button>
        ) : (
          <Button endIcon={<ArrowForward />} disabled={nextIsDisabled} onClick={handleNext}>
            Next Step
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
});
