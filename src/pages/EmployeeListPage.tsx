import { useState, useMemo } from "react";
// import { Link } from 'react-router-dom'; // Link is now in Layout
import { useSelector } from "react-redux";
import {
  // ... TanStack Table imports ...
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import Layout from "../components/Layout"; // Import Layout
import { selectEmployees } from "../features/employees/employeeSlice";
import type { RootState } from "../store/store";
import type { Employee } from "../features/employees/employeeSlice";

// ... columnHelper and columns definition ...
const columnHelper = createColumnHelper<Employee>();
const columns = [
  columnHelper.accessor("firstName", { header: "First Name" }),
  columnHelper.accessor("lastName", { header: "Last Name" }),
  columnHelper.accessor("startDate", { header: "Start Date" }),
  columnHelper.accessor("department", { header: "Department" }),
  columnHelper.accessor("dateOfBirth", { header: "Date of Birth" }),
  columnHelper.accessor("street", { header: "Street" }),
  columnHelper.accessor("city", { header: "City" }),
  columnHelper.accessor("state", { header: "State" }),
  columnHelper.accessor("zipCode", { header: "Zip Code" }),
];

const EmployeeListPage = () => {
  // ... state, selector, table setup ...
  const employees = useSelector((state: RootState) => selectEmployees(state));
  const data = useMemo(() => employees, [employees]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: false,
  });

  return (
    <Layout>
      {" "}
      {/* Wrap content with Layout */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Current Employees
      </h1>
      {/* Global Filter Input */}
      <div className="mb-4 flex justify-end">
        <div className="relative">
          <label htmlFor="globalFilter" className="sr-only">
            Search table
          </label>
          <input
            type="text"
            id="globalFilter"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="p-2 pl-9 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:ring-opacity-50"
            placeholder="Search..."
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* Employee Table */}
      <div className="bg-white overflow-x-auto shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          {/* ... thead ... */}
          <thead className="bg-gray-50">
            {" "}
            {/* Lighter header bg */}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100 transition-colors"
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      width:
                        header.getSize() !== 150 ? header.getSize() : undefined,
                    }}>
                    <span className="flex items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <span className="ml-1.5 text-gray-700">🔼</span>,
                        desc: <span className="ml-1.5 text-gray-700">🔽</span>,
                      }[header.column.getIsSorted() as string] ?? (
                        <span className="ml-1.5 text-gray-300 group-hover:text-gray-400">
                          ↕️
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* ... tbody ... */}
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-5 text-sm text-gray-500 text-center">
                  No employees found{globalFilter ? " matching filter." : "."}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Rows:</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:border-indigo-500 focus:ring-opacity-50">
              {[10, 25, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <span className="text-gray-500">
            {" "}
            | Showing {table.getRowModel().rows.length} of{" "}
            {table.getCoreRowModel().rows.length} results
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span>
            Page{" "}
            <strong>
              {table.getPageCount() > 0
                ? table.getState().pagination.pageIndex + 1
                : 0}{" "}
              of {table.getPageCount()}
            </strong>
          </span>
          <span className="ml-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="p-1.5 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-opacity-50"
              aria-label="Go to first page">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1.5 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-opacity-50 ml-1"
              aria-label="Previous page">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1.5 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-opacity-50 ml-1"
              aria-label="Next page">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="p-1.5 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-opacity-50 ml-1"
              aria-label="Go to last page">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414zm6 0a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L14.586 10l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeListPage;
