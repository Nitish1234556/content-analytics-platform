"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  // SORT + TAKE TOP 5 ONLY
  const topData = [...data]
    .sort((a, b) => b.engagement_score - a.engagement_score)
    .slice(0, 5);

  const formattedData = topData.map((item) => ({
    name: `C${item.content_id}`,
    score: Number(item.engagement_score),
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="name"
          interval={0}
          angle={-15}
          textAnchor="end"
          height={80}
        />

        <YAxis />
        <Tooltip />

        <Bar dataKey="score" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
}