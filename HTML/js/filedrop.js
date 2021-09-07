document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    // conntects the input element to the dropzone for clicks //
    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });

    //handles the resize event for only the mouse ***css***
    dropZoneElement.addEventListener("mouseover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });

    dropZoneElement.addEventListener("mouseout", (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
    
    //handles the dragover event for file drop ***css***
    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });
  
    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
    

    // fun part for handling the file drop behavior
    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();
      dropZoneElement.classList.remove("drop-zone--over");
      file = e.dataTransfer.files[0];
      const data = new FormData();

      data.append('uploadDoc', file)
      fetch("http://localhost:3000/file/drop", {
        method: "POST",
        body: data,
      });

      /*{
        listElement = document.querySelector('#uploadedFiles');
        const li = document.createElement('li');

        inputElement.files = e.dataTransfer.files;
        file = e.dataTransfer.files[0];
        li.innerHTML = file.name;
        dropZoneElement.appendChild(li)
      }*/
    });
  });