dashboard = document.querySelector(".dashboard-wrapper");

dashboard.addEventListener("mousemove", (e) => {
    light.style.left = `${e.clientX}px`;
    light.style.top = `${e.clientY}px`;
});