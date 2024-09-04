import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { rows, columns } from "../lib/data";
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
  const handleAddFilter = () => {
    setFilters([...filters, {}]); // Add a new filter card
  };

  const handleDeleteFilter = () => {
    if (filters.length > 1) {
      setFilters(filters.slice(0, -1)); // Remove the last filter card
    }
  };

  return (
    <>
      <div className="my-6 py-10">
        <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Multi filtering columns</h1>
        <button className="bg-black text-white px-6 rounded-full hover:text-red-500">search</button>
        </div>
        {filters.map((filter, index) => (
          <div key={index} className="card mt-10 flex flex-col gap-2">
            <div className="flex gap-2">
              <p>where</p>
              <Select>
                <SelectTrigger className="w-[140px] text-white">
                  <SelectValue placeholder="Kolom" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[140px] text-white">
                  <SelectValue placeholder="kondisi" />
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
              <Input
                type="text"
                placeholder="value...."
                className="w-[200px] text-white"
              />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[70px] text-white">
                  <SelectValue placeholder="operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contains">and</SelectItem>
                  <SelectItem value="equals">or</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[140px] text-white">
                  <SelectValue placeholder="Kolom" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[140px] text-white">
                  <SelectValue placeholder="kondisi" />
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
              <Select>
                <SelectTrigger className="w-[140px] text-white">
                  <SelectValue placeholder="sabuk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kuning">kuning</SelectItem>
                  <SelectItem value="merah">merah</SelectItem>
                  <SelectItem value="hijau">hijau</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative mt-2">
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300"></div>
            </div>
          </div>
        ))}
        <div className="my-2">
          <div className="flex my-4 hover:text-red-500" onClick={handleAddFilter}>
            <Plus size={32} className="font-bold cursor-pointer" />
            <button className="font-bold ms-2">Add filter</button>
          </div>
          <div className="relative mt-2">
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300"></div>
          </div>
          <div className="flex mt-7 hover:text-red-500" onClick={handleDeleteFilter}>
            <Trash size={32} className="font-bold cursor-pointer" />
            <button className="font-bold ms-2">Delete filter</button>
          </div>
        </div>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
          initialState={{
            filter: {
              filterModel: {
                items: [
                  {
                    field: "rating",
                    operator: ">",
                    value: "2.5",
                  },
                ],
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default Testing;
