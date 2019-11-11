/*

Copyright © 2019 

All rights reserved. No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, 
including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the publisher, 
except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law. 


@author Sharath Prasad
*/


var yplayer,player_interval_seeker;

var yplayerState = {
    isPlaying: false,
    isSeeked: false,
	previousTime: 0,
	duration: 0,
    playStates: [],
    seekStates: []
};
//Initialize YT Player
function onYouTubeIframeAPIReady() {
    yplayer = new YT.Player('video-placeholder', {
        width: '100%',
        height: 800,
        videoId: 'Xa0Q0J5tOP0',
        yplayerVars: {
            color: 'white'
        },
        events: {
            onReady: init
        }
    });
}
function resetPlayerState() {
    yplayerState = {
        isPlaying: false,
        isSeeked: false,
        previousTime: 0,
        duration: 0,
        playStates: [],
        seekStates: []
    };
}

function init(){
    // Clear existing interval.
    clearInterval(player_interval_seeker);
    // Initial Boiler Plate
    fetchPlayerProps();
    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    player_interval_seeker = setInterval(function () {
        fetchPlayerProps();
    }, 1000)

}

// This function is called by initialize()
function fetchPlayerProps(){
    // Update current time text display.
    if(yplayer.getPlayerState() == 1) {
        yplayerState.isPlaying = true;
        var currentTimer = yplayer.getCurrentTime();
        if(currentTimer < 1) {
            resetPlayerState();
        }
        var difference = currentTimer - yplayerState.previousTime;
        console.log("Current Progress "+ currentTimer);
        if(difference > 5) {
            yplayerState.isSeeked = true;
            yplayerState.seekStates.push(yplayerState.previousTime+"-"+currentTimer);
            console.log("Seek Range "+yplayerState.previousTime+"-"+currentTimer);
        }
        yplayerState.previousTime = currentTimer;
        yplayerState.playStates.push(currentTimer);
    } else {
        yplayerState.isPlaying = false;
    }
}