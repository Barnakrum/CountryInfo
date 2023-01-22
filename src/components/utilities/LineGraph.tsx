import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import CountryPopulation from "../../models/UnitedNations/CountryPopulation";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);
ChartJS.defaults.color = "#ffffff";
ChartJS.defaults.borderColor = "#gray";

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
    },
};

export default function LineGraph(props: { countryPopulationData: CountryPopulation[] }) {
    const labels = [...props.countryPopulationData.map((year) => year.timeLabel)];

    return (
        <>
            <div className="chart-container w-96 h-48 relative">
                <Line options={options} data={{ labels: labels, datasets: [{ label: "Population", data: props.countryPopulationData.map((year) => year.value), backgroundColor: "#0d9488", borderColor: "#5eead4" }] }} />
            </div>
        </>
    );
}
