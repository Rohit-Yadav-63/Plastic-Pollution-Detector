const styles = {
  Low: "bg-green-50 text-green-800",
  Moderate: "bg-amber-50 text-amber-800",
  Medium: "bg-amber-50 text-amber-800",
  High: "bg-rose-50 text-rose-700",
};
export default function SeverityBadge({ severity }) {
  return (
    <span
      className={
        "rounded-full px-2.5 py-1 text-xs font-semibold " +
        (styles[severity] || styles.Low)
      }
    >
      {severity || "Low"}
    </span>
  );
}
