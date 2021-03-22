import React, { useCallback, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Modal, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      // position: "absolute",
      // width: 400,
      backgroundColor: theme.palette.background.paper,
      borderRadius: `${theme.spacing(1)}px`,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(3, 4, 3),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

interface AlertModalProps {
  alertText: string;
  setAlert: React.Dispatch<
    React.SetStateAction<{ visible: boolean; text: string; duration: number }>
  >;
  duration: number;
  profile?: ProfileProps;
}

const AlertModal: React.FC<AlertModalProps> = ({
  alertText,
  setAlert,
  duration,
  profile,
}) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  const [open, setOpen] = React.useState(true);

  const handleClose = useCallback(() => {
    setOpen(false);
    setAlert({ visible: false, text: "", duration: 0 });
  }, [setAlert]);

  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, duration);
  }, [duration, handleClose]);

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          {profile ? (
            <>
              <AccountCircle
                style={{ height: "125px", width: "125px" }}
                color="primary"
              />
              <Typography variant="body1" color="initial">
                {profile.providerId.includes("google") && "Google Account"}
                {profile.providerId.includes("microsoft") &&
                  "Microsoft Account"}
                {profile.providerId.includes("facebook") && "Facebook Account"}
              </Typography>
              <Typography
                variant="h6"
                color="initial"
                style={{ marginTop: 20 }}
              >
                {profile.displayName}
              </Typography>
              <Typography variant="body1" color="initial">
                {profile.email}
              </Typography>
              {/* <Avatar style={{ height: "125px", width: "125px" }}>
                <Person />
              </Avatar> */}
            </>
          ) : (
            <Typography variant="h6" color="initial">
              {alertText ? alertText : "Please login First"}
            </Typography>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AlertModal;
