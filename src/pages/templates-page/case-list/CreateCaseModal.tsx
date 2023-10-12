import { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import { CreateModal } from '../../../components/create-modal/CreateModal';
import { useMutation, useQuery } from '@apollo/client';
import {
  CreateCaseMutation,
  CreateCaseMutationVariables,
} from '../../../apollo/mutations-generated-types';
import { CREATE_CASE } from '../../../apollo/mutations';
import {
  GlobalCasesQuery,
  GlobalCasesQueryVariables,
  GlobalTagsQuery,
  GlobalTagsQueryVariables,
} from '../../../apollo/queries-generated-types';
import { GLOBAL_CASES, GLOBAL_TAGS } from '../../../apollo/queries';
import {
  TagsAutoComplete,
  TagsAutoCompleteProps,
} from '../../../components/tags-autocomplete/TagsAutoComplete';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { CaseImportance } from '../../../apollo/app-schema';

interface IProps {
  templateId: string;
  organizationId: string;
  isVisible: boolean;
  closeModal: () => void;
}

export const CreateCaseModal: FC<IProps> = memo(
  ({ isVisible, templateId, organizationId, closeModal }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [expectedResult, setExpectedResult] = useState('');
    const [precondition, setPrecondition] = useState('');
    const [steps, setSteps] = useState<Array<{ id: number; value: string }>>([]);
    const [selectedTags, setSelectedTags] = useState<TagsAutoCompleteProps['selected']>([]);
    const [importance, setImportance] = useState(CaseImportance.LOW);
    const maxResultSize = 100;
    const maxStepSize = 60;

    const { data: tagsData } = useQuery<GlobalTagsQuery, GlobalTagsQueryVariables>(GLOBAL_TAGS, {
      variables: { filters: { organizationId } },
    });

    const [createCaseMutation] = useMutation<CreateCaseMutation, CreateCaseMutationVariables>(
      CREATE_CASE,
      {
        update(cache, { data }) {
          const queryData = cache.readQuery<GlobalCasesQuery, GlobalCasesQueryVariables>({
            query: GLOBAL_CASES,
            variables: { filters: { templateIds: [templateId] } },
          });

          if (data) {
            cache.writeQuery<GlobalCasesQuery, GlobalCasesQueryVariables>({
              query: GLOBAL_CASES,
              variables: { filters: { templateIds: [templateId] } },
              data: { cases: [...(queryData?.cases ?? []), data.createCase] },
            });
          }
        },
      },
    );

    const createCase = useCallback(async () => {
      await createCaseMutation({
        variables: {
          data: {
            name,
            description,
            templateId,
            precondition,
            expectedResult,
            importance: CaseImportance.LOW,
            tagIds: selectedTags.map(el => el.id),
            steps: steps.map(el => el.value),
          },
        },
      });
      closeModal();
    }, [
      closeModal,
      createCaseMutation,
      description,
      expectedResult,
      name,
      precondition,
      selectedTags,
      steps,
      templateId,
    ]);

    const handleSetExpectedResult = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
      if (target.value.trim().length > maxResultSize) {
        return;
      }
      setExpectedResult(target.value);
    }, []);

    const handleSetPrecondition = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
      if (target.value.trim().length > maxResultSize) {
        return;
      }
      setPrecondition(target.value);
    }, []);

    const handleSetTag = useCallback((newValue: TagsAutoCompleteProps['selected']) => {
      setSelectedTags(newValue);
    }, []);

    const handleSetStep = useCallback(
      ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
        if (target.value.trim().length > maxStepSize) {
          return;
        }
        setSteps(prevState =>
          prevState.map(el => (el.id === id ? { id, value: target.value } : el)),
        );
      },
      [],
    );

    const addStep = useCallback(() => {
      setSteps(prevState => [...prevState, { id: Date.now(), value: '' }]);
    }, []);

    const removeStep = useCallback((id: number) => {
      setSteps(prevState => prevState.filter(el => el.id !== id));
    }, []);

    const handleRemoveTag = useCallback((id: string) => {
      setSelectedTags(prevState => prevState.filter(el => el.id !== id));
    }, []);

    const handleChangeImportance = useCallback((event: SelectChangeEvent) => {
      setImportance(event.target.value as CaseImportance);
    }, []);

    return (
      <CreateModal
        title="Create case"
        description="To create an case for template, please fill in the name and description"
        nameValue={name}
        descriptionValue={description}
        setNameValue={setName}
        setDescriptionValue={setDescription}
        onCreate={createCase}
        maxNameValue={50}
        maxWidth="sm"
        {...{ isVisible, closeModal }}
      >
        <Stack spacing={4}>
          <TextField
            value={precondition}
            margin="dense"
            id="name"
            sx={{ mt: 4 }}
            label="Precondition"
            fullWidth
            maxRows={4}
            multiline
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{`${
                  precondition.trim().length
                } / ${maxResultSize}`}</InputAdornment>
              ),
            }}
            onChange={handleSetPrecondition}
          />
          <TextField
            value={expectedResult}
            margin="dense"
            id="name"
            label="Expected Result"
            fullWidth
            maxRows={4}
            multiline
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{`${
                  expectedResult.trim().length
                } / ${maxResultSize}`}</InputAdornment>
              ),
            }}
            onChange={handleSetExpectedResult}
          />
          <FormControl fullWidth>
            <InputLabel id="project-label">Importance</InputLabel>
            <Select
              labelId="project-label"
              id="importance"
              value={importance}
              label="Importance"
              onChange={handleChangeImportance}
            >
              {Object.values(CaseImportance).map(el => (
                <MenuItem key={el} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TagsAutoComplete
            tags={tagsData?.tags}
            selected={selectedTags}
            onSetTag={handleSetTag}
            onRemoveTag={handleRemoveTag}
          />
        </Stack>
        <Stack>
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Button color="info" startIcon={<Add />} onClick={addStep}>
              Add step
            </Button>
          </Stack>
          {steps.map((el, idx) => (
            <Stack spacing={4} direction="row" key={idx} alignItems="center">
              <TextField
                id="name"
                value={el.value}
                margin="dense"
                label={`Step ${idx + 1}`}
                fullWidth
                size="small"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">{`${
                      el.value.trim().length
                    } / ${maxStepSize}`}</InputAdornment>
                  ),
                }}
                onChange={event => handleSetStep(event, el.id)}
              />
              <IconButton size="small" color="error" onClick={() => removeStep(el.id)}>
                <Remove />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </CreateModal>
    );
  },
);
