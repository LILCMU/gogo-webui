import Button from "@material-ui/core/Button";
import { FC, useContext } from "react";
import { MqttContext } from "src/hooks/mqtt";

const CommonButton: FC<CommonButtonProps> = ({ text, color = "", disable }) => {
  const { publish } = useContext(MqttContext) as AppContext;
  return (
    <Button
      variant="contained"
      style={{
        width: "100px",
        height: "35px",
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

export default CommonButton;
