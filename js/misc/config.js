let Config = new function() {
    // analyzer config
    this.temporalSmoothing = 0.2;
    this.minDecibels = -100;
    this.maxDecibels = -33;
    this.fftSize = 16384;

    // emblem config
    this.emblemWidth = 0.63;
    this.emblemHeight = 0.73;
    this.blockSize = 192;
    this.verticalBuffer = 50; // buffer between spectrum and emblem/song info

    // transform config
    this.startBin = 4;
    this.endBin = 1200;
    this.visualBins = 63;
    this.spectrumScale = 2.5; // the logarithmic scale to adjust spectrum values to
    this.spectrumMaxExponent = 6; // the max exponent to raise spectrum values to
    this.spectrumMinExponent = 3; // the min exponent to raise spectrum values to
    this.spectrumExponentScale = 2; // the scale for spectrum exponents
    
    this.headMargin = 7; // the size of the head margin dropoff zone
    this.tailMargin = 0; // the size of the tail margin dropoff zone
    this.minMarginWeight = 0.7; // the minimum weight applied to bars in the dropoff zone

    // spectrum config
    this.spectrumWidth = 1568;
    this.spectrumAspectRatio = 4.5;

    this.barSpacing = 0.3;

    this.smoothingPasses = 1;
    this.smoothingPoints = 3;
    this.glowRadius = 25;

    // particle config
    this.maxParticleCount = 2400; // particle count at 1080p
    this.particleMaxSpawnRate = 8; // max particles to spawn each frame. this takes effect during particle initlzn.
    this.particleOpacityMin = 0.9;
    this.particleOpacityMax = 1;
    this.particleSizeMin = 8;
    this.particleSizeMax = 13;
    this.cameraZPlane = 200; // the z-plane on which to place the camera
    this.particleDespawnBuffer = 0; // distance from the camera z-plane before despawning particles
    this.particleRadiusMin = 10; // the minimum radius of the particle cone at the z-plane intersecting the camera
    this.particleRadiusMax = 120; // the maximum radius of the particle cone at the z-plane intersecting the camera
    this.particleBaseSpeed = 0.15;
    this.particleSpeedMultMin = 1.1;
    this.particleSpeedMultMax = 1.45;
    // The min/max phase speed a particle may be assigned. This is a property of each particle and does not change.
    this.particlePhaseSpeedMin = 0.1;
    this.particlePhaseSpeedMax = 0.25;
    // The min/max phase amplitude a particle may be assigned. This is a property of each particle and does not change.
    this.particlePhaseAmplitudeMin = 0.05;
    this.particlePhaseAmplitudeMax = 0.4;
    // The min/max to normalize the particle phase speed multiplier to.
    this.particlePhaseSpeedMultMin = 0.025;
    this.particlePhaseSpeedMultMax = 0.4;
    // The min/max to normalize the particle phase amplitude multiplier to.
    this.particlePhaseAmplitudeMultMin = 0.1;
    this.particlePhaseAmplitudeMultMax = 1;

    // gui config
    this.guiTimeout = 2000;
    this.guiFadeTime = 350;

    // background config
    this.backgroundSubreddit = "EarthPorn";

    // debug settings
    this.drawEmblem = true;
    this.drawSpectrum = true;
    this.drawParticles = true;
    this.drawBackground = true;
    this.forceImgurBackground = false;
    this.forceStaticBackground = false;
    this.keepGui = false;
}
