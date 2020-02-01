import { Injectable, OnInit } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root'
})
export class AudioServiceService   {

  constructor(private nativeAudio: NativeAudio,
    ) {
    }

  preloadSounds() {
    console.log('ngOnINit preloading the sound file');
    this.nativeAudio.
      preloadComplex('orderrequest', 'assets/beep.mp3', 1, 1, 0)
      .then(() => {
        console.log('ON Success load complex');
      }, err => {
        console.log('On Error load complex', err);
      });
  }

  playSoundLoop(key) {
    this.preloadSounds();
    console.log('Sound is playing in loop', key);
    this.nativeAudio.loop(key)
    .then(() => {
      console.log('Sound is playing with id ', key);
    }, err => {
      console.log('Something went wrong playing sound in loop', err);
    });
  }

  stopPlayingSound(key) {
    console.log('Sound is stopping');
    this.nativeAudio.stop(key)
    .then(() => {
      console.log('audio stopped playing');
    }, err => {
      console.log('Audio stop went wrong');
    });
  }

  unloadSoundFromMemory(key) {
    this.nativeAudio.unload(key)
    .then(() => {
      console.log('Success on unloading the sound');
    }, () => {
      console.log('Something went wrong while unloading the file ');
    });
  }


}
