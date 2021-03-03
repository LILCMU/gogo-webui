import { FC, useState } from "react";
import Container from "./Container";
import DragPreviewLayer from "./DragPreviewLayer";

import clsx from "clsx";
import { Edit, Check, Code, Add } from "@material-ui/icons";
import { Fab, makeStyles, useTheme, Zoom, Tooltip } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const DragLayer: FC = () => {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const useStyles = makeStyles((theme) => ({
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      backgroundColor: theme.palette.grey[200],
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[600],
      },
    },
    fabChannel: {
      bottom: theme.spacing(11),
    },
    fabMove: {
      bottom: theme.spacing(20),
    },
  }));

  const classes = useStyles();

  const [editing, setEditing] = useState<boolean>(false);

  return (
    <div style={{ position: "relative" }}>
      <Container editing={editing} />
      <DragPreviewLayer />

      {/* Floating Action Buttons */}

      {/* Edit Icon */}
      <Zoom
        in={!editing}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${editing ? transitionDuration.exit : 0}ms`,
        }}
        unmountOnExit
      >
        <Tooltip title="Edit">
          <Fab
            aria-label="Edit"
            className={classes.fab}
            onClick={() => setEditing(true)}
          >
            <Edit />
          </Fab>
        </Tooltip>
      </Zoom>
      {/* Edit Icon */}

      {/* Green Check Icon */}
      <Zoom
        in={editing}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${editing ? transitionDuration.exit : 0}ms`,
        }}
        unmountOnExit
      >
        <Tooltip title="Done">
          <Fab
            aria-label="Done"
            className={clsx(classes.fab, classes.fabGreen)}
            onClick={() => setEditing(false)}
          >
            <Check />
          </Fab>
        </Tooltip>
      </Zoom>
      {/* Green Check Icon */}

      {/* Channel Edit Icon */}
      <Zoom
        in={editing}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${editing ? transitionDuration.exit : 0}ms`,
        }}
      >
        <Tooltip title="Channel">
          <Fab
            aria-label="Channel"
            className={clsx(classes.fab, classes.fabChannel)}
            onClick={() => {}}
          >
            <Code />
          </Fab>
        </Tooltip>
      </Zoom>
      {/* Channel Edit Icon */}

      {/* Move Icon */}
      <Zoom
        in={editing}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${editing ? transitionDuration.exit : 0}ms`,
        }}
      >
        <Tooltip title="Add Widget">
          <Fab
            aria-label="Move"
            className={clsx(classes.fab, classes.fabMove)}
            onClick={() => {}}
          >
            <Add />
          </Fab>
        </Tooltip>
      </Zoom>
      {/* Move Icon */}
    </div>
  );
};

export default DragLayer;
