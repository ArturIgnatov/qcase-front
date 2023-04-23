import { FC, memo, useCallback, useState } from 'react';
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
import { useQuery } from '@apollo/client';
import {
  TemplatesSelectListQuery,
  TemplatesSelectListQueryVariables,
} from '../../../apollo/queries-generated-types';
import { TEMPLATES_SELECT_LIST } from '../../../apollo/queries';

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

  const handleChangeTemplates = useCallback(
    ({ target: { value } }: SelectChangeEvent<string[]>) => {
      setSelectedTemplates(typeof value === 'string' ? value.split(',') : value);
    },
    [],
  );

  console.log('selectedTemplates', selectedTemplates);
  return (
    <Dialog
      open={isVisible}
      fullWidth
      sx={{ '& .MuiDialog-paper': { minHeight: 650 } }}
      maxWidth="md"
      onClose={closeModal}
    >
      <DialogHeader title="Create test" {...{ closeModal }} />
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
          <Stepper activeStep={activeStep} sx={{ minWidth: '50%' }} alternativeLabel>
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
              {...{ handleChangeTemplates, selectedTemplates }}
            />
          ) : (
            <CasesStep {...{ organizationId }} templateIds={selectedTemplates} />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Create test' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
