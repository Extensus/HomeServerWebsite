document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
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
  
    dropZoneElement.addEventListener("drop", (e) => { //Drag-Drop prevent default reaction
      e.preventDefault();
  
      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }
  
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });
  
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