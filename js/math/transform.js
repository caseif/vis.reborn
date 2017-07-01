let Transform = new function() {

    this.transform = function(spectrum) {
        let subArr = spectrum.slice(Config.startBin, Config.endBin);
        subArr = savitskyGolaySmooth(subArr);
        return subArr;
    }

    this.multiplier = function(spectrum) {
        let sum = 0;
        let len = spectrum.length;
        for (let i = 0; i < len; i++) {
            sum += spectrum[i];
        }
        let intermediate = sum / Config.keepBins / 256;
        let transformer = 1.2;
        return (1 / (transformer - 1)) * (-Math.pow(intermediate, transformer) + transformer * intermediate);
    }

    // I'm not convinced this is a Savitsky-Golay smooth. I'm not sure what it is actually.
    let savitskyGolaySmooth = function(array) {
        let lastArray = array;
        let newArr = [];
        for (let pass = 0; pass < Config.smoothingPasses; pass++) {
            let sidePoints = Math.floor(Config.smoothingPoints / 2); // our window is centered so this is both nL and nR
            let cn = 1 / (2 * sidePoints + 1); // constant
            for (let i = 0; i < sidePoints; i++) {
                newArr[i] = lastArray[i];
                newArr[lastArray.length - i - 1] = lastArray[lastArray.length - i - 1];
            }
            for (let i = sidePoints; i < lastArray.length - sidePoints; i++) {
                let sum = 0;
                for (let n = -sidePoints; n <= sidePoints; n++) {
                    sum += cn * lastArray[i + n] + n;
                }
                newArr[i] = sum;
            }
            lastArray = newArr;
        }
        return newArr;
    }

    this.getTransformedSpectrum = function(array) {
        let newArr = array;
        newArr = transformToVisualBins(newArr);
        newArr = normalizeAmplitude(newArr);
        newArr = averageTransform(newArr);
        newArr = tailTransform(newArr);
        newArr = savitskyGolaySmooth(newArr);
        newArr = exponentialTransform(newArr);
        return newArr;
    }

    let transformToVisualBins = function(array) {
        let newArray = new Uint8Array(Config.visualBins);
        for (let i = 0; i < Config.visualBins; i++) {
            let bin = Math.pow(i / Config.visualBins, Config.spectrumScale) * (Config.endBin - Config.startBin)
                    + Config.startBin;
            newArray[i] = array[Math.floor(bin) + Config.startBin] * (bin % 1)
                    + array[Math.floor(bin + 1) + Config.startBin] * (1 - (bin % 1))
        }
        return newArray;
    }

    let normalizeAmplitude = function(array) {
        let values = [];

        for (let i = 0; i < array.length; i++) {
            values[i] = Math.max(array[i], 1) / 256;
        }

        return values;
    }

    let averageTransform = function(array) {
        let values = [];
        let length = array.length;

        for (let i = 0; i < length; i++) {
            let value = 0;
            if (i == 0) {
                value = array[i];
            } else if (i == length - 1) {
                value = (array[i - 1] + array[i]) / 2;
            } else {
                let prevValue = array[i - 1];
                let curValue = array[i];
                let nextValue = array[i + 1];

                if (curValue >= prevValue && curValue >= nextValue) {
                    value = curValue;
                } else {
                    value = (curValue + Math.max(nextValue, prevValue)) / 2;
                }
            }

            values[i] = value;
        }

        let newValues = [];
        for (let i = 0; i < length; i++) {
            let value = 0;
            if (i == 0) {
                value = values[i];
            } else if (i == length - 1) {
                value = (values[i - 1] + values[i]) / 2;
            } else {
                let prevValue = values[i - 1];
                let curValue = values[i];
                let nextValue = values[i + 1];

                if (curValue >= prevValue && curValue >= nextValue) {
                value = curValue;
                } else {
                value = ((curValue / 2) + (Math.max(nextValue, prevValue) / 3) + (Math.min(nextValue, prevValue) / 6));
                }
            }

            newValues[i] = value;
        }
        return newValues;
    }

    let tailTransform = function(array) {
        let values = [];

        const magic = 1.6;

        let headMarginSlope = (1 - Config.minMarginWeight) / Math.pow(Config.headMargin, magic);
        let tailMarginSlope = (1 - Config.minMarginWeight) / Math.pow(Config.tailMargin, magic);

        for (let i = 0; i < array.length; i++) {
            let value = array[i];
            if (i < Config.headMargin) {
                value *= headMarginSlope * Math.pow(i + 1, magic) + Config.minMarginWeight;
            } else if (array.length - i <= Config.tailMargin) {
                value *= tailMarginSlope * Math.pow(array.length - i, magic) + Config.minMarginWeight;
            }
            values[i] = value;
        }
        return values;
    }

    let exponentialTransform = function(array) {
        let newArr = [];
        for (let i = 0; i < array.length; i++) {
            let exp = (Config.spectrumMaxExponent - Config.spectrumMinExponent)
                    * (1 - Math.pow(i / array.length, Config.spectrumExponentScale)) + Config.spectrumMinExponent;
            newArr[i] = Math.pow(array[i], exp);
        }
        return newArr;
    }

}
