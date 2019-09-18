import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { ModalController, LoadingController } from '@ionic/angular';
import { CropperSettings, ImageCropperComponent } from 'ngx-img-cropper';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { duration } from 'moment';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss']
})
export class ImageSelectorComponent implements OnInit {
  public data: any = {};
  @ViewChild('cropper', { static: false })
  cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;
  constructor(
    private imagePicker: ImagePicker,
    private crop: Crop,
    private camera: Camera,
    private modalController: ModalController,
    private base64: Base64,
    private loadingController: LoadingController,
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 300;
    this.cropperSettings.height = 300;
    this.cropperSettings.croppedWidth = 300;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.compressRatio = 1.6;
  }

  ngOnInit() {
    this.loadingController.create({
      spinner: 'bubbles',
      duration: 2000
    }).then(loader => {
      loader.present();
    });
   }

  onChange($event: any) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      this.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }

  dismiss() {
    this.modalController.dismiss();
  }
  save() {
    this.modalController.dismiss(this.data);
  }
}
