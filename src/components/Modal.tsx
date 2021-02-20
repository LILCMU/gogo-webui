import React, { FC, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Spacer } from ".";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      // border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4, 5, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

const MyModal: FC<
  (CommonButtonProps | PadProps) & {
    index: number;
    update: (index: number, button: CommonButtonProps | PadProps) => void;
  }
> = ({ children, ...props }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { up, down, left, right } = props as PadProps;
  const { text, type, color } = props as CommonButtonProps;

  const [edit_text, setText] = useState(text);
  const [edit_up, setUp] = useState(up);
  const [edit_down, setDown] = useState(down);
  const [edit_left, setLeft] = useState(left);
  const [edit_right, setRight] = useState(right);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        {/* react-transition-group */}
        {/* {/* Modal Opener */}
        {children}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {/* <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p> */}
            {type === "pad" ? (
              <>
                <TextField
                  id="up"
                  label="up"
                  value={edit_up}
                  onChange={({ target }) => setUp(target.value)}
                />
                <Spacer height="15px" />
                <TextField
                  id="down"
                  label="down"
                  value={edit_down}
                  onChange={({ target }) => setDown(target.value)}
                />
                <Spacer height="15px" />
                <TextField
                  id="left"
                  label="left"
                  value={edit_left}
                  onChange={({ target }) => setLeft(target.value)}
                />
                <Spacer height="15px" />
                <TextField
                  id="right"
                  label="right"
                  value={edit_right}
                  onChange={({ target }) => setRight(target.value)}
                />
              </>
            ) : (
              <>
                <TextField
                  id="text"
                  label="text"
                  value={edit_text}
                  onChange={({ target }) => setText(target.value)}
                />
              </>
            )}
            {/* <div
              style={{
                // display: "flex",
                // flexDirection: "row",
                // alignItems: "center",
                // justifyContent: "center",
                marginTop: "15px",
              }}
            > */}
            <Spacer height="25px" />

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const { index, update } = props;
                if (type === "pad") {
                  update(index, {
                    up: edit_up,
                    down: edit_down,
                    left: edit_left,
                    right: edit_right,
                    type,
                  });
                } else if (type === "common" || type === "status") {
                  update(index, { type, text: edit_text, color });
                }
                handleClose();
              }}
              fullWidth
            >
              SAVE
            </Button>
            <Spacer height="15px" />

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleClose}
            >
              Cancel
            </Button>
            {/* </div> */}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default MyModal;
