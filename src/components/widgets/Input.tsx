import { FC, useState } from "react";
import { connect } from "react-redux";
import { publish, PublishType } from "src/redux/actions/MqttActions";

import { useTheme, TextField, InputAdornment } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { Modal } from "..";

interface InputWidgetProps {
  widget: InputProps;
  disable: boolean;
  publish: PublishType;
  gridSize: GridSize;
}

const Input: FC<InputWidgetProps> = ({
  widget,
  disable,
  gridSize,
  publish,
}) => {
  const { text, color = "", size } = widget;

  const [message, setMessage] = useState("");

  const theme = useTheme();

  const Content = () => (
    <div
      style={{
        width: `${size.width * gridSize.width}px`,
        height: `${size.height * gridSize.height}px`,
        backgroundColor: color,
        textTransform: "none",
        fontWeight: "normal",
        fontSize: "20px",
        borderRadius: `${theme.spacing(1)}px`,
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        variant="outlined"
        value={message}
        onChange={({ target }) => setMessage(target.value)}
        disabled={disable}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <button onClick={() => publish(text + "/" + message)}>
                <Send
                  style={{
                    color: color,
                    fontSize: "25px",
                  }}
                />
              </button>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );

  return (
    <>{disable ? <Modal widget={widget}>{Content()}</Modal> : Content()}</>
  );
};

const mapDispatchToProps = {
  publish,
};

export default connect(null, mapDispatchToProps)(Input);
