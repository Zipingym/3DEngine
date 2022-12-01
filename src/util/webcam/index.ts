export default class Webcam {
    constructor (
        video: HTMLVideoElement
    ) {
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
            devices.forEach((device) => {
                console.log(device)
                if(device.kind == "videoinput" && !device.label.includes("Virtual") && device.label.includes("C930c")) {
                    navigator.mediaDevices.getUserMedia({
                            video: { 
                                width: { ideal: 1920 }, 
                                height: { ideal: 1080 },
                                deviceId: { exact: device.deviceId }
                            }, 
                            audio: false,
                        }).then((stream) => {
                            video.srcObject = stream;
                        }).catch((error) => {
                            alert("Can't use Webcam")
                            console.log(error)
                        })
                    }
                });
            })
            .catch((err) => {
                console.error(`${err.name}: ${err.message}`);
            });
    }
}