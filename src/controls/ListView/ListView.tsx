/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { DetailsList, IColumn, SelectionMode } from "@fluentui/react";
import { ICard } from "../../webparts/reportViewer/components/ReportViewer";

interface ListViewProps {
  cards: ICard[];
  onCardClick: (card: ICard) => void;
}

const ListView: React.FC<ListViewProps> = ({ cards, onCardClick }) => {
  const [sortedItems, setSortedItems] = React.useState(cards);
  const [isSortedDescending, setIsSortedDescending] = React.useState(false);
  const [sortedColumnKey, setSortedColumnKey] = React.useState("");

    React.useEffect(() => {
    setSortedItems(cards);
  }, [cards]);

  const onColumnClick = (
    ev?: React.MouseEvent<HTMLElement>,
    column?: IColumn
  ): void => {
    if (!column) return;

    const newIsSortedDescending =
      sortedColumnKey === column.key ? !isSortedDescending : false;

    const newSortedItems = copyAndSort(
      cards,
      column.fieldName as keyof ICard,
      newIsSortedDescending
    );

    setSortedItems(newSortedItems);
    setSortedColumnKey(column.key);
    setIsSortedDescending(newIsSortedDescending);
  };

  const copyAndSort = (
    items: ICard[],
    columnKey: keyof ICard,
    isSortedDescending: boolean
  ): ICard[] => {
    return items
      .slice(0)
      .sort((a, b) =>
        (a[columnKey] ?? "")
          .toString()
          .localeCompare((b[columnKey] ?? "").toString(), undefined, {
            numeric: true,
            sensitivity: "base",
          }) * (isSortedDescending ? -1 : 1)
      );
  };

const columns: IColumn[] = React.useMemo(
    () => [
      {
        key: "Id",
        name: "ID",
        fieldName: "Id",
        minWidth: 40,
        maxWidth: 60,
        isResizable: false,
        isSorted: sortedColumnKey === "Id",
        isSortedDescending: sortedColumnKey === "Id" && isSortedDescending,
        onColumnClick,
      },
      {
        key: "Title",
        name: "Title",
        fieldName: "Title",
        minWidth: 150,
        maxWidth: 250,
        isResizable: true,
        isSorted: sortedColumnKey === "Title",
        isSortedDescending: sortedColumnKey === "Title" && isSortedDescending,
        onColumnClick,
      },
      {
        key: "PublishedBy",
        name: "Published By",
        fieldName: "PublishedBy",
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
        isSorted: sortedColumnKey === "PublishedBy",
        isSortedDescending:
          sortedColumnKey === "PublishedBy" && isSortedDescending,
        onColumnClick,
      },
      {
        key: "Metadata",
        name: "Metadata",
        fieldName: "Metadata",
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
        isSorted: sortedColumnKey === "Metadata",
        isSortedDescending:
          sortedColumnKey === "Metadata" && isSortedDescending,
        onColumnClick,
      },
    ],
    [sortedColumnKey, isSortedDescending]
  );
  return (
    <DetailsList
      items={sortedItems}
      columns={columns}
      setKey="sorted"
      selectionMode={SelectionMode.none}
      onItemInvoked={onCardClick}
    />
  );
};

export default ListView;
