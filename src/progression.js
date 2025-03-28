export function createCircularProgressBar(ctx, initialValue = 0) {
    if (!(ctx instanceof CanvasRenderingContext2D)) {
        console.error("Invalid canvas context");
        return;
    }

    const radius = 40;
    const lineWidth = 20;
    const centerX = 50;
    const centerY = 50;

    function drawCircle(progress) {
        ctx.clearRect(0, 0, 100, 100);

        // Background Circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "#fde2e2";
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        // Progress Circle Animation
        let start = 0;
        function animateProgress() {
            ctx.clearRect(0, 0, 100, 100);
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = "#fde2e2";
            ctx.lineWidth = lineWidth;
            ctx.stroke();

            const progressAngle = (start / 100) * 2 * Math.PI;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + progressAngle);
            ctx.strokeStyle = "#ff6b6b";
            ctx.lineWidth = lineWidth;
            ctx.lineCap = "round";
            ctx.stroke();

            // Progress Text
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`${Math.round(start)}%`, centerX, centerY);

            if (start < progress) {
                start += 1;
                requestAnimationFrame(animateProgress);
            }
        }

        animateProgress();
    }

    drawCircle(initialValue);
}

document.addEventListener("DOMContentLoaded", async () => {
    const canvas = document.getElementById("progressCanvas");
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }
    const progressCtx = canvas.getContext("2d");
    if (!progressCtx) {
        console.error("Failed to get 2D context!");
        return;
    }

    try {
        const response = await fetch("public/data.json");
        const data = await response.json();
        createCircularProgressBar(progressCtx, data.dataInput);
    } catch (error) {
        console.error("Error loading data.json", error);
    }
});
