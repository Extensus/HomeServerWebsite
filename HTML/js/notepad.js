const fileUploadToServer = () => {
    let textareaData = $('#primary-note').val().toString();
    let filename = $('#filename').val();
    let txtBlob = new Blob([textareaData], { type: "text/plain" });
    let file = new File([txtBlob], `${filename}.txt`, {type: "text/plain"});
    const data = new FormData();

      data.append('uploadNote', file)
      fetch("http://localhost:3000/notepad", {
        method: "POST",
        body: data,
      });
};
document.getElementById("file-submit").addEventListener("click", fileUploadToServer);
