// ---------- Main Component ----------
export default function MaterialForm() {
  const [formData, setFormData] = useState({
    material_code: "",       // ✅ add this
    type: "",
    group: "",
    subgroup: "",
    size: "",
    grade: "",
    finish_specification: "", // ✅ single field
    description: "",
    uom: "",
    alt_uom: "",             // ✅ optional
    rate: "",
    category: "",
    plant_code: "",
    storage_location: "",
    sales_org: "",
    dist_channel: "",
    profit_center: "",
    hsn_code: "",
    po_unit: "",
  });

  const handleChange = (name, value) =>
    setFormData({ ...formData, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Generate unique material code if empty
    const payload = {
      ...formData,
      material_code:
        formData.material_code || "MAT" + Date.now(), // ex: MAT1692812823
    };

    try {
      console.log("test");
      const res = await fetch("http://localhost:5000/api/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      console.log("✅ Saved:", data);
      alert("Material saved successfully!");
    } catch (err) {
      console.error("❌ Save failed:", err);
      alert("Save failed: " + err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-screen h-screen bg-gray-100 flex items-center justify-center"
    >
      <Card className="w-full h-full bg-white shadow-2xl rounded-none overflow-auto">
        <CardHeader className="bg-blue-600 text-white p-6">
          <h2 className="text-3xl font-bold">📦 Material Master Entry</h2>
          <p className="text-sm opacity-80">
            Fill in the details below to add a new material to the system.
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
            
            {/* Type */}
            <SearchableDropdown
              label="Type"
              value={formData.type}
              onChange={(v) => handleChange("type", v)}
              items={TYPES.map((t) => t.code)}
              placeholder="Select Type"
            />

            {/* Group */}
            <SearchableDropdown
              label="Group"
              value={formData.group}
              onChange={(v) => handleChange("group", v)}
              items={formData.type ? GROUPS[formData.type] : []}
              placeholder="Select Group"
            />

            {/* Subgroup (if you need it) */}
            <div>
              <Label>Subgroup</Label>
              <Input
                value={formData.subgroup}
                onChange={(e) => handleChange("subgroup", e.target.value)}
              />
            </div>

            {/* Inputs */}
            <div>
              <Label>Size</Label>
              <Input
                value={formData.size}
                onChange={(e) => handleChange("size", e.target.value)}
              />
            </div>

            <div>
              <Label>Grade</Label>
              <Input
                value={formData.grade}
                onChange={(e) => handleChange("grade", e.target.value)}
              />
            </div>

            <div>
              <Label>Finish Specification (max 40 chars)</Label>
              <Input
                maxLength={40}
                value={formData.finish_specification}
                onChange={(e) =>
                  handleChange("finish_specification", e.target.value)
                }
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <Label>Description (max 100 chars)</Label>
              <Input
                maxLength={100}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            {/* Dropdowns */}
            <SearchableDropdown
              label="UOM"
              value={formData.uom}
              onChange={(v) => handleChange("uom", v)}
              items={UOMS}
              placeholder="Select UOM"
            />

            <div>
              <Label>Alt UOM</Label>
              <Input
                value={formData.alt_uom}
                onChange={(e) => handleChange("alt_uom", e.target.value)}
              />
            </div>

            <SearchableDropdown
              label="Category"
              value={formData.category}
              onChange={(v) => handleChange("category", v)}
              items={CATEGORIES}
              placeholder="Select Category"
            />

            {/* etc... keep others same */}

          </CardContent>

          <CardFooter className="flex justify-center bg-gray-50 p-6">
            <Button type="submit" className="px-10 py-4 text-lg">
              💾 Save Material
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
