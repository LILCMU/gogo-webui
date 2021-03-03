import { FC } from "react";
import { connect } from "react-redux";
import { publish, publish_type } from "src/redux/actions/MqttActions";

import Button from "@material-ui/core/Button";

const CommonButton: FC<
  CommonButtonProps & { publish: publish_type; gridSize: GridSize }
> = ({ text, color = "", disable, size, gridSize, ...props }) => {
  const { publish } = props;
  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: `${size.width * gridSize.width}px`,
          height: `${size.height * gridSize.height}px`,
          backgroundColor: color,
          textTransform: "none",
          fontWeight: "normal",
          fontSize: "20px",
        }}
        onClick={() => publish(text)}
        disabled={disable}
      >
        {text}
      </Button>
    </div>
  );
};

const mapDispatchToProps = {
  publish,
};

export default connect(null, mapDispatchToProps)(CommonButton);
