import { FC } from "react";
import { connect } from "react-redux";
import { publish } from "src/redux/actions/MqttActions";

import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";

const Button: FC<CommonButtonProps & { publish: any }> = ({
  children,
  text,
  disable,
  publish,
}) => {
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

const Pad: FC<PadProps & { publish: any }> = (props) => {
  const { up, down, left, right, disable, size = "100px", publish } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        border: "2px solid #3f3f3fae",
        fontSize: "50px",
        // padding: "7.5px",
      }}
    >
      <Button type="common" text={up} disable={disable} publish={publish}>
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
        <Button type="common" text={left} disable={disable} publish={publish}>
          <KeyboardArrowLeft fontSize="inherit" />
        </Button>
        <Button type="common" text={right} disable={disable} publish={publish}>
          <KeyboardArrowRight fontSize="inherit" />
        </Button>
      </div>
      <Button type="common" text={down} disable={disable} publish={publish}>
        <KeyboardArrowDown fontSize="inherit" />
      </Button>
    </div>
  );
};

const mapDispatchToProps = { publish };

export default connect(null, mapDispatchToProps)(Pad);
