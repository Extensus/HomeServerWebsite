<<<<<<< Updated upstream
document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
  
    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });
  
    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });
  
    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
=======
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

function dropZoneHandler(item) {
    const dropZoneElement = item.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => { //Listener
        item.click();
    });

    item.addEventListener("change", (e) => { //Listener
        if (item.files.length) {
            updateThumbnail(dropZoneElement, item.files[0]);
        }
>>>>>>> Stashed changes
    });
  
    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
  
    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();
  
      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }
  
      dropZoneElement.classList.remove("drop-zone--over");
    });
<<<<<<< Updated upstream
  });
  
  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
  
    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
=======

    dropArea.addEventListener("drop", (e) => { //OnDrop Action Handler
        e.preventDefault();

        //var items = e.dataTransfer.items;
        //getFilesFromWebkitDataTransferItems(items)
        //    .then(files => {
        //        {}
        //    });
        //if (e.dataTransfer.files.length) {
        //    item.files = e.dataTransfer.files;
        //    updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        //}

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
>>>>>>> Stashed changes
    }
  
    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }
  
    thumbnailElement.dataset.label = file.name;
  
    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }