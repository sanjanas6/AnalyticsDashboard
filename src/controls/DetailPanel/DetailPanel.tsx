/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import { IconButton } from "@fluentui/react";
import styles from "./DetailPanel.module.scss";
import { ICard } from "../../webparts/reportViewer/components/ReportViewer";

interface DetailPanelProps {
  selectedCard: ICard;
  onClose: () => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ selectedCard, onClose }) => {
  return (
    <aside className={styles.detailPanel}>
      <div className={styles.detailHeader}>
        <div className={styles.detailTitle}>{selectedCard.Title}</div>
        <IconButton
          iconProps={{ iconName: "ChromeClose" }}
          title="Close"
          ariaLabel="Close panel"
          onClick={onClose}
          className={styles.closeButton}
        />
      </div>

      <div className={styles.detailContent}>
        <p className={styles.detailDesc}>{selectedCard.Description}</p>

        <dl className={styles.detailList}>
          <dt>Last Modified</dt>
          <dd>January 1, 2021</dd>
          <dt>Data Source</dt>
          <dd>{selectedCard.Metadata}</dd>
          <dt>Target Audience</dt>
          <dd>Selected Partners</dd>
          <dt>Published By</dt>
          <dd>{selectedCard.PublishedBy || "Testing"}</dd>
          <dt>Update Frequency</dt>
          <dd>Monthly</dd>
          <dt>Number of Users</dt>
          <dd>200</dd>
        </dl>
      </div>
    </aside>
  );
};

export default DetailPanel;
