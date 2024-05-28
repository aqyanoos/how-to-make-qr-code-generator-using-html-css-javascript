
const qrCodeSettings = document.getElementById("qrcode-settings"),
    qrcodeContainer = document.getElementById("qrcode"),
    generateBtn = document.getElementById("generate-btn"),
    downloadBtn = document.getElementById("download-btn"),
    downloadBtnContainer = document.querySelector(".download-btn-container");

qrCodeSettings.onsubmit = function (e) {
    e.preventDefault()

    qrcodeContainer.innerHTML = ""
    const formData_ = new FormData(qrCodeSettings, generateBtn)

    const userInputs = {}

    for (const [key, value] of formData_) {
        userInputs[key] = value
    }

    const settings = {
        text: userInputs.text,
        width: userInputs.qrcodeWidth,
        height: userInputs.qrcodeWidth,
        typeNumber: 4,
        colorDark: userInputs.txtColor,
        colorLight: userInputs.bgColor,
        quietZone: 10,
        quietZoneColor: userInputs.bgColor,
    }

    if (userInputs.customLogo.name) {
        settings.logo = URL.createObjectURL(userInputs.customLogo)
        settings.logoBackgroundColor = userInputs.logoBg
        settings.logoBackgroundTransparent = userInputs.isTransparent
        settings.logoWidth = userInputs.logoWidth
        settings.logoHeight = userInputs.logoWidth
    }
    console.log("user inputs: ", userInputs, settings)
    const qrcode_ = new QRCode(qrcodeContainer, settings)
    downloadBtnContainer.classList.remove("hidden")
}

downloadBtn.onclick = function(){
    const qrcodeImage = document.querySelector("#qrcode canvas")
    const data = qrcodeImage.toDataURL("image/png"),
    aEl = document.createElement("a")
    aEl.href = data
    aEl.download = new Date().toLocaleDateString() + ".png"

    aEl.click()
}