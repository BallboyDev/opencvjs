(() => {
    const imageInput = document.getElementById('imageInput')
    const fileInput = document.getElementById('fileInput')
    const trans = document.getElementById('trans')

    const canvasInput = document.getElementById('canvasInput')
    const cvsInput = canvasInput.getContext('2d')

    const canvasOutput = document.getElementById('canvasOutput')
    const cvsOutput = canvasOutput.getContext('2d')

    onOpenCvReady = () => { console.log('success Opencv ready') }

    fileInput.addEventListener("change", (e) => {
        imageInput.src = URL.createObjectURL(e.target.files[0]);
    }, false);

    imageInput.onload = () => {
        cvsInput.drawImage(imageInput, 0, 0, 384, 288)
    }

    let index = 0
    let point = { // 'Z'
        p1: [0, 0],
        p2: [0, 0],
        p3: [0, 0],
        p4: [0, 0]
    }
    canvasInput.onclick = (e) => {
        index++
        point[`p${index}`] = [e.clientX - cvsInput.canvas.offsetLeft, e.clientY - cvsInput.canvas.offsetTop]
        console.log('point >> ', point[`p${index}`])
    }

    canvasOutput.onclick = (e) => {
        console.log(e.clientX - canvasOutput.offsetLeft, e.clientY - canvasOutput.offsetTop)
    }

    trans.onclick = () => {
        console.log([...point.p1, ...point.p2, ...point.p3, ...point.p4])

        let src = cv.imread(imageInput)
        let dst = new cv.Mat()
        let dsize = new cv.Size(src.rows, src.cols)

        // 포지션 지정에 대한 연구가 필요합니다.
        let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [...point.p1, ...point.p2, ...point.p3, ...point.p4])
        let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, 288, 0, 0, 384, 288, 384]);
        let M = cv.getPerspectiveTransform(srcTri, dstTri);

        cv.warpPerspective(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());

        cv.imshow(canvasOutput, dst);
        src.delete(); dst.delete(); M.delete(); srcTri.delete(); dstTri.delete();
    }
})()