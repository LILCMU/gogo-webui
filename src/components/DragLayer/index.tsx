import { FC, useState, createContext } from "react";

import Container from "./Container";
import DragPreviewLayer from "./DragPreviewLayer";
import WidgetDrawer from "./WidgetDrawer";
import { Modal } from "..";

import clsx from "clsx";
import { Edit, Check, Code, Add } from "@material-ui/icons";
import { Fab, makeStyles, useTheme, Zoom, Tooltip } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const renderContext = createContext<Partial<{ render(): any }>>({});

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
      zIndex: 9999,
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
    fabAdd: {
      bottom: theme.spacing(20),
    },
  }));

  const classes = useStyles();

  const [editing, setEditing] = useState<boolean>(false);
  const [editModeVisible, setEditModeVisible] = useState(false);
  const [DrawerVisible, setDrawerVisible] = useState<boolean>(false);

  const renderer = () => {
    setEditing(false);
    setTimeout(() => {
      setEditing(true);
    }, 100);
  };

  return (
    <renderContext.Provider
      value={{
        render: renderer,
      }}
    >
      <div style={{ position: "relative" }}>
        <Container editing={editing} gridVisible={editModeVisible} />
        <DragPreviewLayer />

        {/* Floating Action Buttons */}

        {/* Edit Icon */}
        <Zoom
          in={!editModeVisible}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              editModeVisible ? transitionDuration.exit : 0
            }ms`,
          }}
          unmountOnExit
        >
          <Tooltip title="Edit">
            <Fab
              aria-label="Edit"
              className={classes.fab}
              onClick={() => {
                setEditing(true);
                setEditModeVisible(true);
                renderer();
              }}
            >
              <Edit />
            </Fab>
          </Tooltip>
        </Zoom>
        {/* Edit Icon */}

        {/* Green Check Icon */}
        <Zoom
          in={editModeVisible}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              editModeVisible ? transitionDuration.exit : 0
            }ms`,
          }}
          unmountOnExit
        >
          <Tooltip title="Done">
            <Fab
              aria-label="Done"
              className={clsx(classes.fab, classes.fabGreen)}
              onClick={() => {
                setEditing(false);
                setEditModeVisible(false);
                setDrawerVisible(false);
              }}
            >
              <Check />
            </Fab>
          </Tooltip>
        </Zoom>
        {/* Green Check Icon */}

        {/* Channel Edit Icon */}
        {/* TODO: FIX height glint after added modal */}
        <Zoom
          in={editModeVisible}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              editModeVisible ? transitionDuration.exit : 0
            }ms`,
          }}
        >
          <Tooltip title="Channel">
            <Fab
              aria-label="Channel"
              className={clsx(classes.fab, classes.fabChannel)}
            >
              {editing && (
                <Modal style={{ position: "relative" }}>
                  <Code />
                </Modal>
              )}
            </Fab>
          </Tooltip>
        </Zoom>
        {/* Channel Edit Icon */}

        {/* Add Icon */}
        <Zoom
          in={editModeVisible}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              editModeVisible ? transitionDuration.exit : 0
            }ms`,
          }}
        >
          <Tooltip title="Add Widget">
            <Fab
              aria-label="Add"
              className={clsx(classes.fab, classes.fabAdd)}
              onClick={() => {}}
            >
              <WidgetDrawer
                visible={DrawerVisible}
                setVisible={setDrawerVisible}
              >
                <Add />
              </WidgetDrawer>
            </Fab>
          </Tooltip>
        </Zoom>
        {/* Add Icon */}
      </div>
    </renderContext.Provider>
  );
};

export default DragLayer;
