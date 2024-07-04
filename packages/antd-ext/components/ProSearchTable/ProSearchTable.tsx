import type { ColumnGroupTypeExt, ColumnTypeExt } from '../TableExt/TableExt';

interface ISearchConfig {
  span: number;
}

interface IProColumns<T> extends ColumnTypeExt<T>, ColumnGroupTypeExt<T> {
  hideInSearch: boolean;
  hideInTable: boolean;
}

interface IProSearchTable<T> {
  search: ISearchConfig;
  columns: IProColumns<T>[];
  request: (params: { pageSize: number; current: number }) => Promise<{ data: T[] }>;
}

export default function ProSearchTable<T>(props: IProSearchTable<T>) {
  const { search, columns } = props;
  return null;
}
