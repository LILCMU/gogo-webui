import { FC, useState } from "react";

import {
  Modal,
  Button,
  Backdrop,
  Fade,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Tooltip,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FolderOpen, Edit, Delete } from "@material-ui/icons";
import SimpleModal from "./SimpleModal";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: `${theme.spacing(1) / 2}px`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 8, 5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "400px",
  },
  logo: {
    margin: theme.spacing(4),
  },
  modalButton: {
    width: "100%",
    margin: theme.spacing(1, 0),
    padding: theme.spacing(2, 0),
    fontWeight: "bold",
    textTransform: "none",
  },
  cardArea: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: `${theme.spacing(1) / 2}px`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 3, 5),
    minWidth: "400px",
    maxHeight: "500px",
    overflow: "scroll",
  },
  card: {
    width: "100%",
  },
}));

interface AppBarModalProps {
  SignInWithProvider?: (
    provider: "google" | "facebook" | "microsoft.com"
  ) => void;
  projects?: Array<SavedProject>;
  Open?: (project: SavedProject) => void;
  Update?: (key: string, name: string, description: string) => void;
  Remove?: (key: string) => void;
}

const AppBarModal: FC<AppBarModalProps> = ({
  children,
  SignInWithProvider,
  projects,
  Open,
  Update,
  Remove,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const LoginForm = () =>
    SignInWithProvider && (
      <div className={classes.paper}>
        <img
          src="logo-gogo.png"
          className={classes.logo}
          alt="GoGo Board"
          width={100}
        />

        <Button
          variant="contained"
          className={classes.modalButton}
          color="default"
          onClick={() => SignInWithProvider("google")}
          startIcon={
            <img src="icons/google_logo.png" alt="google auth" height={20} />
          }
        >
          Login with Google
        </Button>
        <Button
          variant="contained"
          className={classes.modalButton}
          color="primary"
          onClick={() => SignInWithProvider("facebook")}
          startIcon={
            <img src="icons/facebook_logo.png" alt="google auth" height={20} />
          }
        >
          Login with Facebook
        </Button>
        <Button
          variant="contained"
          className={classes.modalButton}
          color="default"
          onClick={() => SignInWithProvider("microsoft.com")}
          startIcon={
            <img src="icons/microsoft_logo.png" alt="google auth" height={20} />
          }
        >
          Login with Microsoft
        </Button>
      </div>
    );

  const ProjectsForm: FC = () => {
    return (
      <div className={classes.cardArea}>
        <Typography
          variant="h5"
          color="initial"
          style={{ marginBottom: "25px" }}
        >
          My Projects
        </Typography>
        <Grid container spacing={1}>
          {projects && projects.length === 0 && (
            <Typography variant="body2">No Saved Project</Typography>
          )}
          {projects &&
            projects.map((project, index) => (
              <Grid item xs={6} key={index.toString()}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" color="textPrimary">
                      {project.name}
                    </Typography>
                    <Typography variant="body2">
                      {project.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Tooltip title="Open">
                      <IconButton
                        onClick={() => {
                          Open && Open(project);
                          handleClose();
                        }}
                      >
                        <FolderOpen />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit">
                      <SimpleModal Update={Update} project={project}>
                        <IconButton>
                          <Edit />
                        </IconButton>
                      </SimpleModal>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <SimpleModal
                        Remove={() => Remove && Remove(project.key)}
                        project={project}
                      >
                        <IconButton>
                          <Delete />
                        </IconButton>
                      </SimpleModal>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    );
  };

  return (
    <div>
      <button type="button" onClick={handleOpen} style={{ width: "100%" }}>
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
          <div>{SignInWithProvider ? LoginForm() : <ProjectsForm />}</div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AppBarModal;
