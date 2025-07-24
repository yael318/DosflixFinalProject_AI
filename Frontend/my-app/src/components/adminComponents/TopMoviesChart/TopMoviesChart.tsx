import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Divider } from "@mui/material";

const data = [
  { name: "סרט 1", views: 540 },
  { name: "סרט 2", views: 390 },
  { name: "סרט 3", views: 280 },
  { name: "סרט 4", views: 150 },
];

const COLORS = ["#00bcd4", "#4dd0e1", "#80deea", "#b2ebf2"];

export default function TopMoviesChart() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        height: 290,
        p: 2,
        direction: "rtl",
      }}
    >
    

      {/* <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            dataKey="views"
            nameKey="name"
            outerRadius={100}
            innerRadius={50}
            // ביטול תוויות ישירות על התרשים
            label={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `${value} צפיות`}
            labelFormatter={(label: string) => `🎥 ${label}`}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer> */}
      <ResponsiveContainer width="100%" height="80%">
  <PieChart>
    <Pie
      data={data}
      dataKey="views"
      nameKey="name"
      outerRadius={80}
      innerRadius={50}
      label={false}
    >
      {data.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={COLORS[index % COLORS.length]}
        />
      ))}
    </Pie>
    <Tooltip
      formatter={(value: number) => `${value} צפיות`}
      labelFormatter={(label: string) => `🎥 ${label}`}
    />
    <Legend
      layout="vertical"
      align="right"
      verticalAlign="middle"
      iconType="circle"
      wrapperStyle={{
        marginLeft: 20, // <<== הרווח בין העוגה למקרא
      }}
    />
  </PieChart>
</ResponsiveContainer>

    </Box>
  );
}
