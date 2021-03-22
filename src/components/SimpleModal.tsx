import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

interface SimpleModalProps {
  Save?: (name: string, description: string) => void;
  project?: SavedProject;
  Update?: (key: string, name: string, description: string) => void;
  Remove?: () => void;
  NewProject?: () => void;
}

const SimpleModal: React.FC<SimpleModalProps> = ({
  children,
  Save,
  project,
  Update,
  Remove,
  NewProject,
}) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(project ? project.name : "");
  const [description, setDescription] = React.useState(
    project ? project.description : ""
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (!project) {
      Save && Save(name, description);
    } else {
      Update && Update(project.key, name, description);
    }
    handleClose();
  };

  const handleRemove = () => {
    Remove && Remove();
    handleClose();
  };

  const handleNewProject = () => {
    NewProject && NewProject();
    handleClose();
  };

  const saveContent = () => {
    return (
      <div className={classes.paper}>
        <Typography
          variant="body1"
          color="textPrimary"
          style={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          {project ? "Editing Project..." : "Save as New Project..."}
        </Typography>
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
          required
        />
        <TextField
          id="description"
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "15px" }}
          onClick={handleSave}
          fullWidth
        >
          SAVE
        </Button>
      </div>
    );
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        {children}
      </button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <>
          <div>{(Save || (Update && project)) && saveContent()}</div>
          {((Remove && project) || NewProject) && (
            <div className={classes.paper}>
              <Typography
                variant="h5"
                color="initial"
                style={{ marginBottom: "20px" }}
              >
                {Remove && project
                  ? `Delete "${project.name} Project?"`
                  : "Discard all unsaved widgets?"}
              </Typography>
              <div style={{ display: "flex" }}>
                <Button
                  variant={Remove ? "text" : "contained"}
                  color={Remove ? "secondary" : "primary"}
                  onClick={Remove ? handleRemove : handleNewProject}
                >
                  {Remove ? "Delete" : "Okay"}
                </Button>
                <Button
                  variant={Remove ? "text" : "contained"}
                  color={Remove ? "primary" : "secondary"}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </>
      </Modal>
    </div>
  );
};

export default SimpleModal;
