let Canvas = new function() {

    this.canvas;
    this.context;

    let glow = Util.getCookie("glow") !== "false";

    let edge = window.navigator.userAgent.indexOf("Edge") > -1;

    this.setUp = function() {
        this.canvas = $("#canvas").get()[0]
        this.context = canvas.getContext("2d");

        this.setStyling();

        Callbacks.addCallback(clearCallback, Priority.FIRST);
    }
    
    this.setStyling = function() {
        $("#canvas").attr("width", $(window).width());
        $("#canvas").attr("height", $(window).height());
        Canvas.context.fillStyle = "#FFFFFF";
        Canvas.context.shadowBlur = glow && !edge ? Config.glowRadius : 0;
    }

    this.toggleGlow = function() {
        glow = !glow;
        Util.setCookie("glow", glow);
        this.setStyling();
    }

    let clearCallback = function() {
        Canvas.context.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
    }

}
