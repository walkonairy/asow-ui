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
        title="test aaa"
        onClose={() => setOpen(false)}
        customize={false}
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
