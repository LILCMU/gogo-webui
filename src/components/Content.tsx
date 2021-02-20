import { Fragment, useState } from "react";
import { CommonButton, Modal, Pad, Spacer, Status } from ".";
import EditIcon from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";

const Content = () => {
  const [editing, setEditing] = useState(false);
  const [buttonList, setButtonList] = useState([
    pad,
    CommonButton1,
    CommonButton2,
    status1,
  ]);

  const updateList = (index: number, button: CommonButtonProps | PadProps) => {
    const newList = buttonList;
    newList[index] = button;
    setButtonList(newList);
  };

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
      backgroundColor: theme.palette.primary.light,
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[600],
      },
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
      {buttonList.map((button, index) => {
        let actionButton: React.ReactNode;
        const { type } = button;
        if (type === "pad") {
          actionButton = <Pad {...(button as PadProps)} disable={editing} />;
        } else if (type === "common") {
          actionButton = (
            <CommonButton
              {...(button as CommonButtonProps)}
              disable={editing}
            />
          );
        } else if (type === "status") {
          actionButton = (
            <Status {...(button as StatusProps)} disable={editing} />
          );
        }

        if (editing) {
          return (
            <Modal index={index} update={updateList} {...button}>
              <Fragment key={index}>
                {actionButton}
                {index + 1 !== buttonList.length && <Spacer height="25px" />}
              </Fragment>
            </Modal>
          );
        } else {
          return (
            <Fragment key={index}>
              {actionButton}
              {index + 1 !== buttonList.length && <Spacer height="25px" />}
            </Fragment>
          );
        }
      })}
      {/* <Pad />
      <Spacer height="25px" />
      <CommonButton text="Start" color="" />
      <Spacer height="25px" />
      <CommonButton text="Stop" /> */}
      {fabs.map((fab, index) => (
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
            // color={fab.color}
          >
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </div>
  );
};
export default Content;

const pad: PadProps = {
  // index: 0,
  type: "pad",
  up: "up",
  down: "down",
  left: "left",
  right: "right",
};

const CommonButton1: CommonButtonProps = {
  // index: 1,
  type: "common",
  text: "Start",
  color: "#2ecc71",
  textColor: "white",
};

const CommonButton2: CommonButtonProps = {
  // index: 2,
  type: "common",
  text: "Stop",
  color: "#e74c3c",
  textColor: "white",
};

const status1: StatusProps = {
  type: "status",
  text: "led",
};
