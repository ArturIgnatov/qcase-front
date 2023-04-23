import { FC, Ref, forwardRef, ReactElement } from 'react';
import { AppBar, Dialog, IconButton, Toolbar, Slide, Typography, Button, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { SearchInput } from '../../../components/search-input/SearchInput';
import { useQuery } from '@apollo/client';
import { GLOBAL_CASES } from '../../../apollo/queries';
import { CaseList } from '../case-list/CaseList';
import {
  GlobalCasesQuery,
  GlobalCasesQueryVariables,
} from '../../../apollo/queries-generated-types';
import { CreateCaseModal } from '../case-list/CreateCaseModal';
import { useModalVisible } from '../../../hooks/modal-visible';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  title: string;
  templateId: string;
  organizationId: string;
  isVisible: boolean;
  closeModal: () => void;
}

export const TemplateModal: FC<IProps> = ({
  isVisible,
  templateId,
  organizationId,
  closeModal,
  title,
}) => {
  const {
    isVisible: createModalVisible,
    closed: createModalClosed,
    closeModal: closeCreateModal,
    openModal: openCreateModal,
  } = useModalVisible();

  const { data, loading } = useQuery<GlobalCasesQuery, GlobalCasesQueryVariables>(GLOBAL_CASES, {
    fetchPolicy: 'network-only',
    variables: { filters: { templateIds: [templateId] } },
  });

  return (
    <Dialog
      hideBackdrop
      fullScreen
      open={isVisible}
      onClose={closeModal}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'fixed', pl: 4, pr: 4 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={closeModal} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 4, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
          <Box sx={{ mr: 10 }}>
            <SearchInput />
          </Box>
          <Button autoFocus size="small" variant="contained" onClick={openCreateModal}>
            Create case
          </Button>
        </Toolbar>
      </AppBar>
      <CaseList cases={data?.cases} {...{ loading }} />
      {!createModalClosed && (
        <CreateCaseModal
          isVisible={createModalVisible}
          closeModal={closeCreateModal}
          {...{ templateId, organizationId }}
        />
      )}
    </Dialog>
  );
};
