import { FC } from "react";
import { connect } from "react-redux";
import { publish, PublishType } from "src/redux/actions/MqttActions";

import { useTheme, Button } from "@material-ui/core";
import { Modal } from "..";

interface CommonProps {
  widget: CommonButtonProps;
  disable: boolean;
  publish: PublishType;
  gridSize: GridSize;
}

const CommonButton: FC<CommonProps> = ({
  widget,
  disable,
  gridSize,
  publish,
}) => {
  const { text, color = "", size } = widget;

  const theme = useTheme();

  const Content = () => (
    <Button
      variant="contained"
      style={{
        width: `${size.width * gridSize.width}px`,
        height: `${size.height * gridSize.height}px`,
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

  return (
    <>{disable ? <Modal widget={widget}>{Content()}</Modal> : Content()}</>
  );
};

const mapDispatchToProps = {
  publish,
};

export default connect(null, mapDispatchToProps)(CommonButton);
