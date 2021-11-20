status = "";
objects = [];
number = "";
let song;

function preload(){
    song = loadSound("alarm.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting";
}

function draw(){
    image(video, 0, 0, 380, 380);
    
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i<number;i++){
            document.getElementById("status").innerHTML = "Status: Detected";
            if(objects[i].label == "person"){
            song.stop();
            document.getElementById("baby").innerHTML = "Baby Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text("Baby " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            } else if(objects.length == 0){
                document.getElementById("baby").innerHTML = "Baby Not Detected";
                song.play();
            } else{
                document.getElementById("baby").innerHTML = "Baby Not Detected";
                song.play();
            }
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
    number = objects.length;
}