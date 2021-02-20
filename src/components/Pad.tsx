import { FC, useContext } from "react";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";
import { MqttContext } from "src/hooks/mqtt";

const Button: FC<CommonButtonProps> = ({ children, text, disable }) => {
  const { publish } = useContext(MqttContext) as AppContext;
  return (
    <button onClick={() => publish(text, 9)} disabled={disable}>
      {children}
    </button>
  );
};

const Pad: FC<PadProps> = (props) => {
  const { up, down, left, right, disable } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        border: "2px solid #3f3f3fae",
        // padding: "7.5px",
      }}
    >
      <Button type="common" text={up} disable={disable}>
        <KeyboardArrowUp />
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button type="common" text={left} disable={disable}>
          <KeyboardArrowLeft />
        </Button>
        <Button type="common" text={right} disable={disable}>
          <KeyboardArrowRight />
        </Button>
      </div>
      <Button type="common" text={down} disable={disable}>
        <KeyboardArrowDown />
      </Button>
    </div>
  );
};

export default Pad;
