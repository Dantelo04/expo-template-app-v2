import { useFont } from "@shopify/react-native-skia";
import { CartesianChart, Line, Scatter } from "victory-native";
import { useTheme } from "@/context/ThemeContext";

interface ExExChartProps {
  data: { day: number; expense: number; previousExpense: number }[];
}

export const ExExChart = ({ data }: ExExChartProps) => {
  const font = useFont(require("../../assets/fonts/Figtree-Bold.ttf"), 10);
  const { theme } = useTheme();

  const pointRadius = data.length > 30 ? 3 : 6;
  
  return (
    <CartesianChart
      data={data}
      padding={{ bottom: 10, left: 2, right: 6 }}
      xKey="day"
      yKeys={["expense", "previousExpense"]}
      xAxis={{
        font,
        lineWidth: 0,
        lineColor: theme.colors.text.secondary,
        labelColor: theme.colors.text.primary,
      }}
      domainPadding={{ bottom: 55, top: 35, left: 7, right: 7 }}
      frame={{
        lineWidth: 0,
      }}
    >
      {({ points }) => (
        <>
          <Line
            points={points.previousExpense}
            animate={{ type: "spring" }}
            curveType="monotoneX"
            connectMissingData={true}
            color={theme.colors.semantic.warningDark}
            strokeWidth={3}
          />
          <Line
            points={points.expense}
            animate={{ type: "spring" }}
            curveType="monotoneX"
            connectMissingData={true}
            color={theme.colors.semantic.warning}
            strokeWidth={3}
          />
          <Scatter
            points={points.expense}
            animate={{ type: "spring" }}
            radius={pointRadius}
            color={theme.colors.semantic.warning}
          />
          <Scatter
            points={points.previousExpense}
            animate={{ type: "spring" }}
            radius={pointRadius}
            color={theme.colors.semantic.warningDark}
          />
        </>
      )}
    </CartesianChart>
  );
};
