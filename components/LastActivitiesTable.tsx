import { Table } from "@nextui-org/react";
import { FC } from "react";
import { Activity } from "../types/types";
import Link from "next/link";

interface Props {
  activities: Array<Activity>;
}
interface IStringIndex {
  [key: string]: any;
}

export const LastActivitiesTable: FC<Props> = ({ activities }) => {
  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "start_date",
      label: "Date",
    },
  ];

  return (
    <Table
      aria-label="Example table with dynamic content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.key}>{column.label}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={activities}>
        {(item: IStringIndex) => (
          <Table.Row key={item.id}>
            {(columnKey) => (
              <Table.Cell>
                {columnKey === "name" ? (
                  <Link href={`activity/${encodeURIComponent(item["id"])}`}>
                    {item[columnKey]}
                  </Link>
                ) : (
                  item[columnKey]
                )}
              </Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
