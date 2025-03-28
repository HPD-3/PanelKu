import Chart from "chart.js/auto";
import { fetchData } from "./datahandler.js"; // ✅ Import fungsi fetch

export async function loadDashboard() {
    document.addEventListener("DOMContentLoaded", async () => {
        const data = await fetchData(); // ✅ Ambil data dari data.json

        if (!data) {
            console.error("Failed to load data.");
            return;
        }

        const { labels, values, powerOutput, totalEnergy, panelHealth } = data;

        // **🎯 Grafik Power Input**
        const ctxPowerInput = document.getElementById("powerInputChart")?.getContext("2d");
        if (ctxPowerInput) {
            const gradient = ctxPowerInput.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, "rgba(52, 152, 219, 0.5)");
            gradient.addColorStop(1, "rgba(52, 152, 219, 0)");

            new Chart(ctxPowerInput, {
                type: "line",
                data: {
                    labels,
                    datasets: [{
                        label: "Power Produced (W)",
                        data: values,
                        borderColor: "#3498db",
                        backgroundColor: gradient,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 6,
                        pointBackgroundColor: "white",
                        pointBorderColor: "#3498db",
                        fill: true,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: "white",
                            titleColor: "#000",
                            bodyColor: "#000",
                            borderColor: "#3498db",
                            borderWidth: 1,
                            bodyFont: { size: 14 }
                        }
                    },
                    scales: {
                        x: { grid: { display: false } },
                        y: { beginAtZero: true, grid: { color: "#eee" } }
                    }
                }
            });
        }

        // **🎯 Grafik Power Output**
        const ctxPowerOutput = document.getElementById('powerOutputChart')?.getContext('2d');
        if (ctxPowerOutput) {
            createBarChart(ctxPowerOutput, labels, powerOutput, ['rgba(255, 99, 132, 0.5)', 'rgba(255, 205, 86, 0.5)'], 'Power Output (kWh)');
        }

        // **🎯 Grafik Total Energy (Tanpa Persentase)**
        const ctxTotalEnergy = document.getElementById('totalEnergyChart')?.getContext('2d');
        if (ctxTotalEnergy) {
            new Chart(ctxTotalEnergy, {
                type: 'doughnut',
                data: {
                    labels: ['Solar Energy', 'Battery Storage', 'Grid Usage'],
                    datasets: [{
                        label: 'Total Energy Produced',
                        data: totalEnergy,
                        backgroundColor: ['rgba(255, 165, 0, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(128, 128, 128, 0.5)'],
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: true, position: 'top' },
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    return `${tooltipItem.label}: ${tooltipItem.raw} kWh`; // **Tanpa persen, hanya kWh**
                                }
                            }
                        }
                    },
                    cutout: '65%',
                }
            });
        }

        // **🎯 Grafik Panel Health dengan Bagian Redup**
        function createDoughnutChart(ctx, label, value, brightColor) {
            let dimColor = "rgba(200, 200, 200, 0.5)"; // Warna redup untuk sisa %

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: [label, "Remaining"],
                    datasets: [{
                        data: [value, 100 - value], // Bagian sehat dan sisa
                        backgroundColor: [brightColor, dimColor], // Warna utama & redup
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                    },
                    cutout: "65%",
                },
                plugins: [{
                    beforeDraw: function (chart) {
                        let width = chart.width, height = chart.height, ctx = chart.ctx;
                        ctx.restore();
                        let fontSize = (height / 100).toFixed(2);
                        ctx.font = fontSize + "em sans-serif";
                        ctx.textBaseline = "middle";
                        let text = value + "%", // Tampilkan persentase di tengah
                            textX = Math.round((width - ctx.measureText(text).width) / 2),
                            textY = height / 2;
                        ctx.fillText(text, textX, textY);
                        ctx.save();
                    }
                }]
            });
        }

        // **🎯 Fungsi untuk Membuat Bar Chart**
        function createBarChart(ctx, labels, data, colors, title) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: title,
                        data: data,
                        backgroundColor: colors,
                        borderColor: colors.map(color => color.replace('0.5', '1')),
                        borderWidth: 2,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: true, position: 'top' }
                    },
                    scales: {
                        x: { grid: { display: false } },
                        y: { beginAtZero: true, grid: { color: "#eee" } }
                    }
                }
            });
        }

        // **🎯 Grafik Kesehatan Panel dengan Bagian Redup**
        const ctxPanelPhysicalCondition = document.getElementById("panelPhysicalConditionChart")?.getContext("2d");
        if (ctxPanelPhysicalCondition) {
            createDoughnutChart(ctxPanelPhysicalCondition, "Panel Physical Condition", panelHealth[0], "#ff6384");
        }

        const ctxBatteryHealth = document.getElementById("batteryHealthChart")?.getContext("2d");
        if (ctxBatteryHealth) {
            createDoughnutChart(ctxBatteryHealth, "Battery Health", panelHealth[1], "#2ecc71");
        }

        const ctxPanelEfficiency = document.getElementById("panelEfficiencyChart")?.getContext("2d");
        if (ctxPanelEfficiency) {
            createDoughnutChart(ctxPanelEfficiency, "Panel Efficiency", panelHealth[2], "#3498db");
        }
    });
}
