import { FC } from "react";
import { connect } from "react-redux";
import { publish, publish_type } from "src/redux/actions/MqttActions";

import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";

interface PadButtonProps {
  publish: publish_type;
  text: string;
  disable?: boolean;
}

const Button: FC<PadButtonProps> = ({ children, text, disable, publish }) => {
  return (
    <button
      onClick={() => publish(text)}
      disabled={disable}
      style={{ fontSize: "inherit" }}
    >
      {children}
    </button>
  );
};

const Pad: FC<PadProps & { publish: publish_type; gridSize: GridSize }> = (
  props
) => {
  const { up, down, left, right, disable, size, gridSize, publish } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: `${size.width * gridSize.width}px`,
        height: `${size.height * gridSize.height}px`,
        borderRadius: "50%",
        border: "2px solid #3f3f3fae",
        fontSize: "50px",
        // padding: "7.5px",
      }}
    >
      <Button text={up} disable={disable} publish={publish}>
        <KeyboardArrowUp fontSize="inherit" />
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button text={left} disable={disable} publish={publish}>
          <KeyboardArrowLeft fontSize="inherit" />
        </Button>
        <Button text={right} disable={disable} publish={publish}>
          <KeyboardArrowRight fontSize="inherit" />
        </Button>
      </div>
      <Button text={down} disable={disable} publish={publish}>
        <KeyboardArrowDown fontSize="inherit" />
      </Button>
    </div>
  );
};

const mapDispatchToProps = { publish };

export default connect(null, mapDispatchToProps)(Pad);
