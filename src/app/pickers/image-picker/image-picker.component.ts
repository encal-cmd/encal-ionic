import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Plugins, Capacitor, CameraResultType, CameraSource } from '@capacitor/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @Output() imagePick = new EventEmitter<string>();
  selectedImage: string;

  constructor() { }

  ngOnInit() {}

  onPickImage() {
    console.log('-----  CAassaasasMERA ------');
    if (!Capacitor.isPluginAvailable('camera')) {
      console.log('----- NAO TEM CAMERA ------');
    }

    console.log('-----  CAMERA ------');


    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      allowEditing: false,
      resultType: CameraResultType.Base64
    }).then(image => {
      this.selectedImage = image.base64String;
      console.log(image.base64String);
      this.imagePick.emit(image.base64String);
    }).catch(error => {
      console.log(error);
      return false;
    });

  }

}
