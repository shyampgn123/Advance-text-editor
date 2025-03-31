const main = document.querySelector(".main")
const oBtns = document.querySelectorAll(".obtn")
const writingArea = document.querySelector("#text-box")
const highlight = document.querySelector("#colorPickerback")
const fontClr = document.querySelector("#colorPickerfont")
const linkBtn = document.querySelector(".btn-link")
const selOpt = document.querySelectorAll(".selopt")
const btnDownlode = document.querySelector(".btn-downlode")

document.querySelectorAll(".op").forEach((btn) => {
  let state = true;
    btn.addEventListener("click", () => {
      if(state){
      btn.style.color="white"
    btn.style.backgroundColor="#0070FF"
    state = false
      }else{
        btn.style.color="black"
    btn.style.backgroundColor="white"
    state= true
      }
    })
  })

    const modifyText = (command, defaultUi, value) => {
    
  document.execCommand(command, defaultUi, value);
  writingArea.focus()
};
  
oBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modifyText(btn.id, false, null)
  })
})
linkBtn.addEventListener("click", () => {
  let promp = prompt("Enter the url")
  if (/http/i.test(promp)) {
    modifyText(linkBtn.id, false, promp)
  } else {
    promp = "http://" + promp;
    modifyText(linkBtn.id, false, promp)
  }
})
highlight.addEventListener("input", () => {
  modifyText("hiliteColor", false, highlight.value)
  
})
fontClr.addEventListener("input", () => {
  modifyText("foreColor", false, fontClr.value)
  
})
selOpt.forEach((sel) => {
  sel.addEventListener("change", () => {
    modifyText(sel.id, false, sel.value)
  })
})
function downloadDivAsPDF(divId, fileName) {
    const { jsPDF } = window.jspdf; 

    let divElement = document.getElementById(divId); 
    if (!divElement) {
        console.error("Error: Div not found!");
        return;
    }

    html2canvas(divElement, { scale: 2 }).then(canvas => {
        let imgData = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4'); 

        let imgWidth = 190; 
        let imgHeight = (canvas.height * imgWidth) / canvas.width; 

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight); 
        pdf.save(fileName || 'download.pdf'); 
    });
}
btnDownlode.addEventListener("click", () => {
  downloadDivAsPDF('text-box', 'content.pdf')
})
