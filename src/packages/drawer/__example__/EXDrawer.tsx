import React, { useState } from "react";
import Drawer from "../Drawer";
import Button from "../../button";

const EXDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>点我</Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        width="378px"
        maskClosable
        placement="right"
      >
        <div>6666</div>
        <Button onClick={() => setOpen(false)}>关闭</Button>
      </Drawer>
    </>
  );
};

export default EXDrawer;
