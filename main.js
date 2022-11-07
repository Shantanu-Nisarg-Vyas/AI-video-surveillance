objects = []
video = ""
status = ""

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(720, 520);
    canvas.center();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function gotResult (error, results) {
    if (error) {
        console.error (error);
    } console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 720, 520);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "Status: Detecting Objects";
            document.getElementById("objects_detected").innerHTML = "Number of objects detected = " + objects.length;
            fill(r, g, b);
            stroke(r, g, b);
            percent = round(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}