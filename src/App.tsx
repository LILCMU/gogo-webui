// eslint-disable-next-line
import { AppBar, DragLayer } from "src/components";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";

function App() {
  return (
    <div className="App">
      <AppBar />
      {/* <Content /> */}
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <DragLayer />
      </DndProvider>
    </div>
  );
}

export default App;
