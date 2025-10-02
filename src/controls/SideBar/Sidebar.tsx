/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import { TextField, Dropdown, IDropdownOption } from "@fluentui/react";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  publisherFilter: string | null;
  setPublisherFilter: (val: string | null) => void;
  sortField: "title" | "id";
  setSortField: (val: "title" | "id") => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  searchTerm,
  setSearchTerm,
  publisherFilter,
  setPublisherFilter,
  sortField,
  setSortField,
}) => {
  const publisherOptions: IDropdownOption[] = [
    { key: "Testing", text: "Testing" },
    { key: "Admin", text: "Admin" },
    { key: "All", text: "All" },
  ];

  return (
    <aside className={styles.sidebar}>
      <TextField
        placeholder="Search for a report..."
        value={searchTerm}
        onChange={(_, val) => setSearchTerm(val || "")}
      />

      <div className={styles.filterBlock}>
        <label className={styles.filterLabel}>Published By:</label>
        <Dropdown
          placeholder="Select"
          options={publisherOptions}
          onChange={(_, opt) =>
            setPublisherFilter(opt?.key === "All" ? null : String(opt?.key))
          }
        />
      </div>

      <div className={styles.filterBlock}>
        <label className={styles.filterLabel}>Sorting:</label>
        <Dropdown
          selectedKey={sortField}
          options={[
            { key: "title", text: "Title" },
            { key: "id", text: "ID" },
          ]}
          onChange={(_, opt) => setSortField(opt?.key as "title" | "id")}
        />
      </div>

      <p className={styles.disclaimer}>
        These dashboards contain confidential and proprietary information...
      </p>
    </aside>
  );
};

export default Sidebar;
