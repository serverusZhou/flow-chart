
class Util {
    public static getHTMLImageElement(imgSrc: string): HTMLImageElement {
        const image = new Image();
        image.src = imgSrc;
        return image;
    }
}

export default Util;
