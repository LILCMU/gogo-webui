import { FC, useState } from "react";
import { connect } from "react-redux";
import { publish, PublishType } from "src/redux/actions/MqttActions";

import { useTheme, TextField, InputAdornment } from "@material-ui/core";
import { Send } from "@material-ui/icons";

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

  return (
    <div
      style={{
        // width: `${size.width * gridSize.width}px`,
        // height: `${size.height * gridSize.height}px`,
        backgroundColor: "#ddd",
        textTransform: "none",
        fontWeight: "normal",
        borderRadius: `${theme.spacing(1)}px`,
        display: "flex",
        alignItems: "center",
        padding: `0 ${theme.spacing(1)}px`,
        width: "100%",
        height: "100%",
      }}
    >
      <TextField
        variant="outlined"
        value={message}
        onChange={({ target }) => setMessage(target.value)}
        disabled={disable}
        style={{
          fontSize: `${size.height * gridSize.height * 0.9}px`,
          border: `2px solid ${color}`,
        }}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <button onClick={() => publish(text + "/" + message)}>
                <Send
                  style={{
                    color: color,
                    fontSize: `${size.height * gridSize.height * 0.55}px`,
                  }}
                />
              </button>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

const mapDispatchToProps = {
  publish,
};

export default connect(null, mapDispatchToProps)(Input);
