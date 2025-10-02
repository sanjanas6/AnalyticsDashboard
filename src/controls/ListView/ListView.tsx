// DashboardListView.tsx
import React from 'react';
import { DetailsList, IColumn } from '@fluentui/react/lib/DetailsList';
import { ICard } from '../../webparts/reportViewer/components/ReportViewer';

interface ListViewProps {
  cards: ICard[];
  onCardClick: (card: ICard) => void;
}

const columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Title',
    fieldName: 'Title',
    minWidth: 150,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: 'column2',
    name: 'Description',
    fieldName: 'Description',
    minWidth: 200,
    maxWidth: 300,
    isMultiline: true,
    isResizable: true,
  },
  {
    key: 'column3',
    name: 'Metadata',
    fieldName: 'Metadata',
    minWidth: 150,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: 'column4',
    name: 'Thumbnail',
    fieldName: 'Thumbnail',
    minWidth: 100,
    maxWidth: 120,
    onRender: (item: ICard) => (
      <img
        src={item.Thumbnail}
        alt={item.Title}
        style={{ width: 100, height: 60, objectFit: 'cover' }}
      />
    ),
  },
];

const ListView: React.FC<ListViewProps> = ({ cards, onCardClick }) => {
  return (
    <DetailsList
      items={cards}
      columns={columns}
      selectionMode={0} 
      onItemInvoked={(item) => onCardClick(item)}
    />
  );
};

export default ListView;