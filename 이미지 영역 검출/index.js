(() => {
    const imageInput = document.getElementById('imageInput')
    const fileInput = document.getElementById('fileInput')
    const trans = document.getElementById('trans')

    const canvasInput = document.getElementById('canvasInput')
    const cvsInput = canvasInput.getContext('2d')

    const canvasOutput = document.getElementById('canvasOutput')
    const cvsOutput = canvasOutput.getContext('3d')

    onOpenCvReady = () => { console.log('success Opencv ready') }

    fileInput.addEventListener("change", (e) => {
        imageInput.src = URL.createObjectURL(e.target.files[0]);
    }, false);

    imageInput.onload = () => {
        cvsInput.drawImage(imageInput, 0, 0, 384, 288)
    }

    trans.onclick = () => {
        console.log('trans click event')

        let src = cv.imread(canvasInput);
        let dst = cv.Mat.zeros(src.cols, src.rows, cv.CV_8UC3);
        cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
        cv.threshold(src, src, 127, 255, cv.THRESH_BINARY);
        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();
        // You can try more different parameters
        cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

        console.log(contours.size())
        // draw contours with random Scalar
        for (let i = 0; i < contours.size(); ++i) {
            let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
                Math.round(Math.random() * 255));
            cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
        }
        cv.imshow(canvasOutput, src);
        src.delete(); dst.delete(); contours.delete(); hierarchy.delete();
    }
})()

// let src = cv.imread('canvasInput');
// let dst = cv.Mat.zeros(src.cols, src.rows, cv.CV_8UC3);
// cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
// cv.threshold(src, src, 120, 200, cv.THRESH_BINARY);
// let contours = new cv.MatVector();
// let hierarchy = new cv.Mat();
// // You can try more different parameters
// cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
// // draw contours with random Scalar
// for (let i = 0; i < contours.size(); ++i) {
//     let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
//         Math.round(Math.random() * 255));
//     cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
// }
// cv.imshow('canvasOutput', dst);
// src.delete(); dst.delete(); contours.delete(); hierarchy.delete();


// 외각선 검출
// let src = cv.imread(canvasInput);
// let dst = new cv.Mat();
// cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);


// let ksize = new cv.Size(3, 3);
// cv.GaussianBlur(src, src, ksize, 0, 0, cv.BORDER_DEFAULT);
// cv.Canny(src, src, 50, 100, 3, false);

// cv.imshow(canvasOutput, src);
// src.delete();
// dst.delete();