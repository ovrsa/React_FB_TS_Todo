const filterOptions = [
  { value: "notStarted", label: "未着手" },
  { value: "inProgress", label: "作業中" },
  { value: "done", label: "完了" },
];

const Filter = () => {
  return (
    <>
      <select>
        {filterOptions.map(({ value, label }) => (
          <option key value={value}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Filter;
