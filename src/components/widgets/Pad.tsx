import { FC } from "react";
import { connect } from "react-redux";
import { publish, PublishType } from "src/redux/actions/MqttActions";

import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";
import { Modal } from "..";

interface PadButtonProps {
  publish: PublishType;
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

interface PadWidgetProps {
  widget: PadProps;
  disable: boolean;
  gridSize: GridSize;
  publish: PublishType;
}

const Pad: FC<PadWidgetProps> = ({ widget, disable, gridSize, publish }) => {
  const { size, up, down, left, right } = widget;

  const minSize = Math.min(
    size.width * gridSize.width,
    size.height * gridSize.height
  );

  const Content = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${size.width * gridSize.width}px`,
        height: `${size.height * gridSize.height}px`,
        backgroundColor: `${disable ? "#3f3f3f50" : ""}`,
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: `${minSize}px`,
          height: `${minSize}px`,
          borderRadius: "50%",
          border: "2px solid #3f3f3fae",
          fontSize: "50px",
          padding: "auto",
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
    </div>
  );

  return (
    <>{disable ? <Modal widget={widget}>{Content()}</Modal> : Content()}</>
  );
};

const mapDispatchToProps = { publish };

export default connect(null, mapDispatchToProps)(Pad);
