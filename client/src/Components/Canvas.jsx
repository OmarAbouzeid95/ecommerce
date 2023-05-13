// import {useState, useEffect} from 'react'

// canvas images
import canvas1 from '../media/canvas1.png'
import canvas2 from '../media/canvas2.png'
import canvas3 from '../media/canvas3.png'
import canvas4 from '../media/canvas4.png'

function Canvas() {

    // array for canvas banner slideshow
    const canvasImgs = [canvas1, canvas2, canvas3, canvas4]
    // index of the current image
    // const [index, setIndex] = useState(0)

    // function updateBanner() {
    //     // updating Index of the current image
    //     // setIndex(index => (index+1) % (canvasImgs.length))
    // }

    // useEffect(() => {
 
    //     // preloading the images.
    //     canvasImgs.forEach(img => {
    //         const image = new Image()
    //         image.src = img
    //     })

    //     updating the banner each 3 secs
    //     setInterval(updateBanner, 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    return (
        <div className="canvasContainer">
            {/* adding the key attribute so react rerenders the component each time to perform the animation */}
            <img key={0} src={canvasImgs[0]} alt="canvas banner" id="canvasImg" className="animate"/>
        </div>
      )
}

export default Canvas;