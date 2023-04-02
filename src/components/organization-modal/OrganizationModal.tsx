import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ORGANIZATION } from '../../apollo/mutations';
import { GET_GLOBAL_ORGANIZATIONS } from '../../apollo/queries';
import { GlobalOrganizationQuery } from '../../apollo/queries-generated-types';
import { CreateOrganizationMutation } from '../../apollo/mutations-generated-types';
import { AuthService } from '../../services/auth.service';
import { CreateModal } from '../create-modal/CreateModal';

interface IProps {
  isVisible: boolean;
  organizationInfo?: {
    id: string;
    name: string;
    description: string;
  };
  closeModal: () => void;
}

export const OrganizationModal: FC<IProps> = memo(({ isVisible, organizationInfo, closeModal }) => {
  const [createOrganizationMutation] = useMutation<CreateOrganizationMutation>(
    CREATE_ORGANIZATION,
    {
      update: (cache, { data }) => {
        const queryData = cache.readQuery<GlobalOrganizationQuery>({
          variables: { filters: { userId: AuthService.getUserId() } },
          query: GET_GLOBAL_ORGANIZATIONS,
        });

        const prevOrganizations = queryData?.organizations ?? [];
        cache.writeQuery<GlobalOrganizationQuery>({
          variables: { filters: { userId: AuthService.getUserId() } },
          query: GET_GLOBAL_ORGANIZATIONS,
          data: {
            organizations: data?.createOrganization
              ? [...prevOrganizations, data.createOrganization]
              : prevOrganizations,
          },
        });
      },
    },
  );

  const [name, setName] = useState(organizationInfo?.name ?? '');
  const [description, setDescription] = useState(organizationInfo?.description ?? '');

  useEffect(() => {
    if (!isVisible) {
      setName(organizationInfo?.name ?? '');
      setDescription(organizationInfo?.description ?? '');
    }
  }, [isVisible, organizationInfo?.description, organizationInfo?.name]);

  const createOrganization = useCallback(async () => {
    await createOrganizationMutation({
      variables: { creationData: { name, description } },
    });
    closeModal();
  }, [closeModal, createOrganizationMutation, description, name]);

  return (
    <CreateModal
      title="CreateOrganization"
      description="To create an organization, please fill in the name and description"
      nameValue={name}
      descriptionValue={description}
      setNameValue={setName}
      setDescriptionValue={setDescription}
      onCreate={createOrganization}
      {...{ isVisible, closeModal }}
    />
  );
});
