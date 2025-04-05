monitors.setup(
    1,
    DigitalPin.P1,
    DigitalPin.P8,
    DigitalPin.P0
)
monitors.brightnessAll(1)
let matrix = monitors.getEmptyMatrix()
let posX = 0;
let posY = 0;
let lastX = -1;
let lastY = -1;

function updateMonitor()
{
    if(lastX > -1 && lastY > -1){
        monitors.setValueInMatrix(matrix, lastX, lastY, 0);
    }
    monitors.setValueInMatrix(matrix, posX, posY, 1);
    monitors.displayLEDsToAll(matrix);
    lastX = posX;
    lastY = posY;
}

let posYMini = 0;
let posXMini = 0;
let oneStep = 0.2;
let joyStickThreshold = 50;
function updatePosVal()
{
    let xVal = sensors.Gamepad_Shaft(Shaft.X_Shaft);
    if (xVal < 256 / 2 - joyStickThreshold) {
        posXMini -= oneStep;
        posX = Math.round(posXMini);
        if (posX < 0) posX = posXMini = 7;
    } else if (xVal > 256 / 2 + joyStickThreshold) {
        posXMini += oneStep;
        posX = Math.round(posXMini);
        if (posX > 7) posX = posXMini = 0;
    }

    let yVal = sensors.Gamepad_Shaft(Shaft.Y_Shaft);
    if (yVal < 256 / 2 - joyStickThreshold) {
        posYMini += oneStep;
        posY = Math.round(posYMini);
        if (posY > 7) posY = posYMini = 0;
    } else if (yVal > 256 / 2 + joyStickThreshold) {
        posYMini -= oneStep;
        posY = Math.round(posYMini);
        if (posY < 0) posY = posYMini = 7;
    }
}

basic.forever(function () {
    updatePosVal();
    
    // if (sensors.Gamepad_Status(barb_fitting.BUTOON_LEFT, key_status.PRESS_DOWN)) {
    //     basic.showIcon(IconNames.Sad)
    // } else {
    //     basic.showIcon(IconNames.Happy)
    // }

    updateMonitor();
})

