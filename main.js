LWX=0
LWY=0

RWX=0
RWY=0

scoreRw=0
scoreLw=0

song=""
function preload(){
song=loadSound("music.mp3")
}

function setup(){
canvas=createCanvas(500,400)
canvas.center()
video=createCapture(VIDEO)
video.hide()
poseNet=ml5.poseNet(video,modelLoaded)
poseNet.on('pose',gotposes)
}

function draw(){
image(video,0,0,500,400)


if(scoreLw>0.2){
   fill('red')
    circle(LWX,LWY,50)
numberLWY=Number(LWY)
wholenumberLWY=floor(numberLWY)
LWYdiv1000=wholenumberLWY/1000
volume=LWYdiv1000*2
document.getElementById("volume").innerHTML="volume "+volume
song.setVolume(volume)
}

if(scoreRw>0.2){
    fill('red')
     circle(RWX,RWY,50)
 
     if(RWY>0 && RWY<=100){
         document.getElementById("speed").innerHTML="speed=0.5x"
         song.rate(0.5)
     }

     else if(RWY>100 && RWY<=200){
        document.getElementById("speed").innerHTML="speed=1x"
        song.rate(1)
    }

    else if(RWY>200 && RWY<=300){
        document.getElementById("speed").innerHTML="speed=1.5x"
        song.rate(1.5)
    }

    else if(RWY>300 && RWY<=400){
        document.getElementById("speed").innerHTML="speed=2x"
        song.rate(2)
    }

    else if(RWY>400 && RWY<=500){
        document.getElementById("speed").innerHTML="speed=2.5x"
        song.rate(2.5)
    }
 }
}

function play(){
    song.play()
    song.setVolume(0.5)
    song.rate(1)
}

function stop(){
    song.stop()
}

function modelLoaded(){
    console.log("model is loaded")
}

function gotposes(results){
    if(results.length>0){
        console.log(results)

        LWX=results[0].pose.leftWrist.x 
        LWY=results[0].pose.leftWrist.y 

        RWX=results[0].pose.rightWrist.x 
        RWY=results[0].pose.rightWrist.y

        scoreLw=results[0].pose.keypoints[9].score 
        scoreRw=results[0].pose.keypoints[10].score
        
    }
}