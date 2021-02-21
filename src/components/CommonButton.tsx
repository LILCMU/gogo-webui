import { FC } from "react";
import { connect } from "react-redux";
import { publish } from "src/redux/actions/MqttActions";

import Button from "@material-ui/core/Button";

const CommonButton: FC<CommonButtonProps & { publish: any }> = ({
  text,
  color = "",
  disable,
  ...props
}) => {
  const { publish } = props;
  return (
    <Button
      variant="contained"
      style={{
        width: "30vh",
        height: "7vh",
        backgroundColor: color,
        textTransform: "none",
        fontWeight: "normal",
        fontSize: "20px",
      }}
      onClick={() => publish(text, 9)}
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
