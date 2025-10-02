import React from "react";
import styles from "./CardItem.module.scss";
import { ICard } from "../../webparts/reportViewer/components/ReportViewer";
import { Icon } from "@fluentui/react/lib/Icon";

interface CardItemProps {
  item: ICard;
  isSelected: boolean;
  onInfoClick: (e: React.MouseEvent, item: ICard) => void;
  onCardClick: () => void;
}

export const CardItem: React.FC<CardItemProps> = ({
  item,
  onInfoClick,
  onCardClick,
}) => {
  return (
    <div className={styles.cardItem} onClick={onCardClick}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{item.Title}</span>
        <Icon
          iconName="Info"
          className={styles.infoIcon}
          onClick={(e) => onInfoClick(e, item)}
        />
      </div>

      {/* Image Section */}
      <div className={styles.cardImageWrapper}>
        <img
          src={item.Thumbnail}
          alt="Chart Placeholder"
          className={styles.cardImage}
        />
      </div>

      {/* Footer */}
      <div className={styles.cardFooter}>
        <span className={styles.cardMeta}>{item.Metadata || "Testing"}</span>
      </div>
    </div>
  );
};