import * as React from 'react';
import styles from './ReportViewer.module.scss';
import { IconButton } from "@fluentui/react";
import { useState } from 'react';
import Sidebar from '../../../controls/SideBar/Sidebar';
import { CardItem } from '../../../controls/CardItem/CardItem';
import ListView from '../../../controls/ListView/ListView';
import initialCardsData from "../../../data/initialCards.json";
import DetailPanel from '../../../controls/DetailPanel/DetailPanel';

export interface ICard {
  Id: number;
  Title: string;
  Thumbnail: string;
  Description: string;
  Metadata: string;
  PublishedBy?: string;
}

const ReportViewer: React.FC = () => {
  const [cards] = useState<ICard[]>(initialCardsData);
  const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [viewType, setViewType] = useState<"card" | "list">("card");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"title" | "id">("title");
  const [publisherFilter, setPublisherFilter] = useState<string | null>(null);

  const handleInfoClick = (e: React.MouseEvent, card: ICard) => {
    e.stopPropagation();
    setSelectedCard(card);
    setIsPanelOpen(true);
    updateRecents(card.Id);
  };

  const handleCardClick = (card: ICard) => {
    alert(`Open ${card.Title}`);
  };

  const updateRecents = (id: number) => {
    const r = JSON.parse(localStorage.getItem("recentCards") || "[]") as number[];
    const updated = [id, ...r.filter((x) => x !== id)].slice(0, 5);
    localStorage.setItem("recentCards", JSON.stringify(updated));
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setSelectedCard(null);
  };

  const filteredCards = cards
    .filter((c) => c.Title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((c) => (publisherFilter ? c.PublishedBy === publisherFilter : true))
    .sort((a, b) => (sortField === "title" ? a.Title.localeCompare(b.Title) : a.Id - b.Id));

  return (
    <div className={styles.layout}>
      {/* ---- Top Header ---- */}
      <header className={styles.topHeader}>
        <div className={styles.topTitle}>Analytics Dashboard</div>
        <div className={styles.viewToggle}>
          <IconButton
            iconProps={{ iconName: "GridViewMedium" }}
            title="Card view"
            ariaLabel="Card view"
            onClick={() => setViewType("card")}
          />
          <IconButton
            iconProps={{ iconName: "BulletedList" }}
            title="List view"
            ariaLabel="List view"
            onClick={() => {
              setViewType("list");
              // Close detail panel when switching to list view
              setIsPanelOpen(false);
              setSelectedCard(null);
            }}
          />
        </div>
      </header>

      <div className={styles.mainArea}>
        {/* ---- Sidebar ---- */}
        <Sidebar
          viewType={viewType}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          publisherFilter={publisherFilter}
          setPublisherFilter={setPublisherFilter}
          sortField={sortField}
          setSortField={setSortField}
        />

        {/* ---- Main Content ---- */}
        <main className={`${styles.contentArea} ${isPanelOpen ? styles.shrink : ""}`}>
          {viewType === "card" ? (
            <div className={`${styles.cardGrid} ${isPanelOpen ? styles.shrink : ""}`}>
              {filteredCards.map((c) => (
                <CardItem
                  key={c.Id}
                  item={c}
                  isSelected={selectedCard?.Id === c.Id}
                  isPanelOpen={selectedCard?.Id === c.Id && isPanelOpen}
                  onInfoClick={(e: React.MouseEvent<Element, MouseEvent>) => handleInfoClick(e, c)}
                  onCardClick={() => handleCardClick(c)}
                />
              ))}
            </div>
          ) : (
            <ListView cards={filteredCards} onCardClick={handleCardClick} />
          )}
          {/* ---- Detail Panel (grid column) ---- */}
          {isPanelOpen && selectedCard && (
            <DetailPanel selectedCard={selectedCard} onClose={closePanel} />
          )}
        </main>
      </div>
    </div>
  );
};

export default ReportViewer;
