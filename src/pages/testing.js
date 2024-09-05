import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { rows as initialRows, columns as dataColumns } from "../lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "@phosphor-icons/react";

const Testing = () => {
  const [filters, setFilters] = useState([{}]);
  const [filteredRows, setFilteredRows] = useState(initialRows); // State for filtered data

  const handleAddFilter = () => {
    setFilters([...filters, {}]);
  };

  const handleAddColumn = (index) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = {
      ...updatedFilters[index],
      additionalColumns: updatedFilters[index].additionalColumns
        ? [...updatedFilters[index].additionalColumns, {}]
        : [{}],
    };
    setFilters(updatedFilters);
  };

  const handleDeleteColumn = (filterIndex, colIndex) => {
    const updatedFilters = [...filters];
    const additionalColumns = updatedFilters[filterIndex].additionalColumns;
    if (additionalColumns && additionalColumns.length > 0) {
      additionalColumns.splice(colIndex, 1);
      updatedFilters[filterIndex].additionalColumns = additionalColumns;
      setFilters(updatedFilters);
    }
  };

  const handleDeleteFilter = () => {
    if (filters.length > 1) {
      setFilters(filters.slice(0, -1));
    }
  };

  // Ekstrak nama kolom dari dataColumns
  const columnOptions = dataColumns.map((column) => ({
    value: column.field,
    label: column.headerName || column.field,
  }));

  const applyFilters = () => {
    let filteredData = [...initialRows]; 
  
    filters.forEach((filter) => {
      let filterConditions = [];
  
      // Primary filter condition
      if (filter.column && filter.operator && filter.value) {
        filterConditions.push({
          column: filter.column,
          operator: filter.operator,
          value: filter.value,
          logicOperator: filter.logicOperator || "and", // default to 'and'
        });
      }
  
      // Additional columns within the same filter
      if (filter.additionalColumns) {
        filter.additionalColumns.forEach((col) => {
          if (col.column && col.operator && col.value) {
            filterConditions.push({
              column: col.column,
              operator: col.operator,
              value: col.value,
              logicOperator: col.logicOperator || "and", // default to 'and'
            });
          }
        });
      }
  
      // Apply filter conditions based on logic operators
      filteredData = filteredData.filter((row) => {
        let isAndCondition = true; 
        let isOrCondition = false; 
  
        filterConditions.forEach((condition) => {
          const cellValue = row[condition.column];
          let isMatch = false;
  
          // Handle different operators
          switch (condition.operator) {
            case "contains":
              isMatch = String(cellValue)
                .toLowerCase()
                .includes(condition.value.toLowerCase());
              break;
            case "equals":
              isMatch =
                String(cellValue).toLowerCase() ===
                condition.value.toLowerCase();
              break;
            case "starts with":
              isMatch = String(cellValue)
                .toLowerCase()
                .startsWith(condition.value.toLowerCase());
              break;
            case "ends with":
              isMatch = String(cellValue)
                .toLowerCase()
                .endsWith(condition.value.toLowerCase());
              break;
            case "is any of":
              isMatch = condition.value
                .split(",")
                .map((val) => val.trim().toLowerCase())
                .includes(String(cellValue).toLowerCase());
              break;
            case ">":
              isMatch = new Date(cellValue) > new Date(condition.value);
              break;
            case "<":
              isMatch = new Date(cellValue) < new Date(condition.value);
              break;
            default:
              isMatch = true;
          }
  
          // Apply AND/OR logic
          if (condition.logicOperator === "and") {
            isAndCondition = isAndCondition && isMatch;
          } else if (condition.logicOperator === "or") {
            isOrCondition = isOrCondition || isMatch;
          }
        });
  
        return isOrCondition || isAndCondition;
      });
    });
  
    setFilteredRows(filteredData);
  };
  


  const handleFilterChange = (index, field, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = [...prevFilters];
      if (field.includes("additionalColumns")) {
        const [_, colIndex, colField] = field.match(/additionalColumns\[(\d+)\]\.(.+)/);
        const additionalColumns = updatedFilters[index].additionalColumns || [];
        additionalColumns[colIndex] = {
          ...additionalColumns[colIndex],
          [colField]: value,
        };
        updatedFilters[index].additionalColumns = additionalColumns;
      } else {
        updatedFilters[index] = {
          ...updatedFilters[index],
          [field]: value,
        };
      }
      return updatedFilters;
    });
  };
  return (
    <>
      <div className="my-6 py-10">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Multi filtering columns</h1>
          <button
            className="bg-black text-white px-6 rounded-full hover:text-red-500"
            onClick={applyFilters}
          >
            Search
          </button>
        </div>

        {/* Map filters */}
        {filters.map((filter, index) => (
          <div key={index} className="card mt-10 flex flex-col gap-2">
            {index > 0 && (
              <div className="flex ms-44 mb-10">
                <Select
                  onValueChange={(value) =>
                    handleFilterChange(index, "logicOperator", value)
                  }
                >
                  <SelectTrigger className="w-[140px] text-white">
                    <SelectValue placeholder="and/or" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="or">or</SelectItem>
                    <SelectItem value="and">and</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex gap-2">
              <p>where</p>
              <Select
                onValueChange={(value) =>
                  handleFilterChange(index, "column", value)
                }
              >
                <SelectTrigger className="w-[140px] text-white">
                  <SelectValue placeholder="Kolom" />
                </SelectTrigger>
                <SelectContent>
                  {columnOptions.map((col) => (
                    <SelectItem key={col.value} value={col.value}>
                      {col.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Select Kondisi */}
              <Select
                onValueChange={(value) =>
                  handleFilterChange(index, "operator", value)
                }
              >
                <SelectTrigger className="w-[140px] text-white">
                  <SelectValue placeholder="Kondisi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contains">contains</SelectItem>
                  <SelectItem value="equals">equals</SelectItem>
                  <SelectItem value="starts with">starts with</SelectItem>
                  <SelectItem value="ends with">ends with</SelectItem>
                  <SelectItem value="is any of">is any of</SelectItem>
                  <SelectItem value=">">greater than</SelectItem>
                  <SelectItem value="<">less than</SelectItem>
                </SelectContent>
              </Select>

              {/* Input Nilai */}
              <Input
                type="text"
                placeholder="value...."
                className="w-[200px] text-white"
                onChange={(e) =>
                  handleFilterChange(index, "value", e.target.value)
                }
              />
            </div>

            {/* Baris Kedua: Operator, Kolom, Kondisi, dan Value */}
            <div className="flex gap-2 mt-2">
              {/* Select Operator */}
              <Select
                  onValueChange={(value) =>
                    handleFilterChange(index, "logicOperator", value)
                  }
                >              <SelectTrigger className="w-[70px] text-white">
                  <SelectValue placeholder="and/or" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="or">or</SelectItem>
                  <SelectItem value="and">and</SelectItem>
                </SelectContent>
              </Select>

              {/* Select Kolom */}
              <Select onValueChange={(value) => handleFilterChange(index, "column", value)}>
                <SelectTrigger className="w-[140px] text-white">
                  <SelectValue placeholder="Kolom" />
                </SelectTrigger>
                <SelectContent>
                  {columnOptions.map((col) => (
                    <SelectItem key={col.value} value={col.value}>
                      {col.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Select Kondisi */}
              <Select onValueChange={(value) => handleFilterChange(index, "operator", value)}>
                <SelectTrigger className="w-[140px] text-white">
                  <SelectValue placeholder="Kondisi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contains">contains</SelectItem>
                  <SelectItem value="equals">equals</SelectItem>
                  <SelectItem value="starts with">starts with</SelectItem>
                  <SelectItem value="ends with">ends with</SelectItem>
                  <SelectItem value="is empty">is empty</SelectItem>
                  <SelectItem value="is not empty">is not empty</SelectItem>
                  <SelectItem value="is any of">is any of</SelectItem>
                </SelectContent>
              </Select>

              {/* Input Nilai */}
              <Input
                type="text"
                placeholder="value...."
                className="w-[200px] text-white"
                onChange={(e) => handleFilterChange(index, "value", e.target.value)}
              />
            </div>

            {/* Tambah Kolom Baru */}
            {filter.additionalColumns?.map((_, colIndex) => (
              <div key={colIndex} className="flex gap-2 mt-2">
                {/* Select Operator */}
                <Select onValueChange={(value) => handleFilterChange(index, "logicOperator", value)}>
                  <SelectTrigger className="w-[70px] text-white">
                    <SelectValue placeholder="operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="or">or</SelectItem>
                    <SelectItem value="and">and</SelectItem>
                  </SelectContent>
                </Select>

                {/* Select Kolom */}
                <Select onValueChange={(value) => handleFilterChange(index, `additionalColumns[${colIndex}].column`, value)}>
                  <SelectTrigger className="w-[140px] text-white">
                    <SelectValue placeholder="Kolom" />
                  </SelectTrigger>
                  <SelectContent>
                    {columnOptions.map((col) => (
                      <SelectItem key={col.value} value={col.value}>
                        {col.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Select Kondisi */}
                <Select onValueChange={(value) => handleFilterChange(index, `additionalColumns[${colIndex}].operator`, value)}>
                  <SelectTrigger className="w-[140px] text-white">
                    <SelectValue placeholder="Kondisi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contains">contains</SelectItem>
                    <SelectItem value="equals">equals</SelectItem>
                    <SelectItem value="starts with">starts with</SelectItem>
                    <SelectItem value="ends with">ends with</SelectItem>
                    <SelectItem value="is empty">is empty</SelectItem>
                    <SelectItem value="is not empty">is not empty</SelectItem>
                    <SelectItem value="is any of">is any of</SelectItem>
                  </SelectContent>
                </Select>

                {/* Input Nilai */}
                <Input
                  type="text"
                  placeholder="value...."
                  className="w-[200px] text-white"
                  onChange={(e) => handleFilterChange(index, `additionalColumns[${colIndex}].value`, e.target.value)}
                />
              </div>
            ))}

            {/* Tombol Add Column */}
            <div className="flex ">
              <div
                className="flex mt-4 hover:text-red-500 cursor-pointer"
                onClick={() => handleAddColumn(index)}
              >
                <Plus size={18} className="font-bold cursor-pointer" />
                <button className="font-bold ms-2 ">Add Column</button>
              </div>
              <div
                className="flex mt-4 ms-5 hover:text-red-500 cursor-pointer"
                onClick={() => handleDeleteColumn(index)}
              >
                <Trash size={18} className="cursor-pointer" />
                <button className="ms-2">Delete Column</button>
              </div>
            </div>

            {/* Garis Pembatas */}
            <div className="relative mt-4">
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300"></div>
            </div>
          </div>
        ))}

        <div className="my-2">
          {/* Tombol Add Filter */}
          <div
            className="flex my-4 hover:text-red-500 cursor-pointer"
            onClick={handleAddFilter}
          >
            <Plus size={32} className="font-bold cursor-pointer" />
            <button className="font-bold ms-2">Add Filter</button>
          </div>

          {/* Tombol Delete Filter */}
          <div
            className="flex mt-4 hover:text-red-500 cursor-pointer"
            onClick={handleDeleteFilter}
          >
            <Trash size={32} className="font-bold cursor-pointer" />
            <button className="font-bold ms-2">Delete Filter</button>
          </div>
        </div>
      </div>

      {/* DataGrid */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={dataColumns}
          // filterModel={filterModel}
          slots={{
            toolbar: GridToolbar,
          }}
          // initialState={{
          //   filter: {
          //     filterModel: {
          //       items: [
          //         {
          //           field: "rating",
          //           operator: ">",
          //           value: "2.5",
          //         },
          //       ],
          //     },
          //   },

          // }}
        />
      </div>
    </>
  );
};

export default Testing;
