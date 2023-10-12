import { Component, MouseEvent, PropsWithChildren } from 'react';
import { Fade, Menu } from '@mui/material';

interface IProps {
  id: string;
}

interface IState {
  anchorEl: null | HTMLElement;
}

export class AppMenu extends Component<PropsWithChildren<IProps>, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  public openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  public closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { id, children } = this.props;
    const { anchorEl } = this.state;
    const { closeMenu } = this;
    const open = Boolean(anchorEl);

    return (
      <Menu
        elevation={1}
        id={id}
        anchorEl={anchorEl}
        open={open}
        TransitionComponent={Fade}
        onClose={closeMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          sx: {
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 2.5,
            color: theme => theme.palette.text.secondary,
          },
        }}
      >
        {children}
      </Menu>
    );
  }
}
