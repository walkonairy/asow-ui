import Button from "../../button";
import Modal from "../Modal";
import { useState } from "react";

const EXModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>点我</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        customize={false}
        mask
        unmountOnClose
      >
        <div>
          <div>title</div>
          <div>body</div>
        </div>
      </Modal>
    </>
  );
};

export default EXModal;
