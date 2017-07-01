let Emblem = new function() {

    let image;
    let loaded = false;
    let currentRadius;

    let jqWindow;

    this.setUp = function() {
        jqWindow = $(window);

        image = new Image();
        image.onload = () => loaded = true;
        image.src = "./img/mcat.svg";

        Callbacks.addCallback(this.redraw); //TODO: eventually make this not a callback
    }

    this.redraw = function() {
        if (!Config.drawEmblem) {
            return;
        }

        if (!loaded) {
            //return;
        }

        let realBlockSize = Config.blockSize * Util.getResolutionMultiplier();

        console.log(Config.spectrumWidth * Util.getResolutionMultiplier());
        console.log(jqWindow.width());

        let blockOffsetX = (jqWindow.width() - Config.spectrumWidth * Util.getResolutionMultiplier()) / 2;

        let catOffsetX = blockOffsetX + realBlockSize * (1 - Config.emblemWidth) / 2;

        let fullHeight = (Config.spectrumWidth / Config.spectrumAspectRatio + Config.verticalBuffer + Config.blockSize)
                * Util.getResolutionMultiplier();

        let blockOffsetY = (jqWindow.height() + fullHeight) / 2 - realBlockSize;
        
        let catOffsetY = blockOffsetY + realBlockSize * (1 - Config.emblemHeight) / 2;

        Canvas.context.fillStyle = "#000000";
        Canvas.context.beginPath();
        Canvas.context.rect(blockOffsetX, blockOffsetY, realBlockSize, realBlockSize);
        Canvas.context.fill();

        Canvas.context.fillStyle = "#FFFFFF";
        Canvas.context.drawImage(image, catOffsetX, catOffsetY,
                realBlockSize * Config.emblemWidth, realBlockSize * Config.emblemHeight);

        console.log(blockOffsetX + ", " + blockOffsetY);
    }

}
