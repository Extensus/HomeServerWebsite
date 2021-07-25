const dropZoneElement = document.getElementById('.drop-zone');

let interval = null;
dropZoneElement.addEventListener('change', (event) => {
    clearInterval(interval); 
    interval = setInterval(frame, 5);
    let width = 0;
    let height = 0;
    function resize() {
        if (width == 800) {
            clearInterval(interval);
        } else {
            width++;
            //height = width/4;
            dropZoneElement.style.width = width + 'px';
            //dropZoneElement.style.height = height + 'px';
        }
    }
})