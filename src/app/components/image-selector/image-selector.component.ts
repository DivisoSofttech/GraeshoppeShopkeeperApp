import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PopoverController, ModalController } from '@ionic/angular';
import { CropperSettings, ImageCropperComponent } from 'ngx-img-cropper';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss'],
})
export class ImageSelectorComponent implements OnInit {

  public data: any = {};
  cropperSettings: CropperSettings;
  @ViewChild('cropper', { static: true })
  public cropper: ImageCropperComponent;
  constructor(
    private camera: Camera,
    private modalController: ModalController
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 300;
    this.cropperSettings.height = 300;
    this.cropperSettings.croppedWidth = 300;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.noFileInput = true;
  }

  ngOnInit() {
  }
  //public onChange: ($event: any) => void;

  onChange ($event: any){
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    myReader.addEventListener('loadend', (loadEvent: any) => {
      image.src = loadEvent.target.result;
      this.cropper.setImage(image);
    });

    myReader.readAsDataURL(file);
  }

  dismiss() {
    this.modalController.dismiss();
  }
  save() {
    this.modalController.dismiss(this.data);
  }

}