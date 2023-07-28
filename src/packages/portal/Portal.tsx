import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  targetId?: string;
}

const Portal: React.FC<PortalProps> = (props) => {
  const { children, targetId = "asow_portal" } = props;

  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    const existingNode = document.getElementById(targetId);

    if (!existingNode) {
      const node = document.createElement("div");
      node.id = targetId;
      document.body.appendChild(node);
      setPortalNode(node);
    } else {
      setPortalNode(existingNode);
    }

    return () => {
      if (existingNode) {
        setPortalNode(null);
      } else {
        portalNode && document.body?.removeChild(portalNode);
      }
    };
  }, [targetId]);

  return portalNode ? ReactDOM.createPortal(children, portalNode) : null;
};

export default Portal;
