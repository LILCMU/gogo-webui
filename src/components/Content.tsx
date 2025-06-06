import { FC, Fragment, useState } from "react";
import { connect } from "react-redux";

import clsx from "clsx";
import EditIcon from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import Code from "@material-ui/icons/Code";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import {
  ChannelModal,
  CommonButton,
  Modal as MyModal,
  Pad,
  Spacer,
  Status,
} from ".";

const Content: FC<any> = (props) => {
  const { widgets } = props;

  const [editing, setEditing] = useState(false);

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
      position: "absolute",
      right: theme.spacing(2),
      bottom: theme.spacing(11),
      backgroundColor: theme.palette.grey[200],
    },
  }));

  const classes = useStyles();

  const fabs = [
    {
      className: classes.fab,
      icon: <EditIcon />,
      label: "Edit",
    },
    {
      color: "default",
      className: clsx(classes.fab, classes.fabGreen),
      icon: <Check />,
      label: "Done",
    },
    {
      color: "default",
      className: clsx(classes.fabChannel),
      icon: <Code />,
      label: "Done",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        marginTop: -75,
      }}
    >
      {widgets.map((widget: AllWidgetButtonProps, index: number) => {
        let actionButton: React.ReactNode;
        const { type } = widget;
        if (type === "pad") {
          actionButton = <Pad {...(widget as PadProps)} disable={editing} />;
        } else if (type === "common") {
          actionButton = (
            <CommonButton
              {...(widget as CommonButtonProps)}
              disable={editing}
            />
          );
        } else if (type === "status") {
          actionButton = (
            <Status {...(widget as StatusProps)} disable={editing} />
          );
        }

        if (editing) {
          return (
            <MyModal index={index} {...widget}>
              <Fragment key={index}>
                {actionButton}
                {index + 1 !== widgets.length && <Spacer height="25px" />}
              </Fragment>
            </MyModal>
          );
        } else {
          return (
            <Fragment key={index}>
              {actionButton}
              {index + 1 !== widgets.length && <Spacer height="25px" />}
            </Fragment>
          );
        }
      })}
      {fabs.map((fab, index) => (
        <>
          <Zoom
            key={index}
            in={editing && index === 2}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${editing ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <ChannelModal>
              <Fab
                aria-label={fab.label}
                className={fab.className}
                onClick={() => {}}
              >
                {fab.icon}
              </Fab>
            </ChannelModal>
          </Zoom>
          <Zoom
            key={index}
            in={(!editing && index === 0) || (editing && index === 1)}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${editing ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <Fab
              aria-label={fab.label}
              className={fab.className}
              onClick={() => setEditing(!editing)}
            >
              {fab.icon}
            </Fab>
          </Zoom>
        </>
      ))}
    </div>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const { widgets } = state;
  return { widgets, ...ownProps };
};

export default connect(mapStateToProps, null)(Content);
