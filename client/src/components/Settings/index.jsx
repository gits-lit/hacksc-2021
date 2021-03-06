import { useEditor } from '@craftjs/core';
import {
  Box,
  Chip,
  Grid,
  Typography,
  Button as MaterialButton,
} from '@material-ui/core';
import React from 'react';
import './style.scss';

import Customize from '../../assets/customize.svg';

export const Settings = () => {
  const { actions, selected } = useEditor((state, query) => {
    const currentNodeId = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  return selected ? (
    <div className="settings-panel">
      <Box className="GapCloser" bgcolor="rgba(0, 0, 0, 0.00)" mt={2} px={2} py={2}>
        <Grid container direction="column" spacing={0}>
          <Grid item>
            <Box pb={2}>
              <Grid className="gridline" container alignItems="center">
                <Grid item xs>
                  <img
                    height="28"
                    src={Customize}
                    alt="skrskr"
                    className="customize"
                  />
                </Grid>
                <Grid item>
                  <Chip size="small" color="primary" label={selected.name} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          {selected.settings && React.createElement(selected.settings)}
          {selected.isDeletable ? (
            <MaterialButton
              stlye={{ marginTop: '20px' }}
              variant="contained"
              color="default"
              className="DeleteSub"
              onClick={() => {
                actions.delete(selected.id);
              }}
            >
              Delete
            </MaterialButton>
          ) : (
            null
          )}
        </Grid>
      </Box>
    </div>
  ) : (
    <Title />
  );
};

const Title = () => {
  return (
    <>
      <Box className="GapCloser" bgcolor="rgba(0, 0, 0, 0.00)" mt={2} px={2} py={2}>
        <Grid container direction="column" spacing={0}></Grid>
        <Grid item>
          <Box pb={2}>
            <Grid className="gridline" container alignItems="center">
              <Grid item xs>
                <img
                  height="28"
                  src={Customize}
                  alt="skrskr"
                  className="customize"
                />
              </Grid>
              <Grid item>
                <Chip size="small" color="primary" label="Nothing Selected" />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </>
  );
};
