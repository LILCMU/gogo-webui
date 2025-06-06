import { FC, useState } from "react";
import { connect } from "react-redux";
import { change_channel } from "src/redux/actions/MqttActions";

import {
  makeStyles,
  Theme,
  createStyles,
  TextField,
  Button,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

const ChannelModal: FC<any> = ({ children, ...props }) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        position: "absolute",
        // width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: "flex",
        alignItems: "center",
      },
    })
  );
  const classes = useStyles();
  const modalStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };

  const { channel, change_channel } = props;

  const [open, setOpen] = useState(false);
  const [edit_channel, setEditChannel] = useState(channel);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeChannel = () => {
    change_channel(edit_channel);
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <TextField
        id="channel"
        label="channel"
        value={edit_channel}
        onChange={({ target }) => setEditChannel(target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleChangeChannel}>
        SAVE
      </Button>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        {children}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const { mqtt } = state;
  return { channel: mqtt.channel, ...ownProps };
};
const mapDispatchToProps = { change_channel };

export default connect(mapStateToProps, mapDispatchToProps)(ChannelModal);
