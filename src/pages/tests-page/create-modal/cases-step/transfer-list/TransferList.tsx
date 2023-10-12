import { Dispatch, FC, memo, SetStateAction, useCallback, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { CustomList } from './CustomList';
import { CasesSelectListQuery } from '../../../../../apollo/queries-generated-types';

interface IProps {
  cases: CasesSelectListQuery['cases'];
  testCases: CasesSelectListQuery['cases'];
  setTestCases: Dispatch<SetStateAction<IProps['cases']>>;
}

export const TransferList: FC<IProps> = memo(({ cases, testCases, setTestCases }) => {
  const [allCases, setAllCases] = useState<IProps['testCases']>([...cases]);
  const [rightSelected, setRightSelected] = useState<string[]>([]);
  const [leftSelected, setLeftSelected] = useState<string[]>(cases.map(el => el.id));

  const onSelectLeft = useCallback((id: string) => {
    setLeftSelected(prevState =>
      prevState.includes(id) ? prevState.filter(el => el !== id) : [...prevState, id],
    );
  }, []);

  const onSelectRight = useCallback((id: string) => {
    setRightSelected(prevState =>
      prevState.includes(id) ? prevState.filter(el => el !== id) : [...prevState, id],
    );
  }, []);

  const transferLeftSelected = useCallback(() => {
    const { transfer, stay } = allCases.reduce<{
      stay: IProps['testCases'];
      transfer: IProps['testCases'];
    }>(
      (acc, item) => {
        if (leftSelected.includes(item.id)) {
          acc.transfer.push(item);
        } else {
          acc.stay.push(item);
        }
        return acc;
      },
      { stay: [], transfer: [] },
    );

    setTestCases(prev => [...prev, ...transfer]);
    setAllCases(stay);
    setLeftSelected([]);
  }, [allCases, leftSelected, setTestCases]);

  const transferRightSelected = useCallback(() => {
    const { transfer, stay } = testCases.reduce<{
      stay: IProps['testCases'];
      transfer: IProps['testCases'];
    }>(
      (acc, item) => {
        if (rightSelected.includes(item.id)) {
          acc.transfer.push(item);
        } else {
          acc.stay.push(item);
        }
        return acc;
      },
      { stay: [], transfer: [] },
    );

    setTestCases(stay);
    setAllCases(prev => [...prev, ...transfer]);
    setRightSelected([]);
  }, [rightSelected, setTestCases, testCases]);

  const handleAllCheckedLeft = useCallback(() => {
    if (allCases.length === leftSelected.length) {
      setLeftSelected([]);
    } else {
      setLeftSelected(allCases.map(el => el.id));
    }
  }, [allCases, leftSelected.length]);

  const handleAllCheckedRight = useCallback(() => {
    if (testCases.length === rightSelected.length) {
      setRightSelected([]);
    } else {
      setRightSelected(testCases.map(el => el.id));
    }
  }, [rightSelected.length, testCases]);

  return (
    <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
      <Grid item>
        <CustomList
          title="All cases"
          items={allCases}
          selected={leftSelected}
          onSelect={onSelectLeft}
          handleSelectAll={handleAllCheckedLeft}
        />
      </Grid>
      <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={transferLeftSelected}
          disabled={leftSelected.length === 0}
          aria-label="move selected right"
        >
          &gt;
        </Button>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={transferRightSelected}
          disabled={rightSelected.length === 0}
          aria-label="move selected left"
        >
          &lt;
        </Button>
      </Grid>
      <Grid item>
        <CustomList
          title="Cases for test"
          items={testCases}
          selected={rightSelected}
          onSelect={onSelectRight}
          handleSelectAll={handleAllCheckedRight}
        />
      </Grid>
    </Grid>
  );
});
