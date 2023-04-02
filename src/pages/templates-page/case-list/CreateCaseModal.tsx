import { FC, memo, useCallback, useState } from 'react';
import { CreateModal } from '../../../components/create-modal/CreateModal';
import { useMutation } from '@apollo/client';
import {
  CreateCaseMutation,
  CreateCaseMutationVariables,
} from '../../../apollo/mutations-generated-types';
import { CREATE_CASE } from '../../../apollo/mutations';
import { GlobalCasesQuery } from '../../../apollo/queries-generated-types';
import { GLOBAL_CASES } from '../../../apollo/queries';

interface IProps {
  templateId: string;
  isVisible: boolean;
  closeModal: () => void;
}

export const CreateCaseModal: FC<IProps> = memo(({ isVisible, templateId, closeModal }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [createCaseMutation] = useMutation<CreateCaseMutation, CreateCaseMutationVariables>(
    CREATE_CASE,
    {
      variables: { data: { name, description, templateId } },
      update(cache, { data }) {
        const queryData = cache.readQuery<GlobalCasesQuery>({
          query: GLOBAL_CASES,
          variables: { filters: { templateId } },
        });

        if (data) {
          cache.writeQuery<GlobalCasesQuery>({
            query: GLOBAL_CASES,
            variables: { filters: { templateId } },
            data: { cases: [...(queryData?.cases ?? []), data.createCase] },
          });
        }
      },
    },
  );

  const createCase = useCallback(async () => {
    await createCaseMutation();
    setDescription('');
    setName('');
    closeModal();
  }, [closeModal, createCaseMutation]);

  return (
    <CreateModal
      title="Create case"
      description="To create an case for template, please fill in the name and description"
      nameValue={name}
      descriptionValue={description}
      setNameValue={setName}
      setDescriptionValue={setDescription}
      onCreate={createCase}
      {...{ isVisible, closeModal }}
    />
  );
});
