import { SortableList } from "../Sortable/SortableList";

const SortableItems = ({ item }) => (
  <div>
    <div style={{ fontSize: "18px", fontWeight: "bold" }}>{item.title}</div>
    <div style={{ fontSize: "14px", color: "#555", marginTop: "5px" }}>
      <strong>ID:</strong> {item.id}
    </div>
    <div style={{ fontSize: "14px", color: "#555", marginTop: "5px" }}>
      <strong>Description:</strong> {item.description}
    </div>
    <div style={{ fontSize: "14px", color: "#555", marginTop: "5px" }}>
      <strong>Start Date:</strong> {item.startDate}
    </div>
    <div style={{ fontSize: "14px", color: "#555", marginTop: "5px" }}>
      <strong>End Date:</strong> {item.endDate}
    </div>
    <div style={{ marginTop: "10px" }}>
      <SortableList.DragHandle />
    </div>
  </div>
);

export default SortableItems;
