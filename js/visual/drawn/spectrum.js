let Spectrum = new function() {

    const maxBufferSize = Math.max.apply(null, Config.delays);

    let spectrumCache = Array();

    let jqWindow;

    this.setUp = function() {
        Callbacks.addCallback(drawCallback, Priority.EARLY);
        jqWindow = $(window);
    }

    let drawCallback = function(spectrum, multiplier) {
        spectrum = Transform.getTransformedSpectrum(spectrum);

        for (let i = 0; i < spectrum.length; i++) {
            drawBar(spectrum, i);
        }
    }

    let drawBar = function(spectrum, index) {
        let baseX = Util.getXOffset();
        let realWidth = Config.spectrumWidth * Util.getXResolutionMultiplier();

        let barX = baseX + index * (realWidth / spectrum.length);
        let barWidth = (realWidth / spectrum.length) * (1 - Config.barSpacing);

        let specHeight = Util.getSpectrumHeight();

        let barHeight = Math.max(spectrum[index] * specHeight, 1);
        let barY = Util.getYOffset() + specHeight - barHeight;

        Canvas.context.fillStyle = "#FFFFFF";
        Canvas.context.beginPath();
        Canvas.context.rect(barX, barY, barWidth, barHeight);
        Canvas.context.fill();
    }

}
