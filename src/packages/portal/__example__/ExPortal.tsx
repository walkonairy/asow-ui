import React, { useState } from "react";
import Modal from "@/packages/modal/Modal";

const ExPortal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>打开 Modal</button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        unmountOnClose={false}
        mask={true}
      >
        <div>这是一个 Modal</div>
        <p>你可以在这里添加 Modal 的内容。</p>
        <button onClick={handleCloseModal}>关闭 Modal</button>
      </Modal>
    </div>
  );
};

export default ExPortal;
