import { FC } from "react";
import { connect } from "react-redux";
import { publish, PublishType } from "src/redux/actions/MqttActions";

import { useTheme, Button } from "@material-ui/core";

interface CommonProps {
  widget: CommonButtonProps;
  disable: boolean;
  publish: PublishType;
}

const CommonButton: FC<CommonProps> = ({ widget, disable, publish }) => {
  const { text, color = "" } = widget;

  const theme = useTheme();

  return (
    <Button
      variant="contained"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: color,
        textTransform: "none",
        fontWeight: "normal",
        fontSize: "20px",
        borderRadius: `${theme.spacing(1)}px`,
      }}
      onClick={() => publish(text)}
      disabled={disable}
    >
      {text}
    </Button>
  );
};

const mapDispatchToProps = {
  publish,
};

export default connect(null, mapDispatchToProps)(CommonButton);
