const fileUploadToServer = () => {
    let textareaData = $('#primary-note').val().toString();
    let filename = $('#filename').val();
    console.log(`${textareaData}\n${typeof textareaData}`)
    let txtBlob = new Blob([textareaData], { type: "text/plain" });
    console.log(txtBlob)
    let file = new File([txtBlob], `${filename}.txt`, {type: "text/plain"});
    console.log(file);
    let data = new FormData();
    data.append('uploadNotes', file)
    console.log(data)
    fetch("http://localhost:3000/notepad", {
        method: "POST",
        body: data,
        });
};
document.getElementById("file-submiter").addEventListener("click", fileUploadToServer);


/*function saveDynamicDataToServer(){
    let textareaData = $('#primary-note').val();
    let filename = $('#filename').val();
    const blob = new Blob([textareaData], { type: "text/plain;charset=utf-8" });
    file = new File([textareaData], `${filename}.txt`, {type: "text/plain"});
    const data = new FormData();
    data.append('uploadNotes', file)
    console.log(data.values())
    fetch("http://localhost:3000/note/pad", {
        method: "POST",
        body: data,
        });
    };
function savetextarea(){
    var txt = document.getElementById("textArea").value;
    document.getElementById("saveinput").value = txt;
    document.forms["aForm"].submit();
    }*/
