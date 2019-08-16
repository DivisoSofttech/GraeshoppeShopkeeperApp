import { QueryResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage implements OnInit {

  constructor(
    private file: File,
    private fileOpener: FileOpener,
    public toastController: ToastController,
    private queryResource: QueryResourceService,
    private platform: Platform
  ) { }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Downloading.'
    });
    toast.present();
  }
  downloadPDF() {
    console.log('download pdf method');
    // this.queryResource.findOrderMasterByOrderIdUsingGET({orderId: '3'}).subscribe( data =>
    // this.queryResource.exportOrderDocketUsingGET(data.id).subscribe(data =>{
    //   console.log('data',data);
    //   const byteCharacters = atob(data);
    //   const byteNumbers = new Array(byteCharacters.length);
    //   for (let i = 0; i < byteCharacters.length; i++) {
    //     byteNumbers[i] = byteCharacters.charCodeAt(i);
    //   }
    //   const byteArray = new Uint8Array(byteNumbers);
    //   const blob = new Blob([byteArray], { type: 'application/pdf'});
    //   console.log('blob is' + blob);
      
    //   window.open(URL.createObjectURL(blob), "myWindow", "width=200,height=100");
    // },err=> console.log("Error opening pdf")
    // ));
    this.queryResource.getOrderDocketUsingGET(3).subscribe(result => {
      const byteCharacters = atob(result.pdf);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: result.contentType });
      console.log('blob is' + blob);
      this.toastController.dismiss();
      this.file.createFile(this.file.externalCacheDirectory, 'customer.pdf', true).then(() => {
        console.log('file created' + blob);

        this.file.writeFile(this.file.externalCacheDirectory, 'customer.pdf', blob, {replace: true}).then(
          (value) => {
            console.log('file writed' + value);

            this.fileOpener.showOpenWithDialog(this.file.externalCacheDirectory + 'customer.pdf', result.contentType).then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
        });
      });
    });

}

}
