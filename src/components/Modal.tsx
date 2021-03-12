import { useState, ReactNode } from "react";
import { connect } from "react-redux";
import { SwatchesPicker } from "react-color";

import {
  edit,
  EditType,
  remove,
  RemoveType,
  add,
  AddType,
} from "src/redux/actions/WidgetButtonActions";
import {
  change_channel,
  ChangeChannelType,
} from "src/redux/actions/MqttActions";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import {
  Modal,
  Backdrop,
  Fade,
  TextField,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { Stop, Delete, Save, Cancel } from "@material-ui/icons";

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

interface ModalProps {
  children?: ReactNode;
  widget?: AllWidgetButtonProps;
  widgets: Array<AllWidgetButtonProps>;
  channel: string;
  edit: EditType;
  change_channel: ChangeChannelType;
  add: AddType;
  remove: RemoveType;
  adding?: boolean;
}

const MyModal = ({
  children,
  widget,
  widgets,
  channel,
  edit,
  change_channel,
  add,
  remove,
  adding,
  ...props
}: ModalProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const [editInfo, setEditInfo] = useState({ ...widget });
  const [edit_channel, Edit_channel] = useState(channel);
  const [colorPicker, setColorPicker] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (widget !== undefined) {
      if (adding) {
        add(editInfo as AllWidgetButtonProps);
      } else {
        const index = widgets.findIndex((w) => w === widget);
        edit(index, editInfo as AllWidgetButtonProps);
      }
    } else {
      change_channel(edit_channel);
    }
    handleClose();
  };

  const handleRemove = () => {
    if (widget !== undefined) {
      const index = widgets.findIndex((w) => w === widget);
      remove(index);
      handleClose();
    }
  };

  const Picker = (
    <>
      <Spacer height="15px" />
      <TextField
        id="color"
        label="COLOR"
        value={(editInfo as CommonButtonProps).color}
        onChange={({ target }) =>
          setEditInfo({ ...editInfo, color: target.value })
        }
        disabled
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Stop
                style={{
                  color: (editInfo as CommonButtonProps).color,
                  fontSize: "25px",
                }}
              />
            </InputAdornment>
          ),
        }}
        onClick={() => setColorPicker(true)}
      />
      {colorPicker && (
        <SwatchesPicker
          onChange={(color) => {
            setEditInfo({ ...editInfo, color: color.hex });
            setColorPicker(false);
          }}
        />
      )}
    </>
  );

  const editContent = () => {
    // editing Widget
    if (widget !== undefined) {
      let Widget: ReactNode = null;
      switch (widget.type) {
        case "common":
          Widget = (
            <>
              <TextField
                id="text"
                label="TEXT"
                value={(editInfo as CommonButtonProps).text}
                onChange={({ target }) =>
                  setEditInfo({ ...editInfo, text: target.value })
                }
                style={{ width: "100%" }}
              />
              {Picker}
            </>
          );
          break;
        case "status":
          Widget = (
            <>
              <TextField
                id="text"
                label="TEXT"
                style={{ width: "100%" }}
                value={(editInfo as StatusProps).text}
                onChange={({ target }) =>
                  setEditInfo({ ...editInfo, text: target.value })
                }
              />
              {Picker}
            </>
          );
          break;
        case "toggle":
          Widget = (
            <>
              <TextField
                id="text"
                label="TEXT"
                style={{ width: "100%" }}
                value={(editInfo as ToggleProps).text}
                onChange={({ target }) =>
                  setEditInfo({ ...editInfo, text: target.value })
                }
              />
              {Picker}
            </>
          );
          break;
        case "display":
          Widget = (
            <>
              <TextField
                id="text"
                label="TEXT"
                value={(editInfo as CommonButtonProps).text}
                onChange={({ target }) =>
                  setEditInfo({ ...editInfo, text: target.value })
                }
                style={{ width: "100%" }}
              />
              {Picker}
            </>
          );
          break;
        case "input":
          Widget = (
            <>
              <TextField
                id="text"
                label="TEXT"
                value={(editInfo as CommonButtonProps).text}
                onChange={({ target }) =>
                  setEditInfo({ ...editInfo, text: target.value })
                }
                style={{ width: "100%" }}
              />
              {Picker}
            </>
          );
          break;
        case "pad":
          Widget = (
            <>
              <TextField
                style={{ width: "100%" }}
                id="up"
                label="UP"
                value={(editInfo as PadProps).up}
                onChange={({ target }) =>
                  setEditInfo({ ...editInfo, up: target.value })
                }
              />
              <Spacer height="15px" />
              <TextField
                style={{ width: "100%" }}
                id="down"
                label="DOWN"
                value={(editInfo as PadProps).down}
                onChange={({ target }) =>
                  setEditInfo({ ...editInfo, down: target.value })
                }
              />
              <Spacer height="15px" />
              <TextField
                style={{ width: "100%" }}
                id="left"
                label="LEFT"
                value={(editInfo as PadProps).left}
                onChange={({ target }) =>
                  setEditInfo({ ...editInfo, left: target.value })
                }
              />
              <Spacer height="15px" />
              <TextField
                style={{ width: "100%" }}
                id="right"
                label="RIGHT"
                value={(editInfo as PadProps).right}
                onChange={({ target }) =>
                  setEditInfo({ ...editInfo, right: target.value })
                }
              />
            </>
          );
          break;
      }
      return Widget;
    } else {
      // change channel
      return (
        <TextField
          id="channel"
          label="channel"
          value={edit_channel}
          onChange={({ target }) => Edit_channel(target.value)}
        />
      );
    }
  };

  const ButtonsContent = () => {
    if (widget !== undefined) {
      return (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            startIcon={<Save />}
            fullWidth
          >
            {adding ? "Add" : "SAVE"}
          </Button>
          <Spacer height="15px" />

          {!adding ? (
            <>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                startIcon={<Delete />}
                onClick={handleRemove}
              >
                Delete
              </Button>
              <Spacer height="15px" />
            </>
          ) : null}

          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            startIcon={<Cancel />}
            fullWidth
          >
            Cancel
          </Button>
        </>
      );
    } else {
      return (
        <Button variant="contained" color="primary" onClick={handleSave}>
          SAVE
        </Button>
      );
    }
  };

  return (
    <div {...props}>
      {/* Modal Opener */}
      <button type="button" onClick={handleOpen}>
        {children}
      </button>
      {/* Modal Opener */}
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
            {editContent()}
            <Spacer height="25px" />
            {ButtonsContent()}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: AppStateProps, ownProps: any) => {
  const { widgets } = state.widget;
  const { channel } = state.mqtt;
  return { widgets, channel, ...ownProps };
};

const mapDispatchToProps = {
  edit,
  change_channel,
  add,
  remove,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyModal);
