function getFilesWebkitDataTransferItems(dataTransferItems) {
    function traverseFileTreePromise(item, path = '') {
        return new Promise(resolve => {
            if (item.isFile) {
                item.file(file => {
                    file.filepath = path + file.name //save full path
                    files.push(file)
                    resolve(file)
                })
            } else if (item.isDirectory) {
                let dirReader = item.createReader()
                dirReader.readEntries(entries => {
                    let entriesPromises = []
                    for (let entr of entries)
                        entriesPromises.push(traverseFileTreePromise(entr, path + item.name + "/"))
                    resolve(Promise.all(entriesPromises))
                })
            }
        })
    }

    let files = []
    return new Promise((resolve, reject) => {
        let entriesPromises = []
        for (let it of dataTransferItems)
            entriesPromises.push(traverseFileTreePromise(it.webkitGetAsEntry()))
        Promise.all(entriesPromises)
            .then(entries => {
                //console.log(entries)
                resolve(files)
            })
    })
}

function dropZoneHandler(inputElement) {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => { //Listener
        inputElement.click();
    });

    inputElement.addEventListener("change", (e) => { //Listener
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
    });

    dropZoneElement.addEventListener("dragover", (e) => { //Listener
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => { //Drag-Drop Handler
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

    dropArea.addEventListener("drop", (e) => { //OnDrop Action Handler
        e.preventDefault();

        var items = e.dataTransfer.items;
        getFilesFromWebkitDataTransferItems(items)
            .then(files => {
                {}
            });
        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

    }, false);

    /**
     * Updates the thumbnail on a drop zone element.
     *
     * @param {HTMLElement} dropZoneElement
     * @param {File} file
     */

    let uploadedFiles = [];

    function updateThumbnail(dropZoneElement, file) {
        let dropPrompt = document.getElementById('temp-text');
        let elementUploaded = document.getElementById('uploadedFiles');

        if (!elementUploaded) {
            dropPrompt.remove();
            uploadedFiles.forEach((item) => {
                let li = document.createElement('li');
                li.innerText = item;
                elementUploaded.appendChild(li);
            });
        }
    }
}

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    dropZoneHandler(inputElement)
})