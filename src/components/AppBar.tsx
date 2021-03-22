import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import {
  AccountCircle,
  Save,
  Add,
  Folder,
  ExitToApp,
  Person,
} from "@material-ui/icons";
import { useState, MouseEvent, FC } from "react";
import {
  ExtendedFirebaseInstance,
  isEmpty,
  isLoaded,
  useFirebase,
  useFirebaseConnect,
} from "react-redux-firebase";

import AppBarModal from "./AppBarModal";
import { useDispatch, useSelector } from "react-redux";
import SimpleModal from "./SimpleModal";
import { SET_PROJECT, SET_WIDGET } from "src/redux/actions/WidgetButtonActions";
import { InitialWidgets } from "src/redux/init/WidgetState";
import { CHANGE_CHANNEL } from "src/redux/actions/MqttActions";
import AlertModal from "./AlertModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    padding: theme.spacing(1) / 2,
  },
  title: {
    flexGrow: 1,
  },
}));

const MyAppBar: FC = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useFirebaseConnect("users");

  const state = useSelector((state: AppStateProps) => state);

  const dispatch = useDispatch();

  const { auth }: ExtendedFirebaseInstance = state.firebase;

  const loggedIn = isLoaded(auth) && !isEmpty(auth);

  const firebase = useFirebase();
  const handleLogout = () => {
    firebase.logout().then(() => handleMenuClose());
  };

  const { currentUser } = firebase.auth();

  const [savedProjects, setSavedProjects] = useState({});

  const users = state.firebase.ordered.users;
  const profile = state.firebase.profile;
  if (loggedIn && isLoaded(users) && !isEmpty(users) && currentUser) {
    // profile && console.log(profile.providerData[0] as ProfileProps);
    const user = (users as Array<any>).find(
      (user) => user.key === currentUser.uid
    );
    if (user) {
      const projects = user.value.projects;

      // console.log(project);
      if (projects && projects !== savedProjects) setSavedProjects(projects);
    }
  }
  const projects_value = Object.values(savedProjects);
  const projects = Object.keys(savedProjects).map((key, index) => ({
    ...(projects_value[index] as SavedProject),
    key,
  }));

  const { project } = state.widget;

  const SignInWithProvider = (
    provider: "google" | "facebook" | "microsoft.com"
  ) => {
    firebase
      .login({
        provider: provider,
        type: "popup",
      })
      .catch((error) =>
        setAlert({ visible: true, duration: 30000, text: error.message })
      );
  };

  const handleOpenProject = (project: SavedProject) => {
    const { widgets, channel } = project;
    dispatch({ type: SET_WIDGET, payload: { widgets } });
    dispatch({ type: SET_PROJECT, payload: { project: project as Project } });
    dispatch({ type: CHANGE_CHANNEL, payload: { channel } });
    setAlert({
      visible: true,
      duration: 1000,
      text: `Project "${project.name}" Opened`,
    });
  };

  const handleChangeProjectInfo = (
    key: string,
    name: string,
    description: string
  ) => {
    if (currentUser) {
      firebase.update(
        `/users/${currentUser.uid}/projects/${key}`,
        {
          name,
          description,
        },
        () => setAlert({ visible: true, duration: 1000, text: "Project Saved" })
      );
    }
  };

  const handleRemoveProject = (key: string) => {
    if (currentUser) {
      firebase.remove(`/users/${currentUser.uid}/projects/${key}`, () =>
        setAlert({ visible: true, duration: 1000, text: "Project Deleted" })
      );
    }
  };

  const handleSaveOnActiveProject = (key: string) => {
    if (currentUser && project) {
      firebase.update(
        `/users/${currentUser.uid}/projects/${key}`,
        {
          widgets: state.widget.widgets,
          channel: state.mqtt.channel,
        },
        () => setAlert({ visible: true, duration: 1000, text: "Project Saved" })
      );
    }
  };

  const handleSave = (name: string, description: string) => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      firebase
        .push(
          `/users/${currentUser.uid}/projects`,
          {
            widgets: state.widget.widgets,
            name,
            description,
            channel: state.mqtt.channel,
          },
          () =>
            setAlert({ visible: true, duration: 1000, text: "Project Saved" })
        )
        .then((data) => ({
          key: data.key,
          name,
          description,
        }))
        .then((project) =>
          dispatch({ type: SET_PROJECT, payload: { project } })
        );
    }
  };

  const handleNewProject = () => {
    const widgets = InitialWidgets;
    dispatch({ type: SET_WIDGET, payload: { widgets: [...widgets] } });
    dispatch({ type: SET_PROJECT, payload: { project: undefined } });
    dispatch({ type: CHANGE_CHANNEL, payload: { channel: "0" } });
  };

  const SaveMenuItem = () => (
    <MenuItem
      onClick={() => {
        if (!loggedIn) setAlert({ visible: true, duration: 1000, text: "" });
        else if (project) handleSaveOnActiveProject(project.key);
      }}
    >
      <IconButton color="inherit">
        <Save />
      </IconButton>
      <p>Save Widgets</p>
    </MenuItem>
  );

  const [alert, setAlert] = useState({
    visible: false,
    text: "",
    duration: 1000,
  });

  const [alertProfile, setAlertProfile] = useState({
    visible: false,
    text: "",
    duration: 1000,
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            GoGo Remote
          </Typography>

          {!loggedIn && (
            <AppBarModal SignInWithProvider={SignInWithProvider}>
              <Button variant="text" style={{ color: "#fff" }}>
                Login
              </Button>
            </AppBarModal>
          )}

          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            onClick={handleMenuOpen}
          >
            {loggedIn ? <AccountCircle fontSize="large" /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClick={handleMenuClose}
      >
        {loggedIn && (
          <MenuItem
            onClick={() =>
              setAlertProfile({ text: "", visible: true, duration: 5000 })
            }
          >
            <IconButton color="inherit">
              <Person />
            </IconButton>
            <p>My Profile</p>
          </MenuItem>
        )}
        {project || !loggedIn ? (
          SaveMenuItem()
        ) : (
          // Add isNotLoggedIn to SimpleModal then in FC off SimpleModal return new content
          <SimpleModal Save={handleSave}>{SaveMenuItem()}</SimpleModal>
        )}
        {loggedIn && (
          <div>
            <SimpleModal NewProject={handleNewProject}>
              <MenuItem>
                <IconButton color="inherit">
                  <Add />
                </IconButton>
                <p>New Projects...</p>
              </MenuItem>
            </SimpleModal>
            <AppBarModal
              projects={projects}
              Open={handleOpenProject}
              Update={handleChangeProjectInfo}
              Remove={handleRemoveProject}
            >
              <MenuItem>
                <IconButton color="inherit">
                  <Folder />
                </IconButton>
                <p>My Projects...</p>
              </MenuItem>
            </AppBarModal>
            <MenuItem onClick={handleLogout}>
              <IconButton color="inherit">
                <ExitToApp />
              </IconButton>
              <p>Logout</p>
            </MenuItem>
          </div>
        )}
      </Menu>
      {alert.visible && (
        <AlertModal
          alertText={alert.text}
          setAlert={setAlert}
          duration={alert.duration}
        />
      )}
      {alertProfile.visible && (
        <AlertModal
          alertText={alertProfile.text}
          setAlert={setAlertProfile}
          duration={alertProfile.duration}
          profile={profile.providerData[0] as ProfileProps}
        />
      )}
    </div>
  );
};

export default MyAppBar;
