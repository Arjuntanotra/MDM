import { useState } from "react";
import Select from "react-select";
import { ChevronDown } from "lucide-react";

export default function MaterialForm() {
  const [formData, setFormData] = useState({
    type: "",
    group: "",
    subgroup: "",
    size: "",
    grade: "",
    finishSpec: "",
    description: "",
    uom: "",
    altUom: "",
    rate: "",
    category: "",
    plantCode: "",
    storageLocation: "",
    salesOrg: "",
    distChannel: "",
    profitCenter: "",
    hsnCode: "",
    poUnit: "",
  });

  // Generate 1–1000 dropdown options
  const dropdownOptions = Array.from({ length: 1000 }, (_, i) => ({
    value: `Option ${i + 1}`,
    label: `Option ${i + 1}`,
  }));

  // Helper for setting state
  const handleSelectChange = (name, selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption?.value || "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "finishSpec" && value.length > 40) return;
    if (name === "description" && value.length > 100) return;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Generate code = Year + random chars
  //   const year = new Date().getFullYear();
  //   const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  //   const materialCode = `${year}-${random}`;

  //   console.log("Material Code:", materialCode);
  //   console.log("Form Data Submitted:", formData);

  //   alert(`Material Saved ✅\nGenerated Code: ${materialCode}`);
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Generate unique material code if empty
  const payload = {
    ...formData,
    material_code: formData.material_code || "MAT" + Date.now(),
  };

  try {
    const response = await fetch("http://localhost:5000/api/materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Save failed: " + response.statusText);
    }

    const result = await response.json();
    console.log("✅ Saved material:", result);

    // ✅ Show proper ID
    alert("Material saved successfully with ID: " + (result.id || result.material_code));
  } catch (err) {
    console.error("Save failed:", err);
    alert("Save failed: " + err.message);
  }
};



  // Custom style for react-select
  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: "#CBD5E0",
      boxShadow: "none",
      "&:hover": { borderColor: "#6366F1" },
      minHeight: "42px",
    }),
  };

  // Custom dropdown indicator
  const DropdownIndicator = () => <ChevronDown size={18} className="mr-2 text-gray-500" />;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex-grow w-full bg-white p-10">
        <h1 className="text-4xl font-bold mb-10 text-center text-indigo-700">
          Material Master
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <Select
              options={dropdownOptions}
              value={formData.type ? { value: formData.type, label: formData.type } : null}
              onChange={(opt) => handleSelectChange("type", opt)}
              styles={customStyles}
              components={{ DropdownIndicator }}
              placeholder="Select Type..."
              isSearchable
            />
          </div>

          {/* Group */}
          <div>
            <label className="block text-sm font-medium mb-1">Group</label>
            <Select
              options={dropdownOptions}
              value={formData.group ? { value: formData.group, label: formData.group } : null}
              onChange={(opt) => handleSelectChange("group", opt)}
              styles={customStyles}
              components={{ DropdownIndicator }}
              placeholder="Select Group..."
              isSearchable
            />
          </div>

          {/* Subgroup */}
          <div>
            <label className="block text-sm font-medium mb-1">Subgroup</label>
            <Select
              options={dropdownOptions}
              value={
                formData.subgroup
                  ? { value: formData.subgroup, label: formData.subgroup }
                  : null
              }
              onChange={(opt) => handleSelectChange("subgroup", opt)}
              styles={customStyles}
              components={{ DropdownIndicator }}
              placeholder="Select Subgroup..."
              isSearchable
            />
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-medium mb-1">Size</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Grade */}
          <div>
            <label className="block text-sm font-medium mb-1">Grade</label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Finish Spec */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Finish Specification (max 40 chars)
            </label>
            <input
              type="text"
              name="finishSpec"
              value={formData.finishSpec}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium mb-1">
              Description (max 100 chars)
            </label>
            <textarea
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            ></textarea>
          </div>

          {/* UoM */}
          <div>
            <label className="block text-sm font-medium mb-1">UoM</label>
            <Select
              options={[
                { value: "KG", label: "KG" },
                { value: "LTR", label: "LTR" },
                { value: "NOS", label: "NOS" },
              ]}
              value={formData.uom ? { value: formData.uom, label: formData.uom } : null}
              onChange={(opt) => handleSelectChange("uom", opt)}
              styles={customStyles}
              components={{ DropdownIndicator }}
              placeholder="Select UoM..."
              isSearchable
            />
          </div>

          {/* Alt UoM */}
          <div>
            <label className="block text-sm font-medium mb-1">Alt UoM</label>
            <input
              type="text"
              name="altUom"
              value={formData.altUom}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Rate */}
          <div>
            <label className="block text-sm font-medium mb-1">Rate</label>
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Select
              options={[
                { value: "Raw", label: "Raw" },
                { value: "Finished", label: "Finished" },
                { value: "Semi", label: "Semi" },
              ]}
              value={formData.category ? { value: formData.category, label: formData.category } : null}
              onChange={(opt) => handleSelectChange("category", opt)}
              styles={customStyles}
              components={{ DropdownIndicator }}
              placeholder="Select Category..."
              isSearchable
            />
          </div>

          {/* Plant Code */}
          <div>
            <label className="block text-sm font-medium mb-1">Plant Code</label>
            <Select
              options={[
                { value: "P001", label: "P001" },
                { value: "P002", label: "P002" },
              ]}
              value={formData.plantCode ? { value: formData.plantCode, label: formData.plantCode } : null}
              onChange={(opt) => handleSelectChange("plantCode", opt)}
              styles={customStyles}
              components={{ DropdownIndicator }}
              placeholder="Select Plant Code..."
              isSearchable
            />
          </div>

          {/* Storage Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Storage Location</label>
            <Select
              options={[
                { value: "S001", label: "S001" },
                { value: "S002", label: "S002" },
              ]}
              value={
                formData.storageLocation
                  ? { value: formData.storageLocation, label: formData.storageLocation }
                  : null
              }
              onChange={(opt) => handleSelectChange("storageLocation", opt)}
              styles={customStyles}
              components={{ DropdownIndicator }}
              placeholder="Select Storage Location..."
              isSearchable
            />
          </div>

          {/* Sales Org */}
          <div>
            <label className="block text-sm font-medium mb-1">Sales Org</label>
            <Select
              options={[
                { value: "SO01", label: "SO01" },
                { value: "SO02", label: "SO02" },
              ]}
              value={formData.salesOrg ? { value: formData.salesOrg, label: formData.salesOrg } : null}
              onChange={(opt) => handleSelectChange("salesOrg", opt)}
              styles={customStyles}
              components={{ DropdownIndicator }}
              placeholder="Select Sales Org..."
              isSearchable
            />
          </div>

          {/* Dist Channel */}
          <div>
            <label className="block text-sm font-medium mb-1">Dist Channel</label>
            <Select
              options={[
                { value: "D1", label: "D1" },
                { value: "D2", label: "D2" },
              ]}
              value={formData.distChannel ? { value: formData.distChannel, label: formData.distChannel } : null}
              onChange={(opt) => handleSelectChange("distChannel", opt)}
              styles={customStyles}
              components={{ DropdownIndicator }}
              placeholder="Select Dist Channel..."
              isSearchable
            />
          </div>

          {/* Profit Center */}
          <div>
            <label className="block text-sm font-medium mb-1">Profit Center</label>
            <Select
              options={[
                { value: "PC01", label: "PC01" },
                { value: "PC02", label: "PC02" },
              ]}
              value={
                formData.profitCenter
                  ? { value: formData.profitCenter, label: formData.profitCenter }
                  : null
              }
              onChange={(opt) => handleSelectChange("profitCenter", opt)}
              styles={customStyles}
              components={{ DropdownIndicator }}
              placeholder="Select Profit Center..."
              isSearchable
            />
          </div>

          {/* HSN Code */}
          <div>
            <label className="block text-sm font-medium mb-1">HSN Code</label>
            <input
              type="text"
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* PO Unit */}
          <div>
            <label className="block text-sm font-medium mb-1">PO Unit</label>
            <Select
              options={[
                { value: "BOX", label: "BOX" },
                { value: "PKT", label: "PKT" },
              ]}
              value={formData.poUnit ? { value: formData.poUnit, label: formData.poUnit } : null}
              onChange={(opt) => handleSelectChange("poUnit", opt)}
              styles={customStyles}
              components={{ DropdownIndicator }}
              placeholder="Select PO Unit..."
              isSearchable
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-3 flex justify-end gap-4 mt-6">
            <button
              type="reset"
              className="bg-gray-200 px-5 py-2 rounded hover:bg-gray-300"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-700"
            >
              Save Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
