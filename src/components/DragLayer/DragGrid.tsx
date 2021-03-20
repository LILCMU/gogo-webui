import { useTheme } from "@material-ui/core";
import { FC, useRef, useEffect, CSSProperties } from "react";

import { Grid } from "@material-ui/core";
import { ChangeGridSizeType } from "src/redux/actions/WidgetButtonActions";

const DragGrid: FC<{
  change_grid_size: ChangeGridSizeType;
  visible: boolean;
}> = ({ change_grid_size, visible: editing }) => {
  const theme = useTheme();

  const ref = useRef<any>(null);

  useEffect(() => {
    const { offsetWidth, offsetHeight } = ref.current;
    change_grid_size(offsetWidth, offsetHeight);
  }, [ref, change_grid_size]);

  const styles: CSSProperties = {
    backgroundColor: "#333",
    color: "white",
    textTransform: "uppercase",
    textAlign: "center",
    // opacity: 0.25,
    border: "0.5px solid black",
    borderRadius: `${theme.spacing(1)}px`,
    overflow: "hidden",
  };

  return (
    <Grid container style={{ height: "100%", opacity: editing ? 0.1 : 0 }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
        <Grid key={index} container item xs={12}>
          <Grid item xs={2} ref={index === 1 ? ref : null} style={styles} />
          <Grid item xs={2} style={styles} />
          <Grid item xs={2} style={styles} />
          <Grid item xs={2} style={styles} />
          <Grid item xs={2} style={styles} />
          <Grid item xs={2} style={styles} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DragGrid;
