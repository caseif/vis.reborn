let Util = new function() {

    let resMultX = 1;
    let resMultY = 1;

    let jqWindow;

    this.setUp = function() {
        String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, "g"), replacement);
        };

        jqWindow = $(window);

        Callbacks.addCallback(updateResolutionMultipliers);
    }

    this.getCurrentUrlPrefix = function() {
        return window.location.href.split("/")[0] + "//" + window.location.hostname //TODO: check if I can just use //
                + window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"));
    }

    this.random = function(min, max) {
        return Math.random() * (max - min) + min;
    }

    this.secondsToHms = function(seconds) {
        seconds = Number(seconds);
        let h = Math.floor(seconds / 3600);
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 3600 % 60);
        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    }

    this.shuffle = function(arr) {
        for (let i = arr.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
        }
    }

    this.getXResolutionMultiplier = function() {
        return resMultX;
    }

    this.getYResolutionMultiplier = function() {
        return resMultY;
    }

    let updateResolutionMultipliers = function() {
        resMultX = jqWindow.width() / 1920;
        resMultY = jqWindow.height() / 1080;
    }

    this.clamp = function(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    this.getCookie = function(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
    }

    this.setCookie = function(name, value) {
        document.cookie = name + "=" + value + "; expires=Fri, 01 Jan 2038 00:00:00 UTC";
    }

    this.deleteCookie = function(name) {
        document.cookie = name + "=undefined" + "; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }

    this.shuffle = function(arr) {
        for (let i = arr.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
        }
    }

    this.range = function(len) {
        return [...Array(len).keys()];
    }

    this.getXOffset = function() {
        return (jqWindow.width() - Config.spectrumWidth * Util.getXResolutionMultiplier()) / 2;
    }

    this.getYOffset = function() {
        return (jqWindow.height() - this.getDrawAreaHeight()) / 2;
    }

    this.getDrawAreaHeight = function() {
        return this.getSpectrumHeight() + (Config.verticalBuffer + Config.blockSize) * this.getYResolutionMultiplier()
    }

    this.getSpectrumHeight = function() {
        return (Config.spectrumWidth / Config.spectrumAspectRatio) * this.getYResolutionMultiplier()
    }

}
