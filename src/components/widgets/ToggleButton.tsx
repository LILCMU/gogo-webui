import { FC, useState } from "react";
import { connect } from "react-redux";
import { publish, PublishType } from "src/redux/actions/MqttActions";

import { ToggleOn, ToggleOff } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { Modal } from "..";

interface ToggleProps {
  widget: CommonButtonProps;
  disable: boolean;
  publish: PublishType;
  gridSize: GridSize;
}

const ToggleButton: FC<ToggleProps> = ({
  widget,
  disable,
  gridSize,
  publish,
}) => {
  const { text, color = "", size } = widget;
  const [on, setOn] = useState<boolean>(false);

  const handleToggle = () => {
    setOn(!on);
    publish(text + "/" + on ? "on" : "off");
  };

  const Content = () => (
    <Button
      style={{
        width: `${size.width * gridSize.width}px`,
        height: `${size.height * gridSize.height}px`,
        // backgroundColor: color,
      }}
      onClick={() => handleToggle()}
      disabled={disable}
    >
      {on ? (
        <ToggleOn
          style={{
            color: color,
            fontSize: `${Math.min(
              size.width * gridSize.width,
              size.height * gridSize.height
            )}px`,
          }}
        />
      ) : (
        <ToggleOff
          style={{
            fontSize: `${Math.min(
              size.width * gridSize.width,
              size.height * gridSize.height
            )}px`,
            color: "darkgrey",
          }}
        />
      )}
    </Button>
  );

  return (
    <>{disable ? <Modal widget={widget}>{Content()}</Modal> : Content()}</>
  );
};

const mapDispatchToProps = {
  publish,
};

export default connect(null, mapDispatchToProps)(ToggleButton);
